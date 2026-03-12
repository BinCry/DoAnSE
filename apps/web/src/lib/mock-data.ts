import type {
  AncillaryService,
  AuditEntry,
  BackofficeModule,
  BlogPost,
  DashboardMetric,
  DestinationSpotlight,
  FareComparison,
  FlightResult,
  QuickService,
  RoleRule,
  SupportItem
} from "@qlvmb/shared-types";

export interface PromotionCard {
  tag: string;
  title: string;
  summary: string;
  cta: string;
}

export interface BookingStep {
  title: string;
  description: string;
  status: "done" | "current" | "upcoming";
}

export interface ManageAction {
  title: string;
  description: string;
  rule: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface NotificationItem {
  title: string;
  time: string;
  summary: string;
}

export interface BackofficeModuleDetail {
  title: string;
  summary: string;
  panels: {
    title: string;
    items: string[];
  }[];
}

export const utilityLinks = [
  { label: "Hỗ trợ mọi thời điểm", href: "/support" },
  { label: "Quản lý đặt chỗ", href: "/manage-booking" },
  { label: "Làm thủ tục trực tuyến", href: "/check-in" },
  { label: "Tình trạng chuyến bay", href: "/flight-status" }
];

export const mainNavigation = [
  { label: "Mua vé", href: "/search" },
  { label: "Hành trình", href: "/booking" },
  { label: "Tự phục vụ", href: "/manage-booking" },
  { label: "Ưu đãi & Cẩm nang", href: "/blog" },
  { label: "Hỗ trợ", href: "/support" },
  { label: "Điều hành nội bộ", href: "/backoffice" }
];

export const heroHighlights = [
  "Giữ chỗ 15 phút và khóa chống thanh toán trùng.",
  "Bán vé nội địa song ngữ với gói giá, dịch vụ bổ trợ và làm thủ tục trực tuyến.",
  "Trung tâm điều hành dùng chung dữ liệu đặt chỗ, thanh toán và tình trạng chuyến bay."
];

export const quickServices: QuickService[] = [
  {
    title: "Hành lý trả trước",
    subtitle: "Mua thêm nhanh theo từng chặng",
    href: "/manage-booking"
  },
  {
    title: "Nâng hạng ghế",
    subtitle: "So sánh quyền lợi gói vé linh hoạt",
    href: "/search"
  },
  {
    title: "Làm thủ tục",
    subtitle: "Mở trước 24 giờ, đóng trước 60 phút",
    href: "/check-in"
  },
  {
    title: "Trợ lý hỗ trợ",
    subtitle: "Câu hỏi thường gặp, tra cứu đặt chỗ và mở yêu cầu hỗ trợ",
    href: "/support"
  }
];

export const promotions: PromotionCard[] = [
  {
    tag: "Chiến dịch mùa hè",
    title: "Bay sớm đến Đà Nẵng với gói ghế và hành lý",
    summary:
      "Tập trung đề xuất mua thêm đúng bối cảnh đặt vé, hiển thị rõ quyền lợi và hạn cắt dịch vụ.",
    cta: "Xem ưu đãi"
  },
  {
    tag: "Hội viên",
    title: "Nhân đôi điểm thưởng cho tuyến trục chính",
    summary:
      "Áp dụng cho khách đăng nhập, đồng bộ trạng thái đơn và thông báo qua email.",
    cta: "Khám phá quyền lợi"
  },
  {
    tag: "Doanh nghiệp",
    title: "Bảng giá linh hoạt cho đoàn công tác",
    summary:
      "Cho phép nhân viên bán vé tạo đặt chỗ hộ và giữ chỗ nhiều hành khách trong cùng một mã.",
    cta: "Liên hệ bán vé"
  }
];

export const destinations: DestinationSpotlight[] = [
  {
    code: "SGN",
    city: "Thành phố Hồ Chí Minh",
    airport: "Tân Sơn Nhất",
    priceFrom: 1290000,
    highlights: ["Lịch bay dày", "Ưu đãi cuối tuần", "Hỗ trợ làm thủ tục nhanh"]
  },
  {
    code: "DAD",
    city: "Đà Nẵng",
    airport: "Đà Nẵng",
    priceFrom: 1190000,
    highlights: ["Ưu đãi nghỉ hè", "Suất ăn địa phương", "Cẩm nang 48 giờ"]
  },
  {
    code: "HAN",
    city: "Hà Nội",
    airport: "Nội Bài",
    priceFrom: 1390000,
    highlights: ["Chuyến sớm mỗi ngày", "Phòng chờ thương gia", "Thông báo chuyến bay chậm chủ động"]
  },
  {
    code: "PQC",
    city: "Phú Quốc",
    airport: "Phú Quốc",
    priceFrom: 1590000,
    highlights: ["Khuyến mãi nghỉ dưỡng", "Bảo hiểm du lịch", "Gợi ý lịch trình cẩm nang"]
  }
];

export const featuredArticles: BlogPost[] = [
  {
    slug: "cam-nang-san-bay-noi-bai",
    category: "Cẩm nang",
    title: "Cẩm nang đi Nội Bài gọn trong 10 phút đọc",
    summary:
      "Mô tả luồng làm thủ tục, hành lý và lối vào nhanh cho khách đi công tác sáng sớm.",
    readTime: "10 phút"
  },
  {
    slug: "lich-trinh-da-nang-3-ngay",
    category: "Điểm đến",
    title: "Lịch trình Đà Nẵng 3 ngày cho nhóm bạn",
    summary:
      "Kết hợp nội dung cẩm nang, khuyến mãi, đề xuất mua thêm hành lý và biểu mẫu chia sẻ đặt chỗ.",
    readTime: "7 phút"
  },
  {
    slug: "doi-ve-theo-goi-gia",
    category: "Hướng dẫn",
    title: "Đổi vé theo gói giá mà không rối bước",
    summary:
      "Giải thích điều kiện đổi hoặc hoàn ngay trong khu tự phục vụ để giảm tải tổng đài.",
    readTime: "6 phút"
  }
];

export const flightResults: FlightResult[] = [
  {
    code: "AA201",
    from: "Thành phố Hồ Chí Minh",
    to: "Hà Nội",
    departureTime: "06:10",
    arrivalTime: "08:20",
    duration: "2 giờ 10 phút",
    status: "on_time",
    fareFamily: "pho_thong_tiet_kiem",
    price: 1490000,
    seatsLeft: 8
  },
  {
    code: "AA215",
    from: "Thành phố Hồ Chí Minh",
    to: "Hà Nội",
    departureTime: "09:45",
    arrivalTime: "11:55",
    duration: "2 giờ 10 phút",
    status: "boarding",
    fareFamily: "pho_thong_linh_hoat",
    price: 1890000,
    seatsLeft: 5
  },
  {
    code: "AA233",
    from: "Thành phố Hồ Chí Minh",
    to: "Hà Nội",
    departureTime: "18:20",
    arrivalTime: "20:35",
    duration: "2 giờ 15 phút",
    status: "scheduled",
    fareFamily: "thuong_gia",
    price: 3490000,
    seatsLeft: 3
  }
];

export const fareComparisons: FareComparison[] = [
  {
    fareFamily: "pho_thong_tiet_kiem",
    title: "Phổ thông tiết kiệm",
    price: 1490000,
    perks: ["7kg hành lý xách tay", "Đổi vé có thu phí", "Chọn ghế tính phí"]
  },
  {
    fareFamily: "pho_thong_linh_hoat",
    title: "Phổ thông linh hoạt",
    price: 1890000,
    perks: ["1 kiện 23kg", "Đổi vé ít phí hơn", "Ưu tiên giữ giá 24 giờ"]
  },
  {
    fareFamily: "thuong_gia",
    title: "Thương gia",
    price: 3490000,
    perks: ["2 kiện 32kg", "Phòng chờ", "Hoàn/đổi linh hoạt"]
  }
];

export const ancillaries: AncillaryService[] = [
  {
    code: "SEAT_PLUS",
    name: "Ghế hàng đầu",
    description: "Thêm chỗ duỗi chân và ưu tiên xuống tàu.",
    price: 320000
  },
  {
    code: "BAG_23",
    name: "Hành lý ký gửi 23kg",
    description: "Mua trước thanh toán hoặc bổ sung sau đặt chỗ.",
    price: 290000
  },
  {
    code: "MEAL_VN",
    name: "Suất ăn địa phương",
    description: "Tùy chọn món Việt và món chay trên tuyến trục.",
    price: 180000
  },
  {
    code: "INSURE",
    name: "Bảo hiểm du lịch",
    description: "Kích hoạt cùng lượt đặt chỗ và ghi nhận vào hóa đơn.",
    price: 95000
  }
];

export const bookingSteps: BookingStep[] = [
  {
    title: "Chọn chuyến bay",
    description: "Lọc theo giờ, hạng vé và lịch giá linh hoạt.",
    status: "done"
  },
  {
    title: "Thông tin hành khách",
    description: "Tách người liên hệ, hành khách thường dùng và yêu cầu hóa đơn.",
    status: "current"
  },
  {
    title: "Dịch vụ bổ trợ",
    description: "Chọn ghế, hành lý, suất ăn, bảo hiểm và ưu tiên làm thủ tục.",
    status: "upcoming"
  },
  {
    title: "Thanh toán & xuất vé",
    description: "Đếm ngược giữ chỗ, khóa chống lặp giao dịch và gửi email tự động.",
    status: "upcoming"
  }
];

export const manageActions: ManageAction[] = [
  {
    title: "Đổi chuyến",
    description: "Tự chọn lại chuyến trong hạn cho phép của gói giá.",
    rule: "Tính chênh lệch giá và phí đổi ngay trên cùng màn hình."
  },
  {
    title: "Hoàn/Hủy",
    description: "Tạo yêu cầu hoàn với nhật ký và thời hạn xử lý rõ ràng.",
    rule: "Nhân viên chăm sóc khách hàng chỉ duyệt theo điều kiện, kế toán chốt hoàn tiền cuối cùng."
  },
  {
    title: "Mua thêm dịch vụ",
    description: "Hành lý, ghế, ưu tiên làm thủ tục và bảo hiểm bổ sung.",
    rule: "Khóa mua khi quá hạn cắt do điều hành cấu hình."
  }
];

export const supportChannels: SupportItem[] = [
  {
    title: "Tổng đài ưu tiên",
    description: "Hỗ trợ đổi vé, chuyến bay chậm và khiếu nại sau bán.",
    channel: "1900 6868"
  },
  {
    title: "Trợ lý hỗ trợ và tiếp quản người thật",
    description: "Tra cứu câu hỏi thường gặp, kiểm tra đặt chỗ và mở yêu cầu hỗ trợ ngay trong website.",
    channel: "Khung nổi toàn trang"
  },
  {
    title: "Biểu mẫu hỗ trợ",
    description: "Gửi yêu cầu hóa đơn, hoàn vé hoặc cập nhật hành khách đặc biệt.",
    channel: "support@auroraair.vn"
  }
];

export const roleRules: RoleRule[] = [
  {
    role: "guest",
    canAccess: ["Tìm vé", "Cẩm nang", "Câu hỏi thường gặp", "Tra cứu công khai"],
    restrictedFrom: ["Xem đặt chỗ nếu không xác minh", "Điều hành nội bộ"]
  },
  {
    role: "customer",
    canAccess: ["Đặt vé", "Thanh toán", "Tự phục vụ", "Làm thủ tục trực tuyến"],
    restrictedFrom: ["Đặt chỗ của người khác", "Báo cáo nội bộ"]
  },
  {
    role: "member",
    canAccess: ["Điểm thưởng", "Voucher", "Ưu đãi theo hạng"],
    restrictedFrom: ["Tự sửa điều kiện hội viên"]
  },
  {
    role: "ticket_agent",
    canAccess: ["Tạo đặt chỗ hộ", "Giữ chỗ", "Xuất lại vé"],
    restrictedFrom: ["Duyệt hoàn tiền cuối", "Cấu hình hệ thống"]
  },
  {
    role: "customer_support",
    canAccess: ["Yêu cầu hỗ trợ", "Tiếp nhận từ trợ lý hỗ trợ", "Bù dịch vụ"],
    restrictedFrom: ["Sửa lịch bay", "Sửa giá gốc"]
  },
  {
    role: "operations_staff",
    canAccess: ["Mở/đóng bán", "Chuyến bay chậm hoặc hủy", "Tồn ghế"],
    restrictedFrom: ["Dữ liệu thanh toán nhạy cảm"]
  },
  {
    role: "finance_staff",
    canAccess: ["Đối soát", "Xác nhận hoàn tiền", "Khóa sổ ngày"],
    restrictedFrom: ["Quản trị nội dung", "Lịch bay"]
  },
  {
    role: "content_editor",
    canAccess: ["Banner", "Cẩm nang", "Câu hỏi thường gặp", "Lịch đăng song ngữ"],
    restrictedFrom: ["Đặt chỗ", "Thanh toán"]
  },
  {
    role: "system_admin",
    canAccess: ["Phân quyền", "Nhật ký kiểm soát", "Báo cáo tổng"],
    restrictedFrom: ["Xem dữ liệu thẻ đầy đủ"]
  }
];

export const backofficeMetrics: DashboardMetric[] = [
  { label: "Doanh thu hôm nay", value: "3,48 tỷ", trend: "+12% so với hôm qua" },
  { label: "Tỉ lệ chuyển đổi", value: "4,8%", trend: "+0,6 điểm" },
  { label: "Lượt giữ chỗ", value: "126", trend: "37 mã còn dưới 5 phút" },
  { label: "Chuyến bay trễ/hủy", value: "04", trend: "2 chuyến cần gửi thông báo" }
];

export const backofficeModules: BackofficeModule[] = [
  {
    key: "sales",
    title: "Nhân viên bán vé",
    summary: "Tạo đặt chỗ hộ, giữ chỗ, thu hộ và xuất lại vé.",
    href: "/backoffice/sales",
    highlights: ["Giữ chỗ 15 phút", "Đơn doanh nghiệp", "Thu hộ có đối soát"],
    roles: ["ticket_agent", "system_admin"]
  },
  {
    key: "support",
    title: "Chăm sóc khách hàng",
    summary: "Yêu cầu hỗ trợ theo thời hạn xử lý, tiếp nhận từ trợ lý hỗ trợ và hoàn hoặc đổi theo điều kiện.",
    href: "/backoffice/support",
    highlights: ["Hàng chờ trợ lý hỗ trợ", "Bù dịch vụ", "Lịch sử liên hệ"],
    roles: ["customer_support", "system_admin"]
  },
  {
    key: "operations",
    title: "Điều hành chuyến bay",
    summary: "Lịch bay, tồn ghế, chuyến bay chậm hoặc hủy và khóa bán chặng.",
    href: "/backoffice/operations",
    highlights: ["Tỷ lệ lấp đầy", "Khóa bán", "Thông báo chuyến bay chậm"],
    roles: ["operations_staff", "system_admin"]
  },
  {
    key: "finance",
    title: "Kế toán/đối soát",
    summary: "Đối soát giao dịch, hóa đơn, hoàn tiền và sai lệch.",
    href: "/backoffice/finance",
    highlights: ["Khóa chống lặp giao dịch", "Hàng chờ hoàn tiền", "Khóa sổ ngày"],
    roles: ["finance_staff", "system_admin"]
  },
  {
    key: "cms",
    title: "Quản trị nội dung",
    summary: "Banner, cẩm nang, câu hỏi thường gặp, trang tĩnh và song ngữ.",
    href: "/backoffice/cms",
    highlights: ["Nháp/Duyệt/Đăng", "Lịch đăng", "Tối ưu công cụ tìm kiếm theo ngôn ngữ"],
    roles: ["content_editor", "system_admin"]
  },
  {
    key: "admin",
    title: "Quản trị hệ thống",
    summary: "Phân quyền, nhật ký kiểm soát, cấu hình điều kiện và mẫu thông báo.",
    href: "/backoffice/admin",
    highlights: ["Phân quyền theo vai trò", "Nhật ký kiểm soát", "Mẫu email"],
    roles: ["system_admin"]
  }
];

export const backofficeModuleDetails: Record<string, BackofficeModuleDetail> = {
  sales: {
    title: "Bàn điều phối bán vé",
    summary:
      "Tập trung luồng tạo đặt chỗ hộ khách, giữ chỗ, chốt thanh toán thủ công và xử lý đoàn.",
    panels: [
      {
        title: "Hàng chờ đặt chỗ",
        items: [
          "Mã A6C2P1 đang chờ thanh toán bằng mã ngân hàng trong 04:31.",
          "Đơn doanh nghiệp 8 khách cần tách hóa đơn theo phòng ban.",
          "1 lượt đặt chỗ đổi chặng cần xin chênh lệch giá trước khi xuất vé."
        ]
      },
      {
        title: "Tự động hóa chính",
        items: [
          "Khóa giá 15 phút cho từng mã giữ chỗ.",
          "Gửi lại email vé điện tử chỉ bằng một thao tác.",
          "Hiển thị cảnh báo khi khách đã có yêu cầu hỗ trợ đang mở."
        ]
      }
    ]
  },
  support: {
    title: "Trung tâm hỗ trợ khách hàng",
    summary:
      "Nhìn toàn bộ lịch sử yêu cầu hỗ trợ, phần tiếp nhận từ trợ lý hỗ trợ, khiếu nại và hoàn hoặc đổi theo thời hạn xử lý.",
    panels: [
      {
        title: "Yêu cầu ưu tiên",
        items: [
          "Yêu cầu hoàn vé do chuyến bay chậm hơn 4 giờ.",
          "Khách cần cập nhật họ tên sai sau khi xuất vé.",
          "Trợ lý hỗ trợ đã gắn nhãn rủi ro với từ khóa 'khẩn cấp'."
        ]
      },
      {
        title: "Điều kiện cần khóa",
        items: [
          "Nhân viên chăm sóc khách hàng không xác nhận hoàn tiền cuối cùng.",
          "Chỉ được bù dịch vụ trong ngân sách do quản trị viên hệ thống cấu hình.",
          "Mọi tương tác phải gắn với mã đặt chỗ hoặc mã yêu cầu hỗ trợ."
        ]
      }
    ]
  },
  operations: {
    title: "Bảng điều hành chuyến bay",
    summary:
      "Theo dõi trạng thái chuyến bay, tồn ghế, tải bán và quyết định khóa/mở bán từng chặng.",
    panels: [
      {
        title: "Tín hiệu vận hành",
        items: [
          "AA215 cần chuyển trạng thái đang lên máy bay sang chậm nếu muộn hơn 20 phút.",
          "AA233 chỉ còn 3 ghế thương gia, gợi ý khóa ưu đãi trên khu quản trị nội dung.",
          "Tuyến Thành phố Hồ Chí Minh - Hà Nội đạt tỷ lệ lấp đầy 92% trong ba ngày liên tiếp."
        ]
      },
      {
        title: "Tác động liên thông",
        items: [
          "Chuyến bay chậm phải cập nhật đồng thời website công khai, khu quản lý đặt chỗ và email.",
          "Khóa bán chặng sẽ đẩy lại tồn ghế cho màn hình tìm chuyến bay.",
          "Mọi thay đổi lịch bay phải ghi vào nhật ký kiểm soát."
        ]
      }
    ]
  },
  finance: {
    title: "Bảng đối soát tài chính",
    summary:
      "Đối chiếu phản hồi thanh toán, giao dịch chậm, hoàn tiền và hóa đơn điện tử từ một nguồn dữ liệu chung.",
    panels: [
      {
        title: "Sai lệch cần xử lý",
        items: [
          "2 giao dịch phản hồi thanh toán về trễ sau khi khách đã làm mới trang.",
          "1 yêu cầu hoàn tiền đang chờ xác nhận đối tác ví điện tử.",
          "5 hóa đơn cần bổ sung mã số thuế trước 17:00."
        ]
      },
      {
        title: "Chốt ngày",
        items: [
          "Khóa sổ sau khi đối soát đủ paid/refunded.",
          "Tách rõ giao dịch thành công, thất bại và hết hạn giữ chỗ.",
          "Không cho nhân viên kế toán sửa nội dung chuyến bay."
        ]
      }
    ]
  },
  cms: {
    title: "Trung tâm nội dung và chiến dịch",
    summary:
      "Quản lý banner, bài cẩm nang, câu hỏi thường gặp, điều khoản và nội dung song ngữ có lịch duyệt hoặc đăng rõ ràng.",
    panels: [
      {
        title: "Lịch nội dung",
        items: [
          "Banner hè Đà Nẵng lên lịch 06:00 sáng thứ Sáu.",
          "Câu hỏi thường gặp về hoàn hoặc hủy có bản Việt và Anh cùng trạng thái duyệt.",
          "Bài cẩm nang điểm đến gắn kêu gọi hành động sang trang tìm vé theo tuyến."
        ]
      },
      {
        title: "Luồng duyệt",
        items: [
          "Biên tập tạo nháp, trưởng nhóm duyệt, hệ thống tự đăng.",
          "Trang pháp lý bắt buộc lưu lịch sử phiên bản.",
          "Trợ lý hỗ trợ lấy tri thức từ mục câu hỏi thường gặp đã phát hành."
        ]
      }
    ]
  },
  admin: {
    title: "Quản trị hệ thống và kiểm soát",
    summary:
      "Quản lý phân quyền theo vai trò, điều kiện đổi hoặc hoàn, mẫu thông báo và nhật ký tác động của mọi vai trò nhạy cảm.",
    panels: [
      {
        title: "Cấu hình nhạy cảm",
        items: [
          "Điều kiện làm thủ tục mở trước 24 giờ và đóng trước 60 phút.",
          "Bảng phí đổi/hoàn theo gói vé và tuyến bay.",
          "Mẫu email chuyến bay chậm, hoàn tiền, thẻ lên máy bay và yêu cầu hỗ trợ."
        ]
      },
      {
        title: "Bảo mật và kiểm soát",
        items: [
          "Ẩn dữ liệu thẻ, chỉ lưu token/trạng thái giao dịch.",
          "Ghi log mọi thay đổi lịch bay, phân quyền, hoàn tiền.",
          "Báo cáo truy cập bất thường theo vai trò."
        ]
      }
    ]
  }
};

export const flightStatusBoard = [
  { code: "AA201", route: "Thành phố Hồ Chí Minh → Hà Nội", time: "06:10", gate: "D2", status: "Đúng giờ" },
  { code: "AA215", route: "Thành phố Hồ Chí Minh → Hà Nội", time: "09:45", gate: "D5", status: "Đang lên máy bay" },
  { code: "AA330", route: "Hà Nội → Đà Nẵng", time: "11:15", gate: "A3", status: "Trễ 25 phút" },
  { code: "AA412", route: "Đà Nẵng → Phú Quốc", time: "14:05", gate: "B1", status: "Mở làm thủ tục" }
];

export const accountHighlights = [
  { label: "Điểm hội viên", value: "12.480 điểm" },
  { label: "Voucher khả dụng", value: "03 mã" },
  { label: "Chuyến sắp bay", value: "02 hành trình" }
];

export const notifications: NotificationItem[] = [
  {
    title: "AA215 mở làm thủ tục trực tuyến",
    time: "Hôm nay, 09:00",
    summary: "Khách có thể chọn lại ghế và tải thẻ lên máy bay ngay."
  },
  {
    title: "Mã đặt chỗ A6C2P1 đã thanh toán",
    time: "Hôm qua, 18:24",
    summary: "Vé điện tử và hóa đơn đã gửi tới email đăng ký."
  },
  {
    title: "Chiến dịch hè Đà Nẵng bắt đầu",
    time: "02 ngày trước",
    summary: "Khách hội viên được nhân đôi điểm thưởng trên tuyến trục."
  }
];

export const supportFaqs: FaqEntry[] = [
  {
    question: "Tôi có thể đổi chuyến sau khi đã thanh toán không?",
    answer:
      "Có. Hệ thống sẽ kiểm tra gói giá, chênh lệch giá vé và hạn cắt đổi chuyến trước khi cho xác nhận."
  },
  {
    question: "Nếu thanh toán bị treo và tôi tải lại trang thì sao?",
    answer:
      "Luồng thanh toán có khóa chống lặp giao dịch và đối soát phản hồi thanh toán, nên lượt đặt chỗ sẽ không bị nhân đôi giao dịch."
  },
  {
    question: "Trợ lý hỗ trợ có xử lý hoàn vé luôn không?",
    answer:
      "Trợ lý hỗ trợ thu thập thông tin, kiểm tra điều kiện cơ bản và chuyển ngay cho bộ phận chăm sóc khách hàng khi cần người thật xác nhận."
  }
];

export const auditEntries: AuditEntry[] = [
  {
    actor: "admin.huyen",
    action: "Cập nhật điều kiện hoàn vé",
    target: "Gói vé: Phổ thông linh hoạt",
    time: "11/03 09:12"
  },
  {
    actor: "ops.khoa",
    action: "Đổi trạng thái chuyến bay",
    target: "AA330 chuyển sang trạng thái chậm",
    time: "11/03 08:41"
  },
  {
    actor: "finance.lan",
    action: "Xác nhận hoàn tiền",
    target: "Mã đặt chỗ B9K2M8",
    time: "11/03 08:08"
  }
];

export const footerColumns = [
  {
    title: "Dành cho khách hàng",
    links: ["Tìm chuyến bay", "Quản lý đặt chỗ", "Làm thủ tục trực tuyến", "Tình trạng chuyến bay"]
  },
  {
    title: "Hỗ trợ & chính sách",
    links: ["Câu hỏi thường gặp", "Hành lý", "Điều khoản vận chuyển", "Chính sách quyền riêng tư"]
  },
  {
    title: "Nội dung & cộng đồng",
    links: ["Cẩm nang điểm đến", "Ưu đãi theo mùa", "Thông tin sân bay", "Bản tin email"]
  },
  {
    title: "Nội bộ",
    links: ["Bảng điều hành", "Điều hành chuyến bay", "Quản trị nội dung", "Nhật ký kiểm soát"]
  }
];
