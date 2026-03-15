package com.qlvmb.airticket.service;

import com.qlvmb.airticket.domain.dto.AdminDashboardResponse;
import com.qlvmb.airticket.domain.dto.AuthSummaryResponse;
import com.qlvmb.airticket.domain.dto.BookingOverviewResponse;
import com.qlvmb.airticket.domain.dto.CmsHomepageResponse;
import com.qlvmb.airticket.domain.dto.CustomerOverviewResponse;
import com.qlvmb.airticket.domain.dto.FlightSearchResponse;
import com.qlvmb.airticket.domain.dto.SupportOverviewResponse;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DemoDataService {

  public AuthSummaryResponse getAuthSummary() {
    return new AuthSummaryResponse(
        List.of(
            new AuthSummaryResponse.RoleItem(
                "ticket_agent",
                "Nhân viên bán vé",
                List.of("Tạo booking hộ", "Giữ chỗ", "Xuất lại vé")
            ),
            new AuthSummaryResponse.RoleItem(
                "customer_support",
                "Nhân viên CSKH",
                List.of("Xử lý ticket", "Takeover chatbot", "Đổi/hoàn theo rule")
            ),
            new AuthSummaryResponse.RoleItem(
                "system_admin",
                "Admin hệ thống",
                List.of("Phân quyền", "Audit log", "Cấu hình rule")
            )
        ),
        List.of(
            "Khách vãng lai không được vào backoffice.",
            "Kế toán không được sửa nội dung chuyến bay.",
            "Admin không xem dữ liệu thẻ đầy đủ."
        )
    );
  }

  public CustomerOverviewResponse getCustomerOverview() {
    return new CustomerOverviewResponse(
        "Nguyễn Minh Anh",
        "Hạng Vàng",
        12480,
        List.of(
            "AA215 • SGN → HAN • 20/03/2026",
            "AA330 • HAN → DAD • 23/03/2026"
        ),
        List.of(
            "Booking A6C2P1 đã thanh toán và gửi email.",
            "Check-in cho AA215 sẽ mở sau 12 giờ nữa."
        )
    );
  }

  public FlightSearchResponse searchFlights(String from, String to, String tripType) {
    return new FlightSearchResponse(
        tripType,
        from,
        to,
        List.of("Giờ bay", "Gói giá", "Ngân sách", "Còn ghế"),
        List.of(
            new FlightSearchResponse.FlightCard(
                "AA201",
                "06:10",
                "08:20",
                "2 giờ 10 phút",
                "on_time",
                "pho_thong_tiet_kiem",
                1490000,
                8
            ),
            new FlightSearchResponse.FlightCard(
                "AA215",
                "09:45",
                "11:55",
                "2 giờ 10 phút",
                "boarding",
                "pho_thong_linh_hoat",
                1890000,
                5
            ),
            new FlightSearchResponse.FlightCard(
                "AA233",
                "18:20",
                "20:35",
                "2 giờ 15 phút",
                "scheduled",
                "thuong_gia",
                3490000,
                3
            )
        ),
        List.of(
            new FlightSearchResponse.FareCard(
                "Phổ thông tiết kiệm",
                1490000,
                List.of("7kg hành lý xách tay", "Đổi vé có phí", "Ghế tính phí")
            ),
            new FlightSearchResponse.FareCard(
                "Phổ thông linh hoạt",
                1890000,
                List.of("1 kiện 23kg", "Đổi vé ít phí hơn", "Giữ giá 24 giờ")
            ),
            new FlightSearchResponse.FareCard(
                "Thương gia",
                3490000,
                List.of("2 kiện 32kg", "Phòng chờ", "Hoàn/đổi linh hoạt")
            )
        )
    );
  }

  public BookingOverviewResponse getBookingOverview(String bookingCode) {
    return new BookingOverviewResponse(
        bookingCode,
        "held",
        "2026-03-11T14:15:00+07:00",
        List.of(
            "Chọn chuyến bay",
            "Thông tin hành khách",
            "Dịch vụ bổ trợ",
            "Thanh toán & xuất vé"
        ),
        List.of(
            new BookingOverviewResponse.AncillaryItem(
                "SEAT_PLUS",
                "Ghế hàng đầu",
                "Thêm chỗ duỗi chân và ưu tiên xuống tàu.",
                320000
            ),
            new BookingOverviewResponse.AncillaryItem(
                "BAG_23",
                "Hành lý 23kg",
                "Cho phép mua trước thanh toán hoặc sau đặt chỗ.",
                290000
            )
        ),
        List.of("QR ngân hàng", "Thẻ", "Ví điện tử")
    );
  }

  public SupportOverviewResponse getSupportOverview() {
    return new SupportOverviewResponse(
        List.of(
            new SupportOverviewResponse.TicketCard(
                "TK-2401",
                "Yêu cầu hoàn vé do delay hơn 4 giờ",
                "escalated",
                "Còn 25 phút"
            ),
            new SupportOverviewResponse.TicketCard(
                "TK-2402",
                "Cập nhật họ tên sau xuất vé",
                "open",
                "Còn 1 giờ 40 phút"
            )
        ),
        List.of(
            "Tôi có thể đổi chuyến sau khi đã thanh toán không?",
            "Nếu callback thanh toán về trễ thì sao?",
            "Chatbot có thể chuyển tôi sang CSKH không?"
        ),
        List.of("1900 6868", "support@vietnam-airlines.vn", "Chatbot widget")
    );
  }

  public CmsHomepageResponse getCmsHomepage() {
    return new CmsHomepageResponse(
        List.of(
            new CmsHomepageResponse.HeroBanner(
                "Bay sớm đến Đà Nẵng với combo ghế + hành lý",
                "Chiến dịch mùa hè cho khách nội địa",
                "Xem ưu đãi",
                "vi"
            ),
            new CmsHomepageResponse.HeroBanner(
                "Summer routes with baggage bundles",
                "Localized promo block ready for English",
                "Explore now",
                "en"
            )
        ),
        List.of(
            new CmsHomepageResponse.ContentCard(
                "Cẩm nang đi Nội Bài gọn trong 10 phút đọc",
                "Cẩm nang",
                "Mô tả luồng check-in, hành lý và lối vào nhanh cho khách công tác.",
                "vi"
            ),
            new CmsHomepageResponse.ContentCard(
                "How flexible fares work for post-booking changes",
                "Guide",
                "Support content wired to self-service and chatbot.",
                "en"
            )
        ),
        List.of(
            new CmsHomepageResponse.ContentCard(
                "Tôi có thể đổi chuyến sau khi thanh toán không?",
                "FAQ",
                "Có. Hệ thống sẽ kiểm tra gói giá và chênh lệch trước khi xác nhận.",
                "vi"
            ),
            new CmsHomepageResponse.ContentCard(
                "Can I check in online 24 hours before departure?",
                "FAQ",
                "Yes. Online check-in opens 24 hours before and closes 60 minutes before.",
                "en"
            )
        )
    );
  }

  public AdminDashboardResponse getAdminDashboard() {
    return new AdminDashboardResponse(
        List.of(
            new AdminDashboardResponse.MetricCard(
                "Doanh thu hôm nay",
                "3,48 tỷ",
                "+12% so với hôm qua"
            ),
            new AdminDashboardResponse.MetricCard(
                "Tỉ lệ chuyển đổi",
                "4,8%",
                "+0,6 điểm"
            ),
            new AdminDashboardResponse.MetricCard(
                "Booking giữ chỗ",
                "126",
                "37 mã còn dưới 5 phút"
            )
        ),
        List.of(
            new AdminDashboardResponse.ModuleCard(
                "sales",
                "Nhân viên bán vé",
                "Tạo booking hộ, giữ chỗ và xuất lại vé.",
                List.of("ticket_agent", "system_admin")
            ),
            new AdminDashboardResponse.ModuleCard(
                "operations",
                "Điều hành chuyến bay",
                "Quản lý lịch bay, tồn ghế, delay/cancel và khóa bán.",
                List.of("operations_staff", "system_admin")
            ),
            new AdminDashboardResponse.ModuleCard(
                "cms",
                "CMS nội dung",
                "Banner, blog, FAQ, trang tĩnh và song ngữ.",
                List.of("content_editor", "system_admin")
            )
        ),
        List.of(
            new AdminDashboardResponse.AuditCard(
                "admin.huyen",
                "Cập nhật rule hoàn vé",
                "FareRule: Phổ thông linh hoạt",
                "11/03 09:12"
            ),
            new AdminDashboardResponse.AuditCard(
                "ops.khoa",
                "Đổi trạng thái chuyến bay",
                "AA330 -> delayed",
                "11/03 08:41"
            )
        )
    );
  }
}
