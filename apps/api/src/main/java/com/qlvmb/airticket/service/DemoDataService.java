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
                "NhÃ¢n viÃªn bÃ¡n vÃ©",
                List.of("Táº¡o booking há»™", "Giá»¯ chá»—", "Xuáº¥t láº¡i vÃ©")
            ),
            new AuthSummaryResponse.RoleItem(
                "customer_support",
                "NhÃ¢n viÃªn CSKH",
                List.of("Xá»­ lÃ½ ticket", "Takeover chatbot", "Äá»•i/hoÃ n theo rule")
            ),
            new AuthSummaryResponse.RoleItem(
                "system_admin",
                "Admin há»‡ thá»‘ng",
                List.of("PhÃ¢n quyá»n", "Audit log", "Cáº¥u hÃ¬nh rule")
            )
        ),
        List.of(
            "KhÃ¡ch vÃ£ng lai khÃ´ng Ä‘Æ°á»£c vÃ o backoffice.",
            "Káº¿ toÃ¡n khÃ´ng Ä‘Æ°á»£c sá»­a ná»™i dung chuyáº¿n bay.",
            "Admin khÃ´ng xem dá»¯ liá»‡u tháº» Ä‘áº§y Ä‘á»§."
        )
    );
  }

  public CustomerOverviewResponse getCustomerOverview() {
    return new CustomerOverviewResponse(
        "Nguyá»…n Minh Anh",
        "Háº¡ng VÃ ng",
        12480,
        List.of(
            "AA215 â€¢ SGN â†’ HAN â€¢ 20/03/2026",
            "AA330 â€¢ HAN â†’ DAD â€¢ 23/03/2026"
        ),
        List.of(
            "Booking A6C2P1 Ä‘Ã£ thanh toÃ¡n vÃ  gá»­i email.",
            "Check-in cho AA215 sáº½ má»Ÿ sau 12 giá» ná»¯a."
        )
    );
  }

  public FlightSearchResponse searchFlights(String from, String to, String tripType) {
    List<FlightSearchResponse.FlightCard> outboundFlights = List.of(
        new FlightSearchResponse.FlightCard(
            20101L,
            201L,
            "AA201",
            "Thanh pho Ho Chi Minh",
            "Ha Noi",
            from,
            to,
            "2026-03-20T06:10:00+07:00",
            "2026-03-20T08:20:00+07:00",
            "06:10",
            "08:20",
            "2 gio 10 phut",
            "on_time",
            "pho_thong_tiet_kiem",
            1490000L,
            8L
        ),
        new FlightSearchResponse.FlightCard(
            20102L,
            215L,
            "AA215",
            "Thanh pho Ho Chi Minh",
            "Ha Noi",
            from,
            to,
            "2026-03-20T09:45:00+07:00",
            "2026-03-20T11:55:00+07:00",
            "09:45",
            "11:55",
            "2 gio 10 phut",
            "boarding",
            "pho_thong_linh_hoat",
            1890000L,
            5L
        ),
        new FlightSearchResponse.FlightCard(
            20103L,
            233L,
            "AA233",
            "Thanh pho Ho Chi Minh",
            "Ha Noi",
            from,
            to,
            "2026-03-20T18:20:00+07:00",
            "2026-03-20T20:35:00+07:00",
            "18:20",
            "20:35",
            "2 gio 15 phut",
            "scheduled",
            "thuong_gia",
            3490000L,
            3L
        )
    );

    List<FlightSearchResponse.FareCard> fares = List.of(
        new FlightSearchResponse.FareCard(
            "pho_thong_tiet_kiem",
            "Pho thong tiet kiem",
            1490000L,
            List.of("7kg hanh ly xach tay", "Doi ve co phi", "Ghe tinh phi")
        ),
        new FlightSearchResponse.FareCard(
            "pho_thong_linh_hoat",
            "Pho thong linh hoat",
            1890000L,
            List.of("1 kien 23kg", "Doi ve it phi hon", "Giu gia 24 gio")
        ),
        new FlightSearchResponse.FareCard(
            "thuong_gia",
            "Thuong gia",
            3490000L,
            List.of("2 kien 32kg", "Phong cho", "Hoan doi linh hoat")
        )
    );

    FlightSearchResponse.SearchCriteria criteria = new FlightSearchResponse.SearchCriteria(
        from,
        to,
        "2026-03-20",
        "round_trip".equals(tripType) ? "2026-03-23" : null,
        tripType,
        null,
        1,
        0,
        0
    );

    return new FlightSearchResponse(
        tripType,
        from,
        to,
        List.of("Gio bay", "Goi gia", "Ngan sach", "Con ghe"),
        outboundFlights,
        fares,
        criteria,
        outboundFlights,
        List.of()
    );
  }

  public BookingOverviewResponse getBookingOverview(String bookingCode) {
    return new BookingOverviewResponse(
        bookingCode,
        "held",
        "2026-03-11T14:15:00+07:00",
        List.of(
            "Chá»n chuyáº¿n bay",
            "ThÃ´ng tin hÃ nh khÃ¡ch",
            "Dá»‹ch vá»¥ bá»• trá»£",
            "Thanh toÃ¡n & xuáº¥t vÃ©"
        ),
        List.of(
            new BookingOverviewResponse.AncillaryItem(
                "SEAT_PLUS",
                "Gháº¿ hÃ ng Ä‘áº§u",
                "ThÃªm chá»— duá»—i chÃ¢n vÃ  Æ°u tiÃªn xuá»‘ng tÃ u.",
                320000
            ),
            new BookingOverviewResponse.AncillaryItem(
                "BAG_23",
                "HÃ nh lÃ½ 23kg",
                "Cho phÃ©p mua trÆ°á»›c thanh toÃ¡n hoáº·c sau Ä‘áº·t chá»—.",
                290000
            )
        ),
        List.of("QR ngÃ¢n hÃ ng", "Tháº»", "VÃ­ Ä‘iá»‡n tá»­")
    );
  }

  public SupportOverviewResponse getSupportOverview() {
    return new SupportOverviewResponse(
        List.of(
            new SupportOverviewResponse.TicketCard(
                "TK-2401",
                "YÃªu cáº§u hoÃ n vÃ© do delay hÆ¡n 4 giá»",
                "escalated",
                "CÃ²n 25 phÃºt"
            ),
            new SupportOverviewResponse.TicketCard(
                "TK-2402",
                "Cáº­p nháº­t há» tÃªn sau xuáº¥t vÃ©",
                "open",
                "CÃ²n 1 giá» 40 phÃºt"
            )
        ),
        List.of(
            "TÃ´i cÃ³ thá»ƒ Ä‘á»•i chuyáº¿n sau khi Ä‘Ã£ thanh toÃ¡n khÃ´ng?",
            "Náº¿u callback thanh toÃ¡n vá» trá»… thÃ¬ sao?",
            "Chatbot cÃ³ thá»ƒ chuyá»ƒn tÃ´i sang CSKH khÃ´ng?"
        ),
        List.of("1900 6868", "support@vietnam-airlines.vn", "Chatbot widget")
    );
  }

  public CmsHomepageResponse getCmsHomepage() {
    return new CmsHomepageResponse(
        List.of(
            new CmsHomepageResponse.HeroBanner(
                "Bay sá»›m Ä‘áº¿n ÄÃ  Náºµng vá»›i combo gháº¿ + hÃ nh lÃ½",
                "Chiáº¿n dá»‹ch mÃ¹a hÃ¨ cho khÃ¡ch ná»™i Ä‘á»‹a",
                "Xem Æ°u Ä‘Ã£i",
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
                "Cáº©m nang Ä‘i Ná»™i BÃ i gá»n trong 10 phÃºt Ä‘á»c",
                "Cáº©m nang",
                "MÃ´ táº£ luá»“ng check-in, hÃ nh lÃ½ vÃ  lá»‘i vÃ o nhanh cho khÃ¡ch cÃ´ng tÃ¡c.",
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
                "TÃ´i cÃ³ thá»ƒ Ä‘á»•i chuyáº¿n sau khi thanh toÃ¡n khÃ´ng?",
                "FAQ",
                "CÃ³. Há»‡ thá»‘ng sáº½ kiá»ƒm tra gÃ³i giÃ¡ vÃ  chÃªnh lá»‡ch trÆ°á»›c khi xÃ¡c nháº­n.",
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
                "Doanh thu hÃ´m nay",
                "3,48 tá»·",
                "+12% so vá»›i hÃ´m qua"
            ),
            new AdminDashboardResponse.MetricCard(
                "Tá»‰ lá»‡ chuyá»ƒn Ä‘á»•i",
                "4,8%",
                "+0,6 Ä‘iá»ƒm"
            ),
            new AdminDashboardResponse.MetricCard(
                "Booking giá»¯ chá»—",
                "126",
                "37 mÃ£ cÃ²n dÆ°á»›i 5 phÃºt"
            )
        ),
        List.of(
            new AdminDashboardResponse.ModuleCard(
                "sales",
                "NhÃ¢n viÃªn bÃ¡n vÃ©",
                "Táº¡o booking há»™, giá»¯ chá»— vÃ  xuáº¥t láº¡i vÃ©.",
                List.of("ticket_agent", "system_admin")
            ),
            new AdminDashboardResponse.ModuleCard(
                "operations",
                "Äiá»u hÃ nh chuyáº¿n bay",
                "Quáº£n lÃ½ lá»‹ch bay, tá»“n gháº¿, delay/cancel vÃ  khÃ³a bÃ¡n.",
                List.of("operations_staff", "system_admin")
            ),
            new AdminDashboardResponse.ModuleCard(
                "cms",
                "CMS ná»™i dung",
                "Banner, blog, FAQ, trang tÄ©nh vÃ  song ngá»¯.",
                List.of("content_editor", "system_admin")
            )
        ),
        List.of(
            new AdminDashboardResponse.AuditCard(
                "admin.huyen",
                "Cáº­p nháº­t rule hoÃ n vÃ©",
                "FareRule: Phá»• thÃ´ng linh hoáº¡t",
                "11/03 09:12"
            ),
            new AdminDashboardResponse.AuditCard(
                "ops.khoa",
                "Äá»•i tráº¡ng thÃ¡i chuyáº¿n bay",
                "AA330 -> delayed",
                "11/03 08:41"
            )
        )
    );
  }
}
