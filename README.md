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

### Nguyên tắc phân vai kỹ thuật
- `apps/web` chỉ phụ trách giao diện, nhập liệu, hiển thị dữ liệu và gọi API.
- `apps/api` là backend chính, chứa nghiệp vụ cốt lõi như đăng nhập, tìm chuyến bay, đặt vé, giữ chỗ, thanh toán và quản trị.
- Không đặt nghiệp vụ chính ở cả `web` và `backend` cùng lúc để tránh trùng logic.

## Quy tắc làm việc với trợ lý lập trình AI
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
Áp dụng cho cả AI agent và lập trình viên trong dự án.

1. Mọi commit bắt buộc theo đúng mẫu: `Type(scope):description`.
2. `Type` phải thuộc danh sách cho phép bên dưới và dùng chữ thường.
3. `scope` là phạm vi thay đổi chính, không được để trống.
4. `description` bắt buộc viết bằng tiếng Việt, ngắn gọn, nêu đúng thay đổi chính.
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
- Phần `description` phải là tiếng Việt, đi thẳng vào thay đổi chính, không mơ hồ.
- Không chèn nhiều thay đổi không liên quan trong một commit.

### Ví dụ đúng
- `feat(dat-ve):thêm bộ lọc chuyến bay theo hạng ghế`
- `fix(thanh-toan):sửa lỗi nhân đôi giao dịch khi tải lại trang`
- `docs(api):bổ sung hướng dẫn xác thực bằng jwt`
- `refactor(booking-service):tách hàm tính giá vé theo từng bước`
- `test(dat-ve):thêm kiểm thử đơn vị cho hàm tính tổng tiền`

### Quy định trước khi đẩy mã
- AI agent và lập trình viên phải tự kiểm tra thông điệp commit đúng mẫu trước khi `git commit`.
- Nếu sai mẫu hoặc không phải tiếng Việt ở phần `description`, phải sửa lại trước khi đẩy lên GitHub.

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
3. Mọi commit trong nhánh phải theo mẫu `Type(scope):description` và phần `description` bằng tiếng Việt.
4. Đẩy nhánh lên sớm và mở yêu cầu hợp nhất (`pull request`) ngay khi có bản chạy được.
5. Trước khi xin duyệt, phải cập nhật thay đổi mới nhất từ `main` và xử lý xung đột.

### Quy tắc duyệt và hợp nhất mã
1. Không hợp nhất trực tiếp vào `main`; chỉ hợp nhất qua `pull request`.
2. Bắt buộc có ít nhất 1 người duyệt; phần nhạy cảm (xác thực, thanh toán, di trú dữ liệu) cần 2 người duyệt.
3. Bắt buộc qua toàn bộ kiểm tra tự động: biên dịch, kiểm thử, kiểm tra chuẩn mã.
4. Bắt buộc xử lý hết toàn bộ trao đổi trước khi hợp nhất.
5. Ưu tiên kiểu hợp nhất `squash and merge` để lịch sử thay đổi gọn và rõ.
6. Tiêu đề `pull request` hoặc thông điệp hợp nhất phải theo mẫu `Type(scope):description`, phần `description` bằng tiếng Việt.
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

