# Lộ trình triển khai backend nhiều vai trò

## Mục tiêu
- Biến phần giao diện hiện có thành hệ thống web bán vé máy bay chạy được thật với backend trung tâm tại `apps/api`.
- Hỗ trợ đầy đủ các vai trò: `guest`, `customer`, `member`, `ticket_agent`, `customer_support`, `operations_staff`, `finance_staff`, `content_editor`, `system_admin`.
- Ưu tiên thứ tự triển khai theo hướng: chạy được luồng công khai và tự phục vụ trước, sau đó mới mở rộng sâu cho backoffice.

## Phạm vi hiện trạng
- Backend hiện có nền Spring Boot, JPA, Flyway, PostgreSQL, CORS.
- Dữ liệu thật mới chỉ đủ cho danh mục sân bay, chuyến bay và tồn ghế theo hạng vé.
- Tìm chuyến bay đã có truy vấn DB thật.
- Phần còn lại như auth, booking overview, customer overview, support overview, CMS homepage, admin dashboard vẫn đang trả dữ liệu mẫu.
- Chưa có JWT, refresh token, OTP email, RBAC, audit log, thanh toán, ticketing, loyalty, CMS thật.
- Frontend vẫn chủ yếu dùng `mock-data`, nên việc nối web với backend thật phải đi cùng lộ trình API rõ ràng.

## Nguyên tắc triển khai
- Không làm tất cả module cùng lúc.
- Mỗi đợt chỉ chốt một mục tiêu chính và một nhóm bảng dữ liệu gần nhau.
- Ưu tiên tương thích với `packages/shared-types`, nhưng chỉ mở rộng hợp đồng API sau khi chốt nhu cầu rõ ràng.
- Mọi luồng nhạy cảm như auth, payment, refund, phân quyền phải có test tích hợp và log kiểm soát.
- Toàn bộ tệp Java, TypeScript, SQL, Markdown phải thống nhất UTF-8 để tránh lỗi tiếng Việt có dấu.

## Thứ tự ưu tiên tổng thể
1. Nền tảng xác thực, phân quyền, hồ sơ tài khoản.
2. Danh mục công khai, tìm sân bay, tìm chuyến bay, dữ liệu trang chủ.
3. Giữ chỗ, dịch vụ bổ trợ, thanh toán sandbox, xuất vé.
4. Tự phục vụ sau bán: tra cứu booking, đổi hoặc hoàn, check-in, flight status.
5. Backoffice cho `ticket_agent`, `customer_support`, `operations_staff`, `finance_staff`.
6. CMS cho `content_editor`.
7. Loyalty và hội viên cho `member`.
8. Quan sát hệ thống, audit, tối ưu hiệu năng, test hồi quy.

## Ma trận vai trò đích
| Vai trò | Chức năng chính |
| --- | --- |
| `guest` | Tìm chuyến, xem giá, tra cứu booking có xác minh, xem trạng thái chuyến bay, check-in đủ điều kiện, đọc nội dung công khai |
| `customer` | Đăng ký, đăng nhập, đặt vé, thanh toán, quản lý booking, thông báo, hồ sơ hành khách |
| `member` | Toàn bộ của `customer` và thêm điểm thưởng, voucher, hạng hội viên |
| `ticket_agent` | Tạo booking hộ, giữ chỗ, báo giá đoàn hoặc doanh nghiệp, xuất lại vé, hỗ trợ khách công tác |
| `customer_support` | Xử lý ticket hỗ trợ, takeover từ trợ lý hỗ trợ, bù dịch vụ, hỗ trợ đổi hoặc hoàn theo rule |
| `operations_staff` | Cập nhật trạng thái chuyến bay, gate, tồn ghế, đóng hoặc mở bán, phát cảnh báo vận hành |
| `finance_staff` | Đối soát giao dịch, hóa đơn, hàng chờ hoàn tiền, duyệt hoàn, khóa sổ |
| `content_editor` | Banner, blog, FAQ, khuyến mãi, cẩm nang sân bay, nội dung song ngữ |
| `system_admin` | Phân quyền, audit log, cấu hình rule, mẫu thông báo, khóa hoặc mở tài khoản, feature flag |

## Epic 01: Xác thực, phân quyền và hồ sơ tài khoản

### Mục tiêu
- Có nền auth thật cho khách và staff.
- Có RBAC ở mức API và mức nghiệp vụ.
- Có khả năng mở rộng thêm role mà không phải sửa tràn lan.

### Bảng dữ liệu cần có
- `user_account`
- `role`
- `permission`
- `role_permission`
- `user_role`
- `refresh_session`
- `otp_challenge`
- `user_profile`
- `customer_profile`
- `staff_profile`
- `saved_passenger`
- `audit_log`

### API cần có
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password/request-otp`
- `POST /api/auth/forgot-password/verify-otp`
- `POST /api/auth/reset-password`
- `GET /api/me/profile`
- `PATCH /api/me/profile`
- `GET /api/me/passengers`
- `POST /api/me/passengers`
- `PATCH /api/me/passengers/{id}`
- `DELETE /api/me/passengers/{id}`

### Kiểm thử bắt buộc
- Đăng ký, đăng nhập, refresh token, logout.
- OTP hết hạn, OTP sai, OTP bị dùng lại.
- Chặn truy cập trái vai trò.
- Khóa tài khoản, đổi mật khẩu, thu hồi phiên.

### Thứ tự commit gợi ý
- `feat(api):thêm bảng tài khoản và phân quyền nền`
- `feat(auth):thêm đăng nhập và làm mới phiên jwt`
- `feat(auth):thêm quên mật khẩu bằng otp email`
- `test(auth):bổ sung kiểm thử xác thực và phân quyền`

## Epic 02: Danh mục công khai và tìm chuyến bay

### Mục tiêu
- Nối được các trang công khai với backend thật.
- Có dữ liệu đủ ổn định cho trang chủ, tìm chuyến, blog, khuyến mãi.

### Bảng dữ liệu cần có
- `airport`
- `route`
- `flight`
- `flight_segment`
- `fare_family`
- `fare_rule`
- `flight_fare_inventory`
- `ancillary_catalog`
- `promotion`
- `faq_public`
- `homepage_section`

### API cần có
- `GET /api/meta/health`
- `GET /api/airports`
- `GET /api/flights/search`
- `GET /api/flights/status`
- `GET /api/public/homepage`
- `GET /api/public/promotions`
- `GET /api/public/faqs`
- `GET /api/public/blog`

### Kiểm thử bắt buộc
- Tìm chuyến một chiều.
- Tìm chuyến khứ hồi.
- Lọc theo gói giá.
- Kiểm tra lỗi ngày đi, ngày về, tổng số khách, mã sân bay.

### Thứ tự commit gợi ý
- `feat(api):mở rộng danh mục chuyến bay và gói giá`
- `feat(search):hoàn thiện api tìm chuyến và lọc dữ liệu`
- `feat(content):thêm dữ liệu công khai cho trang chủ và faq`
- `test(search):bổ sung kiểm thử luồng tìm chuyến bay`

## Epic 03: Giữ chỗ, dịch vụ bổ trợ, thanh toán và xuất vé

### Mục tiêu
- Đặt vé được thật từ web.
- Chống nhân đôi giao dịch và kiểm soát được tồn ghế.

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

### API cần có
- `POST /api/bookings/holds`
- `GET /api/bookings/{bookingCode}`
- `POST /api/bookings/{bookingCode}/repricing`
- `POST /api/bookings/{bookingCode}/ancillaries`
- `POST /api/bookings/{bookingCode}/payments/session`
- `POST /api/payments/callback`
- `POST /api/bookings/{bookingCode}/issue-ticket`
- `GET /api/bookings/{bookingCode}/invoice`

### Quy tắc nghiệp vụ bắt buộc
- Giữ chỗ có thời gian sống rõ ràng.
- Tính giá lại trước thanh toán.
- Callback thanh toán phải có idempotency key.
- Không xuất vé hai lần cho cùng một booking.
- Ghi log mọi bước quan trọng: giữ chỗ, thanh toán, xuất vé, lỗi callback.

### Kiểm thử bắt buộc
- Giữ chỗ thành công.
- Hết hạn giữ chỗ.
- Thanh toán callback lặp lại.
- Xuất vé sau thanh toán.
- Mua thêm hành lý hoặc ghế.

### Thứ tự commit gợi ý
- `feat(dat-ve):thêm luồng giữ chỗ và hành khách`
- `feat(thanh-toan):thêm tạo phiên thanh toán sandbox`
- `feat(dat-ve):thêm xuất vé và gửi thông báo`
- `test(thanh-toan):bổ sung kiểm thử callback và chống trùng`

## Epic 04: Tự phục vụ sau bán cho guest và customer

### Mục tiêu
- Khách không cần gọi tổng đài cho các thao tác phổ biến.
- Hoàn chỉnh các trang `manage-booking`, `check-in`, `flight-status`, `account`.

### Bảng dữ liệu cần có
- `booking_lookup_session`
- `booking_change_request`
- `refund_request`
- `checkin_session`
- `boarding_pass`
- `flight_event`
- `notification_log`

### API cần có
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
- `GET /api/flights/{flightCode}/status`

### Kiểm thử bắt buộc
- Tra cứu booking bằng OTP.
- Đổi chuyến khi đủ điều kiện.
- Từ chối hoàn hoặc đổi khi quá hạn.
- Mở và đóng check-in theo giờ.
- Sinh boarding pass hợp lệ.

### Thứ tự commit gợi ý
- `feat(tu-phuc-vu):thêm tra cứu booking có otp`
- `feat(tu-phuc-vu):thêm đổi chuyến và hoàn vé theo rule`
- `feat(check-in):thêm làm thủ tục trực tuyến và boarding pass`
- `test(tu-phuc-vu):bổ sung kiểm thử tra cứu và đổi hoàn`

## Epic 05: Backoffice bán vé, chăm sóc khách hàng, điều hành, tài chính

### Mục tiêu
- Staff dùng được hệ thống thật thay vì màn hình mô phỏng.
- Mỗi vai trò chỉ thấy đúng module và đúng dữ liệu được phép xử lý.

### Module và API chính
- `sales`
  - `GET /api/backoffice/sales/bookings`
  - `POST /api/backoffice/sales/bookings`
  - `POST /api/backoffice/sales/bookings/{bookingCode}/issue-ticket`
  - `POST /api/backoffice/sales/corporate-quotes`
- `support`
  - `GET /api/backoffice/support/tickets`
  - `POST /api/backoffice/support/tickets`
  - `PATCH /api/backoffice/support/tickets/{id}`
  - `POST /api/backoffice/support/tickets/{id}/compensations`
- `operations`
  - `GET /api/backoffice/operations/flights`
  - `PATCH /api/backoffice/operations/flights/{id}/status`
  - `PATCH /api/backoffice/operations/flights/{id}/gate`
  - `PATCH /api/backoffice/operations/inventory/{id}`
- `finance`
  - `GET /api/backoffice/finance/payments`
  - `GET /api/backoffice/finance/refunds`
  - `POST /api/backoffice/finance/refunds/{id}/approve`
  - `POST /api/backoffice/finance/day-close`

### Bảng dữ liệu cần có
- `support_ticket`
- `support_ticket_message`
- `support_ticket_assignment`
- `compensation_log`
- `flight_operation_event`
- `refund_approval`
- `reconciliation_batch`
- `reconciliation_item`
- `corporate_account`

### Kiểm thử bắt buộc
- Phân quyền từng module staff.
- Điều hành đổi trạng thái chuyến bay.
- Kế toán duyệt hoàn tiền.
- CSKH takeover và chuyển trạng thái ticket.

### Thứ tự commit gợi ý
- `feat(backoffice-sales):thêm api bán vé nội bộ`
- `feat(backoffice-support):thêm ticket hỗ trợ và takeover`
- `feat(backoffice-operations):thêm điều hành trạng thái chuyến bay`
- `feat(backoffice-finance):thêm đối soát và duyệt hoàn tiền`
- `test(backoffice):bổ sung kiểm thử phân quyền staff`

## Epic 06: CMS và nội dung cho content editor

### Mục tiêu
- Nội dung trang chủ, blog, FAQ, khuyến mãi không còn phụ thuộc dữ liệu cứng.

### Bảng dữ liệu cần có
- `cms_content`
- `cms_revision`
- `cms_publish_job`
- `media_asset`
- `faq_category`

### API cần có
- `GET /api/cms/homepage`
- `GET /api/cms/faqs`
- `GET /api/cms/blog`
- `POST /api/backoffice/cms/content`
- `PATCH /api/backoffice/cms/content/{id}`
- `POST /api/backoffice/cms/content/{id}/publish`
- `GET /api/backoffice/cms/revisions`

### Kiểm thử bắt buộc
- Soạn nháp và xuất bản.
- Khôi phục phiên bản cũ.
- Chặn người không phải `content_editor` hoặc `system_admin`.

### Thứ tự commit gợi ý
- `feat(cms):thêm kho nội dung và phiên bản bài viết`
- `feat(cms):thêm xuất bản banner faq và khuyến mãi`
- `test(cms):bổ sung kiểm thử phân quyền và xuất bản`

## Epic 07: Loyalty và hội viên

### Mục tiêu
- Hoàn thiện giá trị cho role `member`.
- Kết nối được điểm thưởng, voucher, ưu đãi theo hạng.

### Bảng dữ liệu cần có
- `member_account`
- `member_tier`
- `point_ledger`
- `voucher`
- `voucher_redemption`
- `campaign_offer`

### API cần có
- `GET /api/me/member`
- `GET /api/me/points`
- `GET /api/me/vouchers`
- `POST /api/bookings/{bookingCode}/apply-voucher`
- `GET /api/public/member-offers`

### Kiểm thử bắt buộc
- Tích điểm sau xuất vé.
- Đổi voucher.
- Giới hạn voucher theo điều kiện.

### Thứ tự commit gợi ý
- `feat(member):thêm tài khoản hội viên và sổ điểm`
- `feat(member):thêm voucher và ưu đãi theo hạng`
- `test(member):bổ sung kiểm thử tích điểm và dùng voucher`

## Epic 08: Ổn định vận hành, bảo mật và quan sát hệ thống

### Mục tiêu
- Hệ thống chạy ổn định khi có nhiều vai trò và nhiều luồng nhạy cảm.

### Hạng mục bắt buộc
- Rate limit cho login, OTP, lookup booking.
- Masking dữ liệu nhạy cảm trong log và phản hồi.
- Outbox hoặc hàng chờ cho email và thông báo.
- Audit log bắt buộc cho các thao tác staff.
- Metric và health check chi tiết.
- Theo dõi lỗi callback, lỗi thanh toán, lỗi check-in.
- Job dọn giữ chỗ hết hạn.
- Kiểm soát khóa dữ liệu tồn ghế bằng optimistic locking hoặc chiến lược tương đương.

### Kiểm thử bắt buộc
- Test tích hợp cho auth, booking, payment, refund.
- Test phân quyền theo role.
- Test hồi quy cho dữ liệu chuyến bay.
- Test tải cơ bản cho tìm chuyến và tra cứu booking.

### Thứ tự commit gợi ý
- `feat(he-thong):thêm audit log và outbox thông báo`
- `feat(he-thong):thêm chống lạm dụng và khóa dữ liệu tồn ghế`
- `test(he-thong):bổ sung kiểm thử tích hợp và hồi quy`

## Gợi ý chia đợt triển khai

### Đợt 1
- Epic 01
- Epic 02

### Đợt 2
- Epic 03

### Đợt 3
- Epic 04

### Đợt 4
- Epic 05

### Đợt 5
- Epic 06
- Epic 07

### Đợt 6
- Epic 08

## Điều kiện xem là đủ để nối web thật
- Có auth thật cho khách.
- Có tìm chuyến, giữ chỗ, thanh toán sandbox, xuất vé.
- Có tra cứu booking, đổi hoặc hoàn cơ bản, check-in, flight status.
- Có ít nhất RBAC thật cho `ticket_agent`, `customer_support`, `operations_staff`, `finance_staff`, `content_editor`, `system_admin`.
- Có audit log, test tích hợp và cơ chế chống nhân đôi giao dịch.

## Việc nên làm ngay sau tài liệu này
- Chốt bộ bảng dữ liệu của Epic 01 và Epic 03 trước.
- Chốt chuẩn mã lỗi API dùng chung cho web và backend.
- Chốt chiến lược token, OTP và callback thanh toán.
- Chốt danh sách API tối thiểu để bỏ `mock-data` ở các trang `/search`, `/booking`, `/manage-booking`, `/account`, `/support`, `/backoffice`.
