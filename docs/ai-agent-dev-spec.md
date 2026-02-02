# AI Agent Dev Spec — Airline Ticket Booking (SE330)

## 0) Tóm tắt mục tiêu dự án

### 0.1 Mục tiêu học thuật (SE330)
- Java Core + OOP rõ ràng
- GUI Desktop bằng Swing
- JDBC + Transaction + Lock
- Exception + Multithreading (job TTL)
- Tooling: Maven, IDE, Git, CI

### 0.2 Mục tiêu quy trình (CNPM)
- Có tài liệu: SRS/Usecase/NFR/Design/ERD/Test plan/CI pipeline
- Có “triển khai thật”: PostgreSQL trên VPS + app chạy client kết nối DB thật

## 1) Kiến trúc phương án B

### 1.1 Thành phần
- Client (Desktop)
- App User (Swing) – có thể là 1 app chung, nhưng UI/role tách rạch ròi
- App Admin (Swing) – menu admin chỉ hiện khi role=ADMIN
- Database Server (VPS)
- PostgreSQL (Docker Compose)
- CI
- GitHub Actions: build + test + artifact jar

### 1.2 Sơ đồ luồng
User thao tác trên Swing UI → Service xử lý nghiệp vụ → DAO gọi JDBC → PostgreSQL VPS → DB trả dữ liệu → UI cập nhật.

## 2) Công nghệ & quy ước

### 2.1 Stack
- Java 17
- Swing (UI)
- Maven (build)
- JDBC (DAO)
- PostgreSQL 16 (VPS)
- GitHub Actions (CI)
- (Tuỳ chọn) BCrypt password hashing

### 2.2 Cấu trúc project (bắt buộc)
```
/src/main/java
  /app
    Main.java
  /ui
    /common    (theme, components)
    /user      (screens)
    /admin     (screens)
  /domain      (entities)
  /dto
  /service
  /dao
  /exception
  /util
  /scheduler   (TTL job, background tasks)
/src/main/resources
  app.properties
  sql/schema.sql (nếu không dùng Flyway)
  icons/ (svg/png)
```

### 2.3 Coding rules
- UI không gọi DAO trực tiếp → UI → Service → DAO
- DAO thuần JDBC, PreparedStatement 100%
- Không hardcode secret (db password) trong code → app.properties hoặc ENV

## 3) Phạm vi chức năng (MVP + nâng cao vừa đủ)

### 3.1 User (MVP)
- Register
- Login + Lockout (sai N lần khóa T phút)
- Forgot password bằng OTP (OTP mô phỏng: hiển thị trong “Email inbox mock” hoặc log)
- Profile: nickname + avatar (lưu URL hoặc path)
- Search flight: from/to/date + filter/sort cơ bản
- Booking: tạo booking → HOLD TTL 10–15 phút
- Payment (mô phỏng): bấm “Tôi đã thanh toán” → chuyển trạng thái (hoặc admin xác nhận)
- E-ticket view: hiển thị mã vé + thông tin
- Booking history

### 3.2 Admin (MVP)
- Admin login (role ADMIN)
- CRUD Airport
- CRUD Route
- CRUD FlightInstance (chuyến theo ngày giờ)
- CRUD Fare/Inventory (giá + số lượng)
- Manage Bookings: filter theo trạng thái, confirm/cancel
- Revenue Report: theo ngày/tháng
- Audit Log viewer

### 3.3 Tính năng nâng cao (chọn 3 cái, khuyến nghị)
- Hold TTL auto-release (bắt buộc)
- Export report CSV
- Audit log đầy đủ (bắt buộc)
- (Optional) Seat selection dạng lưới đơn giản

## 4) NFR (để tránh bug ngầm – bắt buộc)

### 4.1 Anti-oversell
- Khi tạo booking, phải giữ chỗ (HOLD) với TTL
- Inventory update dùng transaction + row lock
- Không được “trừ ghế vĩnh viễn” khi chưa paid

### 4.2 Idempotency (ở bản desktop)
- Payment mô phỏng vẫn cần chống double click
- Nếu booking đã PAID/ISSUED → không xử lý lại

### 4.3 Security cơ bản
- Password hash (BCrypt)
- Lockout: 5 lần sai → khóa 15 phút
- OTP TTL 5 phút, giới hạn resend, giới hạn verify attempts

### 4.4 Logging/Audit
- Ghi log admin CRUD + booking status transitions
- Dùng bảng audit_logs

## 5) Nghiệp vụ cốt lõi (state machine)

### 5.1 BookingStatus
- PENDING_PAYMENT
- PAID
- ISSUED
- EXPIRED
- CANCELLED

### 5.2 Quy tắc
- Create booking → PENDING_PAYMENT + tạo HOLD + expires_at
- TTL job: quá hạn → set EXPIRED + release inventory
- Payment confirm (mô phỏng) → PAID → issue ticket → ISSUED
- Cancel: nếu chưa paid → CANCELLED + release inventory

## 6) Database (PostgreSQL) – bảng tối giản nhưng đủ chuẩn

### 6.1 Auth
- users(id, email, password_hash, nickname, avatar_url, role, status, created_at)
- login_attempts(email, fail_count, locked_until, last_fail_at)
- otp_requests(email, otp_hash, purpose, expires_at, attempt_count, sent_count, created_at)

### 6.2 Flight/Inventory
- airports(id, code, name, city, country)
- routes(id, from_airport_id, to_airport_id)
- flight_instances(id, route_id, depart_time, arrive_time, base_price, status)
- inventory(id, flight_instance_id, total, sold, held) (1 row / flight_instance)

### 6.3 Booking/Ticket
- bookings(id, user_id, flight_instance_id, qty, total_amount, status, expires_at, created_at)
- reservation_holds(id, booking_id, qty, expires_at, status) (HELD/RELEASED/CONSUMED)
- tickets(id, booking_id, ticket_no, issued_at, status)
- audit_logs(id, actor_role, actor_user_id, action, entity, entity_id, payload_json, created_at)

Gợi ý: dùng uuid hoặc bigserial tuỳ bạn. Với đồ án, bigserial là nhanh nhất.

## 7) JDBC & Transaction (phần ăn điểm SE330)

### 7.1 Create Booking + Hold (anti-oversell)
Pseudo-flow (Service):
1. Begin transaction
2. Lock inventory row:
   ```sql
   SELECT total, sold, held FROM inventory WHERE flight_instance_id=? FOR UPDATE
   ```
3. Check available = total - sold - held
4. Nếu available < qty → throw NotEnoughSeatsException
5. Update held: `UPDATE inventory SET held = held + ? WHERE flight_instance_id=?`
6. Insert booking PENDING_PAYMENT with `expires_at = now + TTL`
7. Insert reservation_hold HELD
8. Commit

### 7.2 Payment Confirm (mô phỏng)
1. Begin transaction
2. Load booking `FOR UPDATE`
3. Nếu status != PENDING_PAYMENT → bỏ qua (idempotent)
4. Update booking → PAID
5. Update inventory: held -= qty, sold += qty
6. reservation_hold → CONSUMED
7. Insert ticket + set booking ISSUED
8. Commit
9. Insert audit log

### 7.3 TTL Job: Expire booking
Chạy mỗi 30–60s:
- Find expired bookings (PENDING_PAYMENT & expires_at < now)
- For each booking, transactional:
  - booking → EXPIRED
  - inventory: held -= qty
  - hold → RELEASED
  - audit log

## 8) Multithreading (SE330) – TTL background worker
- Dùng `ScheduledExecutorService`
- Tick mỗi 30s: gọi `bookingService.expireBookings()`

## 9) UI/UX spec (rất chi tiết – để dev UI đẹp)

### 9.1 Design system
#### 9.1.1 Màu sắc (Theme đề xuất)
Chọn 1 palette “Airline clean” (có light/dark):
- Primary: #2563EB
- Primary hover: #1D4ED8
- Accent: #22C55E (success green)
- Danger: #EF4444
- Warning: #F59E0B
- Background: #0B1220 (dark navy) hoặc #F6F7FB (light)
- Surface/Card: #111827 (dark) hoặc #FFFFFF (light)
- Border: #E5E7EB / #243041
- Text primary: #111827 (light mode) / #E5E7EB (dark mode)
- Muted text: #6B7280

#### 9.1.2 Font
- Segoe UI (Windows) fallback SansSerif
- Sizes: H1 24–28, H2 18–20, Body 13–14, Caption 11–12

#### 9.1.3 Spacing & radius
- 8px grid
- Padding card: 16–20
- Gap: 12–16
- Radius: card 16, button/input 10–12

#### 9.1.4 Component style
- Button: Primary/Secondary/Danger
- Input: border 1px, focus border Primary
- Table: header nền nhạt, row zebra, hover highlight

#### 9.1.5 Hiệu ứng (micro-interactions)
- Hover button đổi màu + cursor hand
- Press effect: giảm brightness
- Loading: spinner + disable button
- Toast (snackbar) trượt lên ở góc phải dưới (JWindow + timer)
- Transition giữa màn: CardLayout (fade optional)

### 9.2 Navigation pattern
- Topbar: logo + tên app + search quick (user) + profile menu (avatar nhỏ)
- Sidebar (admin): Dashboard / Airports / Routes / Flights / Bookings / Reports / Audit logs
- User không thấy menu admin

### 9.3 Screen-by-screen (User)
- **Login**: layout 2 cột, left illustration, right login card, error inline, lockout countdown
- **Register**: email + password + confirm + nickname
- **Forgot password (OTP)**: stepper 3 bước, resend cooldown
- **Home/Search**: search card, popular routes
- **Search results**: filter panel + flight cards
- **Flight detail**: summary card + qty selector + “Book & Hold”
- **Checkout**: booking code, TTL countdown, status badge, “I have paid” + “Cancel”
- **Ticket view**: ticket code + info
- **Profile**: avatar preview + nickname edit

### 9.4 Screen-by-screen (Admin)
- **Dashboard**: KPI cards + recent bookings table
- **CRUD pages**: table + add/edit modal
- **Bookings management**: tabs by status + detail panel
- **Reports**: date range + export CSV
- **Audit log**: table + filter + payload view

## 10) Deploy PostgreSQL VPS (copy-paste)

### 10.1 docker-compose.yml
```yaml
services:
  postgres:
    image: postgres:16
    container_name: airline_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: airline
      POSTGRES_USER: airline_app
      POSTGRES_PASSWORD: "CHANGE_ME_STRONG_PASSWORD"
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### 10.2 Firewall
Chỉ cho phép port 5432 từ IP của nhóm. Nếu IP thay đổi: dùng VPN (Tailscale).

## 11) CI/CD (GitHub Actions)
Pipeline yêu cầu:
- `mvn test`
- `mvn package`
- upload artifact `.jar`

## 12) Demo script
- Show VPS: Postgres container running
- Admin app: tạo airport/route/flight + set inventory
- 2 máy mở User app: cùng search + book qty gần hết
- Chứng minh lock: 1 người giữ được, người kia báo hết
- Wait TTL expire → auto release → user kia đặt lại được
- Confirm payment simulate → ticket issued
- Admin xem audit log + report export CSV

## 13) AI Agent Dev Spec — task list

### 13.1 Must deliver
- Swing UI theo spec (theme + components)
- JDBC DAO + transaction + FOR UPDATE
- TTL background job
- OTP/lockout + password hashing
- Audit log
- Maven build ok
- CI pipeline ok

### 13.2 Nice-to-have
- Toast system
- Skeleton loading
- Export CSV
- Dark mode toggle

## 14) Theme system (Light/Dark)

### 14.1 Color tokens – Light
- bg: #F6F7FB
- surface: #FFFFFF
- surface2: #F1F5F9
- text: #0F172A
- textMuted: #64748B
- border: #E2E8F0
- primary: #2563EB
- primaryHover: #1D4ED8
- success: #22C55E
- warning: #F59E0B
- danger: #EF4444
- focusRing: #93C5FD
- shadowColor: #0B1220 (alpha thấp)

### 14.2 Color tokens – Dark
- bg: #0B1220
- surface: #111827
- surface2: #0F172A
- text: #E5E7EB
- textMuted: #94A3B8
- border: #243041
- primary: #60A5FA
- primaryHover: #3B82F6
- success: #34D399
- warning: #FBBF24
- danger: #F87171
- focusRing: #2563EB
- shadowColor: #000000

### 14.3 Typography tokens
- Font: Segoe UI (fallback SansSerif)
- Sizes: h1 26, h2 20, h3 16, body 13–14, caption 11–12
- Weights: bold (title), regular (body), semibold (button)

### 14.4 Spacing & radius tokens
- spaceXS 8, spaceS 12, spaceM 16, spaceL 20
- radiusM 12 (button/input), radiusL 16 (card)

### 14.5 Shadow tokens
- Light: shadow alpha 8–12%
- Dark: shadow alpha 25–35% (blur nhẹ)
- Offset 2–6px

## 15) Theme system implementation

### 15.1 Theme enum
- ThemeMode.LIGHT
- ThemeMode.DARK

### 15.2 ThemeManager (global)
- `setTheme(ThemeMode mode)`
- `getTheme()`
- `addListener(ThemeChangeListener)`
- Theme đổi → update UI toàn app (recursive)

### 15.3 Apply theme
- Component custom (Button/Input/Card/Table) đọc từ tokens
- Không set màu trực tiếp trong từng screen
- Theme đổi → `SwingUtilities.updateComponentTreeUI(frame)` + repaint

### 15.4 Lưu theme (preference)
- Lưu theme trong app.properties hoặc Java Preferences
- Load trước khi render UI

## 16) UI Kit — Components

### 16.1 AppButton
- Variants: Primary, Secondary, Danger, Ghost
- States: default/hover/pressed/disabled/loading
- radius 12, padding 10x14, hover đổi nền + hand cursor

### 16.2 AppTextField / AppPasswordField
- border 1px, focus border primary, error border danger
- placeholder xám nhạt

### 16.3 AppCard
- background = surface
- radius 16
- padding 16–20
- shadow nhẹ

### 16.4 AppBadge
- Pill status: pending/paid/issued/expired/cancelled

### 16.5 AppToast
- JWindow bottom-right, auto hide 2–3s
- types: success/warn/error/info

### 16.6 AppTable
- JTable styled header + zebra rows + hover highlight

## 17) Screen spec update (light/dark)

### 17.1 Login screen
- Layout 2 cột
- Left panel gradient
  - Light: #E0F2FE → #DBEAFE
  - Dark: #0B1220 → #111827
- Right: login card
- UX: error inline, lockout countdown, show/hide password

### 17.2 Home/Search
- Search card nổi bật
- Input combo airports + dropdown style
- Button Search to rõ
- Empty state khi chưa có kết quả

### 17.3 Checkout (wow)
- Countdown lớn, đổi màu theo TTL
- Status badge realtime
- “I have paid” có loading state

### 17.4 Admin Dashboard
- KPI cards 3–4 cái
- Recent bookings table
- Dark mode: card nổi, border nhẹ, text sáng

## 18) UI/UX direction (Modern Airline Minimal)

### 18.1 Design philosophy
- Ít màu – nhiều khoảng trắng – card rõ – chữ dễ đọc
- Không gradient lòe loẹt, không icon rối
- Mọi thứ nằm trong card

### 18.2 Global layout
- Topbar 56px, sạch
- Content max width ~1040px
- Admin có sidebar

### 18.3 Light mode
- Sạch, dễ demo, cảm giác “an toàn”
- Nền rất nhạt, card trắng nổi nhẹ
- Primary button xanh

### 18.4 Dark mode
- Sang, cao cấp
- Navy/charcoal nền tối, card nổi rõ
- Primary xanh sáng

### 18.5 Key screens
- **Login**: 2 cột, illustration trái, login card phải
- **Search**: 1 card lớn, input rõ ràng, CTA nổi bật
- **Search results**: card dọc, giá to, hover highlight
- **Checkout**: countdown đổi màu, status badge rõ
- **Ticket**: ticket card + copy code
- **Admin dashboard**: KPI cards + recent table, gọn gàng

### 18.6 Micro-interactions
- Toast bottom-right
- Hover button đổi màu
- Loading spinner khi xử lý DB
- Disable button khi đang chạy transaction

## 19) “Done criteria” cho theme
- Toggle Light/Dark đổi toàn app (không sót màn)
- Component states đúng theme
- Text contrast đủ đọc
- Table + dialog cũng đổi theme
- Lưu theme và mở lại vẫn giữ

## 20) Bonus: Icon usage
- Material Icons SVG
- Status icon: pending clock, paid check, expired alert, cancelled x
- Hover highlight cho list flight cards

