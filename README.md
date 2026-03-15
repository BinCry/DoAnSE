# Quản Lý Bán Vé Máy Bay (Sườn Dự Án)

### Kiến trúc tổng thể
- Giao diện web: `Next.js` + `React` + `TypeScript`
- Backend chính: `Java 21` + `Spring Boot`
- Cơ sở dữ liệu: `Supabase PostgreSQL`
- Hạ tầng phụ trợ: `Docker`, `Nginx`, `GitHub Actions`

### Công nghệ phía giao diện
- `Next.js App Router`: Xây dựng giao diện web và điều hướng trang.
- `React`: Tổ chức giao diện theo thành phần.
- `TypeScript`: Giúp kiểm soát kiểu dữ liệu rõ ràng hơn.
- `Tailwind CSS`: Viết giao diện nhanh và đồng bộ.
- `shadcn/ui`: Dùng các thành phần giao diện sẵn có để làm web nhanh hơn.

### Công nghệ phía backend
- `Java 21`: Ngôn ngữ backend chính của dự án.
- `Spring Boot`: Tạo các API và tổ chức nghiệp vụ phía máy chủ.
- `Spring Web`: Xử lý yêu cầu và phản hồi HTTP.
- `Spring Security`: Quản lý xác thực và phân quyền khi cần.
- `Spring Data JPA`: Làm việc với dữ liệu theo mô hình đối tượng.
- `Bean Validation`: Kiểm tra dữ liệu đầu vào ở phía backend.

### Dữ liệu và dịch vụ nền
- `Supabase PostgreSQL`: Cơ sở dữ liệu chính của hệ thống.
- `Flyway`: Quản lý lịch sử thay đổi cấu trúc dữ liệu.
- `Supabase Storage`: Dùng khi cần lưu tệp như ảnh, vé điện tử hoặc tài liệu đính kèm.

### Kiểm thử dự kiến
- `Vitest`: Kiểm thử đơn vị cho phần giao diện nếu cần.
- `Playwright`: Kiểm thử luồng sử dụng trên web.
- `JUnit 5`: Kiểm thử cho backend Java.
- `Mockito`: Giả lập phụ thuộc khi kiểm thử backend.

## Triển khai Vercel
- Có thể triển khai ngay phần `apps/web` lên `Vercel` dù chưa có backend thật, vì giao diện hiện dùng dữ liệu mẫu trong `apps/web/src/lib/mock-data.ts`.
- Khi import repo lên `Vercel`, hãy tạo một project riêng cho phần web và chọn `Root Directory` là `apps/web`.
- `Vercel` sẽ tự nhận diện `Next.js`; tệp `apps/web/vercel.json` chỉ dùng để chốt rõ framework triển khai.
- Sau khi có backend thật, cần bổ sung biến môi trường và địa chỉ API tương ứng rồi triển khai lại.

## Lộ trình hoàn thiện hệ thống

### Ưu tiên triển khai
- Giai đoạn đầu ưu tiên khu công khai và tự phục vụ để khách vãng lai vẫn xem web, tìm chuyến bay, tra cứu đặt chỗ và làm các thao tác cơ bản.
- Giai đoạn sau mới mở rộng sâu cho các module backoffice như bán vé hộ, chăm sóc khách hàng, điều hành, tài chính, quản trị nội dung và quản trị hệ thống.
- Mọi thay đổi phải đi theo nhịp nhỏ: đọc hiểu -> sửa đúng phạm vi -> kiểm tra -> commit riêng từng mục tiêu.

### Ma trận vai trò
| Vai trò | Phạm vi chính | Không được phép |
| --- | --- | --- |
| `guest` | Xem trang công khai, tìm chuyến bay, xem khuyến mãi, FAQ, tạo đặt chỗ không cần tài khoản, tra cứu bằng mã đặt chỗ có xác minh | Vào backoffice, xem dữ liệu tài khoản người khác |
| `customer` | Đặt vé, thanh toán, quản lý đặt chỗ, đổi hoặc hủy theo điều kiện, làm thủ tục trực tuyến | Động vào dữ liệu và thao tác nội bộ |
| `member` | Toàn bộ quyền của `customer` kèm điểm thưởng, voucher, ưu đãi theo hạng | Tự sửa điều kiện hội viên |
| `ticket_agent` | Tạo đặt chỗ hộ, giữ chỗ, xuất lại vé, hỗ trợ khách doanh nghiệp | Duyệt hoàn tiền cuối, đổi cấu hình hệ thống |
| `customer_support` | Xử lý yêu cầu hỗ trợ, tiếp nhận từ trợ lý hỗ trợ, bù dịch vụ, theo dõi SLA | Sửa lịch bay, sửa giá gốc |
| `operations_staff` | Cập nhật trạng thái chuyến bay, tồn ghế, đóng hoặc mở bán chặng | Xem dữ liệu thanh toán nhạy cảm |
| `finance_staff` | Đối soát, xác nhận hoàn tiền, kiểm tra hóa đơn, khóa sổ ngày | Sửa nội dung và lịch bay |
| `content_editor` | Quản trị banner, cẩm nang, FAQ, khuyến mãi, nội dung song ngữ | Truy cập dữ liệu đặt chỗ và thanh toán |
| `system_admin` | Phân quyền, nhật ký kiểm soát, cấu hình rule, mẫu thông báo | Xem dữ liệu thẻ thanh toán đầy đủ |

### Luồng chính cần hoàn thiện
- Luồng công khai: trang chủ -> tìm chuyến bay -> xem gói giá -> chọn chuyến -> tạo giữ chỗ -> thanh toán sandbox -> nhận vé và thông báo.
- Luồng tự phục vụ: tra cứu đặt chỗ bằng mã đặt chỗ + email hoặc số điện thoại -> xác minh OTP -> đổi chuyến, hoàn hoặc hủy, mua thêm dịch vụ, làm thủ tục trực tuyến.
- Luồng tài khoản: đăng ký -> đăng nhập -> làm mới phiên -> quên mật khẩu qua OTP email -> đặt lại mật khẩu theo chính sách an toàn.
- Luồng backoffice: staff vào đúng module theo vai trò -> xử lý hàng chờ nghiệp vụ -> ghi nhật ký thao tác -> đồng bộ trạng thái ra khu công khai nếu có ảnh hưởng.

### Danh sách màn hình theo mức ưu tiên
- MVP công khai: `/`, `/search`, `/booking`, `/manage-booking`, `/check-in`, `/flight-status`, `/support`, `/blog`, `/account`, `login`, `register`, `forgot-password`, `reset-password`.
- MVP dữ liệu và API: xác thực JWT, OTP email, danh mục sân bay và chuyến bay, giữ chỗ, thanh toán sandbox, thông báo, tra cứu booking cho guest và customer.
- Nâng cao sau MVP: dashboard vai trò chi tiết, điều hành chuyến bay nâng cao, đối soát tài chính, CMS đầy đủ phiên bản và lịch đăng, báo cáo tổng hợp.

### Nhịp chia task và commit
- Mỗi giai đoạn chỉ xử lý một mục tiêu chính và có commit riêng.
- Commit phải đúng mẫu `Type(scope):description` và dùng tiếng Việt có dấu.
- Sau từng commit phải có kiểm tra phù hợp như `build web`, `test web`, `test api` hoặc kiểm tra giao diện ở các kích thước `320`, `360`, `390`, `412`, `768`, `1024`, `1280`.
- Không dồn nhiều đầu việc không liên quan vào cùng một commit.

### Nguyên tắc phân vai kỹ thuật
- `apps/web` chỉ phụ trách giao diện, nhập liệu, hiển thị dữ liệu và gọi API.
- `apps/api` là backend chính, chứa nghiệp vụ cốt lõi như đăng nhập, tìm chuyến bay, đặt vé, giữ chỗ, thanh toán và quản trị.
- Không đặt nghiệp vụ chính ở cả `web` và `backend` cùng lúc để tránh trùng logic.

## Quy tắc làm việc với công cụ hỗ trợ lập trình
1. Luôn làm theo thứ tự: hiểu bối cảnh -> lập kế hoạch -> xin/đợi xác nhận nếu tác vụ có rủi ro cao -> mới sửa mã.
2. Chỉ sửa trong phạm vi tệp cần thiết hoặc các tệp phát sinh lỗi liên đới.
3. Không tự ý đổi hợp đồng API, lược đồ dữ liệu, thư viện phụ thuộc, cấu hình môi trường, luồng xác thực, nghiệp vụ thanh toán, di trú dữ liệu hoặc CI/CD khi chưa được cho phép rõ ràng.
4. Mọi mã sinh ra chỉ là bản nháp cho tới khi có kiểm thử, kiểm tra chuẩn mã, kiểm tra kiểu dữ liệu và rà soát thủ công.
5. Luôn ưu tiên bản vá nhỏ nhất giải quyết đúng vấn đề.
6. Không tái cấu trúc ngoài phạm vi yêu cầu.
7. Sau mỗi thay đổi phải báo cáo: đã sửa gì, vì sao, test nào đã chạy, rủi ro nào còn lại.
8. Nếu thiếu thông tin, nêu giả định thay vì tự bịa.
9. Nếu có nhiều phương án, nêu rõ phần đánh đổi trước khi triển khai.
10. Không dùng tiếng Anh trong `README.md` và trong comment mã.
11. Comment mã phải bằng tiếng Việt, ngắn gọn, trực quan và nêu rõ chỗ nào thay thế cái gì (nếu có).

## Quy ước commit GitHub (bắt buộc)
Áp dụng cho mọi thành viên tham gia dự án.

1. Mọi commit bắt buộc theo đúng mẫu: `Type(scope):description`.
2. `Type` phải thuộc danh sách cho phép bên dưới và dùng chữ thường.
3. `scope` là phạm vi thay đổi chính, không được để trống.
4. `description` bắt buộc viết bằng tiếng Việt có dấu, ngắn gọn, nêu đúng thay đổi chính.
5. Không dùng thông điệp commit mơ hồ hoặc sai mẫu (ví dụ: `update`, `fix bug`, `abc`).
6. Mỗi commit chỉ nên chứa một mục tiêu thay đổi chính để dễ truy vết.

### Các Type hay dùng
- `feat`: Một tính năng mới.
- `fix`: Sửa lỗi.
- `docs`: Cập nhật tài liệu.
- `style`: Cải thiện định dạng, kiểu dáng, chuẩn mã nguồn.
- `refactor`: Sửa đổi mã nguồn không ảnh hưởng tính năng.
- `perf`: Cải thiện hiệu năng.
- `chore`: Cập nhật công cụ, thư viện hỗ trợ.
- `test`: Thêm hoặc cập nhật kiểm thử.
- `revert`: Quay lại một số thay đổi trước đó.

### Hướng dẫn viết thông điệp commit
- Chỉ dùng một `Type` trong danh sách cho phép.
- Luôn có `scope` rõ ràng theo phạm vi thay đổi chính (ví dụ: `api`, `ui`, `dat-ve`, `thanh-toan`).
- Phần `description` phải là tiếng Việt có dấu, đi thẳng vào thay đổi chính, không mơ hồ.
- Không chèn nhiều thay đổi không liên quan trong một commit.

### Ví dụ đúng
- `feat(dat-ve):thêm bộ lọc chuyến bay theo hạng ghế`
- `fix(thanh-toan):sửa lỗi nhân đôi giao dịch khi tải lại trang`
- `docs(api):bổ sung hướng dẫn xác thực bằng jwt`
- `refactor(booking-service):tách hàm tính giá vé theo từng bước`
- `test(dat-ve):thêm kiểm thử đơn vị cho hàm tính tổng tiền`

### Quy định trước khi đẩy mã
- Mọi thành viên phải tự kiểm tra thông điệp commit đúng mẫu trước khi `git commit`.
- Nếu sai mẫu hoặc phần `description` không phải tiếng Việt có dấu, phải sửa lại trước khi đẩy lên GitHub.

## Quy tắc teamwork GitHub cho nhóm 4 (bắt buộc)
Áp dụng cho toàn bộ thành viên trong nhóm.

### Mô hình nhánh
- `main`: Nhánh ổn định, cấm đẩy trực tiếp.
- `feat/<pham-vi>-<mo-ta-ngan>`: Nhánh làm tính năng mới.
- `fix/<pham-vi>-<mo-ta-ngan>`: Nhánh sửa lỗi.
- `docs/<pham-vi>-<mo-ta-ngan>`, `test/<pham-vi>-<mo-ta-ngan>`, `refactor/<pham-vi>-<mo-ta-ngan>`, `chore/<pham-vi>-<mo-ta-ngan>`: Nhánh cho thay đổi kỹ thuật tương ứng.
- `hotfix/<pham-vi>-<mo-ta-ngan>`: Nhánh xử lý lỗi khẩn cấp phát sinh trên `main`.

### Quy trình làm việc theo nhánh
1. Luôn tạo nhánh mới từ `main`.
2. Mỗi nhánh chỉ xử lý một mục tiêu chính.
3. Mọi commit trong nhánh phải theo mẫu `Type(scope):description` và phần `description` bằng tiếng Việt có dấu.
4. Đẩy nhánh lên sớm và mở yêu cầu hợp nhất (`pull request`) ngay khi có bản chạy được.
5. Trước khi xin duyệt, phải cập nhật thay đổi mới nhất từ `main` và xử lý xung đột.

### Quy tắc duyệt và hợp nhất mã
1. Không hợp nhất trực tiếp vào `main`; chỉ hợp nhất qua `pull request`.
2. Bắt buộc có ít nhất 1 người duyệt; phần nhạy cảm (xác thực, thanh toán, di trú dữ liệu) cần 2 người duyệt.
3. Bắt buộc qua toàn bộ kiểm tra tự động: biên dịch, kiểm thử, kiểm tra chuẩn mã.
4. Bắt buộc xử lý hết toàn bộ trao đổi trước khi hợp nhất.
5. Ưu tiên kiểu hợp nhất `squash and merge` để lịch sử thay đổi gọn và rõ.
6. Tiêu đề `pull request` hoặc thông điệp hợp nhất phải theo mẫu `Type(scope):description`, phần `description` bằng tiếng Việt có dấu.
7. Sau khi hợp nhất phải xóa nhánh để tránh tồn đọng nhánh cũ.
8. Riêng bạn (người có quyền hạn cao nhất) có quyền quyết định cuối cùng và được phép tự duyệt, tự hợp nhất khi cần.

### Thiết lập bảo vệ nhánh `main` trên GitHub
- Bật yêu cầu mở `pull request` trước khi hợp nhất.
- Bật yêu cầu số lượt duyệt tối thiểu.
- Bật yêu cầu các kiểm tra tự động phải thành công trước khi hợp nhất.
- Bật yêu cầu xử lý xong mọi trao đổi trước khi hợp nhất.
- Tắt quyền đẩy thẳng và tắt `force push` vào `main`, trừ tài khoản của bạn trong trường hợp cần xử lý khẩn.
- Bật hủy duyệt cũ khi có commit mới được đẩy lên.

### Quy ước phối hợp trong nhóm 4
- Mỗi `pull request` có 1 người duyệt chính và luân phiên theo tuần.
- Thành viên khác không tự duyệt và tự hợp nhất mã của chính mình; riêng bạn được phép thực hiện khi cần.
- Ưu tiên `pull request` nhỏ (khoảng dưới 300 dòng thay đổi) để duyệt nhanh và giảm sót lỗi.
