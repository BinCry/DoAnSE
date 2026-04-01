# Lộ trình triển khai backend nhiều vai trò

## Mục tiêu
- Biến phần giao diện hiện có thành hệ thống web bán vé máy bay chạy thật với backend trung tâm tại `apps/api`.
- Chốt mô hình vai trò đích còn 5 vai trò: `guest`, `customer`, `member`, `customer_support`, `operations_staff`.
- Gộp vai trò backoffice từ sơ đồ nghiệp vụ về 2 nhóm nội bộ nhưng vẫn giữ đủ chức năng cần thiết từ các vai trò đã giảm.

## Bối cảnh hiện tại
- Backend đã có nền `Spring Boot`, `JPA`, `Flyway`, `PostgreSQL`, `Spring Security`.
- Dữ liệu thật hiện mới đủ cho sân bay, chuyến bay và tồn ghế theo hạng vé.
- Một số trang và API vẫn còn trả dữ liệu mẫu như auth summary, tổng quan khách hàng, hỗ trợ, CMS và bảng điều phối nội bộ.
- Frontend vẫn dùng nhiều `mock-data`, nên lộ trình backend phải ưu tiên các API tối thiểu để thay thế dần dữ liệu mẫu.

## Vai trò đích
| Vai trò | Mục tiêu chính |
| --- | --- |
| `guest` | Tìm chuyến bay, xem chi tiết chuyến bay, xem khuyến mãi, FAQ, tạo đặt chỗ không cần tài khoản, tra cứu đặt chỗ bằng mã xác minh |
| `customer` | Đăng ký, đăng nhập, đặt vé, thanh toán, quản lý đặt chỗ, đổi hoặc hủy theo điều kiện, làm thủ tục trực tuyến |
| `member` | Toàn bộ quyền của `customer` và thêm điểm thưởng, voucher, đổi điểm, ưu đãi theo hạng |
| `customer_support` | Tra cứu booking có xác minh, bán vé hộ, xử lý hỗ trợ, khiếu nại, đổi hoặc hủy thủ công, bù dịch vụ, hoàn tiền, nội dung hỗ trợ |
| `operations_staff` | Quản lý giá, chuyến bay, lịch bay, tồn ghế, trạng thái chuyến bay, mở hoặc đóng bán, kiểm soát cấu hình và nhật ký hệ thống |

## Quy tắc gộp backoffice
| Vai trò mới | Vai trò cũ được gộp | Phần chức năng phải giữ lại |
| --- | --- | --- |
| `customer_support` | `ticket_agent`, `customer_support`, `finance_staff`, `content_editor` | Bán vé hộ, tra cứu booking, hỗ trợ sau bán, đổi hoặc hủy thủ công, bù dịch vụ, hoàn tiền, cập nhật FAQ và nội dung hỗ trợ |
| `operations_staff` | `operations_staff`, `system_admin` | Quản lý giá, lịch bay, tồn ghế, trạng thái chuyến bay, mở hoặc đóng bán, cấu hình rule và nhật ký kiểm soát |

## Bản đồ nghiệp vụ theo sơ đồ

### Khách vãng lai
- Đăng ký.
- Đăng nhập.
- Tìm chuyến bay.
- Xem chi tiết chuyến bay.
- Xem khuyến mãi và FAQ.
- Tạo đặt chỗ.
- Tra cứu booking.
- Xác minh OTP khi tra cứu booking.

### Khách hàng và hội viên
- Làm thủ tục trực tuyến.
- Chọn ghế.
- Lấy thẻ lên máy bay.
- Quản lý đặt chỗ.
- Xem booking.
- Đổi chuyến.
- Hủy đặt chỗ.
- Tính chênh lệch và phí đổi.
- Tính hoàn tiền và gửi yêu cầu hoàn.
- Tích điểm.
- Đổi điểm.
- Áp voucher.

### Vai trò `customer_support`
- Tra cứu booking và xác minh thông tin khách.
- Xử lý yêu cầu hỗ trợ.
- Xử lý khiếu nại.
- Đổi hoặc hủy thủ công cho khách.
- Bù dịch vụ hoặc voucher.
- Theo dõi SLA xử lý.
- Hỗ trợ bán vé hộ, giữ chỗ, xuất lại vé.
- Kiểm tra hoàn tiền, đối soát giao dịch trong luồng chăm sóc khách hàng.
- Cập nhật FAQ, khuyến mãi, nội dung hỗ trợ để đồng bộ với chatbot và khu công khai.

### Vai trò `operations_staff`
- Quản lý giá.
- Quản lý chuyến bay.
- Quản lý lịch bay.
- Mở hoặc đóng bán chặng bay.
- Quản lý tồn ghế.
- Cập nhật trạng thái chuyến bay.
- Kiểm soát cấu hình hệ thống, mẫu thông báo và nhật ký thao tác nhạy cảm.

## Phân hệ backoffice giữ nguyên
Backoffice vẫn giữ các phân hệ hiện có để không mất chức năng, nhưng quyền truy cập chỉ còn 2 vai trò.

| Phân hệ | Vai trò được cấp | Mục đích |
| --- | --- | --- |
| `sales` | `customer_support` | Tạo đặt chỗ hộ, giữ chỗ, thu hộ và xuất lại vé |
| `support` | `customer_support` | Xử lý hỗ trợ, khiếu nại, takeover từ trợ lý hỗ trợ, theo dõi SLA |
| `finance` | `customer_support` | Đối soát giao dịch, hoàn tiền, hóa đơn, sai lệch cần phản hồi khách |
| `cms` | `customer_support` | FAQ, banner, cẩm nang, nội dung hỗ trợ song ngữ |
| `operations` | `operations_staff` | Giá, lịch bay, tồn ghế, trạng thái chuyến bay, mở hoặc đóng bán |
| `admin` | `operations_staff` | Cấu hình rule, nhật ký kiểm soát, phân quyền và mẫu thông báo |

## Nguyên tắc triển khai
- Không mở rộng tất cả module cùng lúc.
- Mỗi đợt chỉ chốt một nhóm bảng và một nhóm API gần nhau.
- Toàn bộ thay đổi phân quyền phải có kiểm thử tích hợp hoặc kiểm thử đơn vị đi kèm.
- Không đổi hợp đồng API công khai nếu chưa chốt phạm vi ở web.
- Toàn bộ tệp Java, TypeScript, SQL, Markdown phải thống nhất UTF-8 để tránh lỗi tiếng Việt có dấu.

## Thứ tự ưu tiên tổng thể
1. Xác thực, phân quyền, hồ sơ tài khoản.
2. Danh mục công khai, tìm sân bay, tìm chuyến bay, dữ liệu trang chủ.
3. Giữ chỗ, dịch vụ bổ trợ, thanh toán sandbox, xuất vé.
4. Tự phục vụ sau bán cho `guest`, `customer`, `member`.
5. Backoffice với 2 vai trò `customer_support` và `operations_staff`.
6. Loyalty, ổn định vận hành, audit và kiểm thử hồi quy.

## Giai đoạn 1: Xác thực, phân quyền và hồ sơ tài khoản

### Mục tiêu
- Có nền auth thật cho khách và staff.
- Có RBAC ở mức API và mức nghiệp vụ.
- Dùng được danh sách role mới với 2 vai trò backoffice.

### Bảng dữ liệu cần có
- `user_account`
- `auth_role`
- `auth_permission`
- `user_role`
- `role_permission`
- `refresh_session`
- `otp_challenge`
- `user_profile`
- `customer_profile`
- `staff_profile`
- `saved_passenger`
- `audit_log`

### API tối thiểu
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password/request-otp`
- `POST /api/auth/forgot-password/verify-otp`
- `POST /api/auth/reset-password`
- `GET /api/auth/roles`
- `GET /api/me/profile`
- `PATCH /api/me/profile`

### Kiểm thử bắt buộc
- Đăng ký, đăng nhập, làm mới phiên, đăng xuất.
- OTP hết hạn, OTP sai, OTP bị dùng lại.
- Chặn người không đúng role vào API nội bộ.
- Kiểm tra mapping quyền cho `customer_support` và `operations_staff`.

## Giai đoạn 2: Khu công khai và tìm chuyến bay

### Mục tiêu
- Nối các trang công khai với dữ liệu thật.
- Đảm bảo luồng khách vãng lai trong sơ đồ chạy được trước.

### Bảng dữ liệu cần có
- `airport`
- `route`
- `flight`
- `flight_segment`
- `fare_family`
- `fare_rule`
- `flight_fare_inventory`
- `promotion`
- `faq_public`
- `homepage_section`

### API tối thiểu
- `GET /api/airports`
- `GET /api/flights/search`
- `GET /api/flights/status`
- `GET /api/public/homepage`
- `GET /api/public/promotions`
- `GET /api/public/faqs`

### Kiểm thử bắt buộc
- Tìm chuyến một chiều.
- Tìm chuyến khứ hồi.
- Lọc theo hạng vé.
- Kiểm tra lỗi ngày đi, ngày về, tổng số khách và mã sân bay.

## Giai đoạn 3: Giữ chỗ, thanh toán và xuất vé

### Mục tiêu
- Hoàn thiện luồng tạo booking của `guest` và `customer`.
- Chống lặp giao dịch và kiểm soát tồn ghế khi thanh toán.

### Bảng dữ liệu cần có
- `booking`
- `booking_contact`
- `booking_passenger`
- `booking_segment`
- `booking_hold`
- `booking_price_snapshot`
- `ancillary_order`
- `seat_assignment`
- `payment_transaction`
- `payment_callback_log`
- `ticket`
- `invoice`
- `notification_outbox`

### API tối thiểu
- `POST /api/bookings/holds`
- `GET /api/bookings/{bookingCode}`
- `POST /api/bookings/{bookingCode}/repricing`
- `POST /api/bookings/{bookingCode}/ancillaries`
- `POST /api/bookings/{bookingCode}/payments/session`
- `POST /api/payments/callback`
- `POST /api/bookings/{bookingCode}/issue-ticket`
- `GET /api/bookings/{bookingCode}/invoice`

### Kiểm thử bắt buộc
- Giữ chỗ thành công.
- Hết hạn giữ chỗ.
- Callback thanh toán lặp lại.
- Xuất vé sau thanh toán.
- Mua thêm hành lý hoặc ghế.

## Giai đoạn 4: Tự phục vụ sau bán

### Mục tiêu
- Giảm tải tổng đài cho các thao tác phổ biến sau bán.
- Bám đúng các luồng trong sơ đồ cho `guest`, `customer`, `member`.

### Bảng dữ liệu cần có
- `booking_lookup_session`
- `booking_change_request`
- `refund_request`
- `checkin_session`
- `boarding_pass`
- `flight_event`
- `notification_log`
- `point_ledger`
- `voucher`
- `voucher_redemption`

### API tối thiểu
- `POST /api/bookings/lookup/request-otp`
- `POST /api/bookings/lookup/verify-otp`
- `GET /api/bookings/manage/{bookingCode}`
- `POST /api/bookings/{bookingCode}/change-quote`
- `POST /api/bookings/{bookingCode}/change-confirm`
- `POST /api/bookings/{bookingCode}/refund-quote`
- `POST /api/bookings/{bookingCode}/refund-request`
- `POST /api/check-in/eligibility`
- `POST /api/check-in/seat-selection`
- `POST /api/check-in/complete`
- `GET /api/me/points`
- `GET /api/me/vouchers`
- `POST /api/bookings/{bookingCode}/apply-voucher`

### Kiểm thử bắt buộc
- Tra cứu booking bằng OTP.
- Đổi chuyến khi đủ điều kiện.
- Từ chối đổi hoặc hoàn khi quá hạn.
- Mở và đóng check-in theo giờ.
- Tích điểm và đổi điểm.

## Giai đoạn 5: Backoffice 2 vai trò

### Mục tiêu
- Staff dùng được hệ thống thật thay vì màn hình mô phỏng.
- Chỉ còn 2 vai trò nội bộ nhưng không mất chức năng cũ.

### Phân quyền API tối thiểu
- `customer_support`
  - `backoffice.sales`
  - `backoffice.support`
  - `backoffice.finance`
  - `backoffice.cms`
- `operations_staff`
  - `backoffice.operations`
  - `backoffice.admin`

### API tối thiểu cho `customer_support`
- `GET /api/backoffice/sales/bookings`
- `POST /api/backoffice/sales/bookings`
- `POST /api/backoffice/sales/bookings/{bookingCode}/issue-ticket`
- `GET /api/backoffice/support/tickets`
- `POST /api/backoffice/support/tickets`
- `PATCH /api/backoffice/support/tickets/{id}`
- `POST /api/backoffice/support/tickets/{id}/compensations`
- `GET /api/backoffice/finance/payments`
- `GET /api/backoffice/finance/refunds`
- `POST /api/backoffice/finance/refunds/{id}/approve`
- `GET /api/backoffice/cms/homepage`
- `POST /api/backoffice/cms/content`
- `PATCH /api/backoffice/cms/content/{id}`

### API tối thiểu cho `operations_staff`
- `GET /api/backoffice/operations/flights`
- `PATCH /api/backoffice/operations/flights/{id}/status`
- `PATCH /api/backoffice/operations/flights/{id}/gate`
- `PATCH /api/backoffice/operations/inventory/{id}`
- `PATCH /api/backoffice/operations/pricing/{id}`
- `PATCH /api/backoffice/operations/schedule/{id}`
- `POST /api/backoffice/operations/sales/{id}/open`
- `POST /api/backoffice/operations/sales/{id}/close`
- `GET /api/admin/dashboard`

### Bảng dữ liệu cần có
- `support_ticket`
- `support_ticket_message`
- `support_ticket_assignment`
- `compensation_log`
- `refund_approval`
- `reconciliation_batch`
- `reconciliation_item`
- `cms_content`
- `cms_revision`
- `flight_operation_event`
- `pricing_rule`
- `schedule_change_log`

### Kiểm thử bắt buộc
- `customer_support` truy cập được đúng 4 phân hệ đã gộp.
- `operations_staff` chỉ truy cập được `operations` và `admin`.
- Duyệt hoàn tiền không làm mất nhật ký chăm sóc khách hàng.
- Cập nhật trạng thái chuyến bay đồng bộ ra khu công khai.
- CMS nội dung hỗ trợ không cho vai trò vận hành sửa nhầm.

## Giai đoạn 6: Loyalty và ổn định vận hành

### Mục tiêu
- Hoàn thiện giá trị cho `member`.
- Bảo đảm hệ thống chịu được các luồng nhạy cảm sau khi gộp role.

### Hạng mục bắt buộc
- Rate limit cho đăng nhập, OTP và tra cứu booking.
- Audit log cho mọi thao tác staff.
- Outbox cho email và thông báo.
- Masking dữ liệu nhạy cảm trong log.
- Job dọn giữ chỗ hết hạn.
- Khóa dữ liệu tồn ghế bằng cơ chế phù hợp.
- Kiểm thử hồi quy cho booking, payment, refund và RBAC.

## Điều kiện đủ để nối web thật
- Có auth thật cho khách.
- Có tìm chuyến, giữ chỗ, thanh toán sandbox, xuất vé.
- Có tra cứu booking, đổi hoặc hoàn cơ bản, check-in, trạng thái chuyến bay.
- Có RBAC thật cho `customer_support` và `operations_staff`.
- Có audit log cho thao tác staff và kiểm thử hồi quy tối thiểu.

## Việc nên chốt ngay
- Chốt bảng quyền cho 2 role backoffice.
- Chốt mapping từ role cũ sang role mới trong migration.
- Chốt danh sách API tối thiểu để bỏ `mock-data` ở `/search`, `/booking`, `/manage-booking`, `/support`, `/backoffice`.
- Chốt quy tắc ai được sửa giá, lịch bay, hoàn tiền và nội dung hỗ trợ.
