import { describe, expect, it } from "vitest";

import {
  detectWeatherLocation,
  formatWeatherSummary,
  isWeatherQuestion
} from "@/lib/chatbot-weather";

describe("chatbot-weather", () => {
  it("nhan dien dia diem thoi tiet tu ten thanh pho", () => {
    expect(detectWeatherLocation("Thời tiết Đà Nẵng hôm nay thế nào?")?.city).toBe(
      "Đà Nẵng"
    );
  });

  it("nhan dien dia diem thoi tiet tu ten goi thong dung", () => {
    expect(detectWeatherLocation("Cuối tuần này Sài Gòn có mưa không?")?.city).toBe(
      "Thành phố Hồ Chí Minh"
    );
  });

  it("nhan dien dia diem tu do khong nam trong danh sach mac dinh", () => {
    const location = detectWeatherLocation("Thời tiết Đà Lạt hôm nay thế nào?");

    expect(location?.city).toBe("Đà Lạt");
    expect(location?.query).toBe("Da Lat");
  });

  it("nhan dien cau hoi lien quan den thoi tiet", () => {
    expect(isWeatherQuestion("Nhiệt độ Hà Nội hôm nay bao nhiêu?")).toBe(true);
  });

  it("dinh dang tom tat thoi tiet de dua vao cau tra loi", () => {
    expect(
      formatWeatherSummary({
        city: "Phú Quốc",
        description: "mưa nhẹ",
        feelsLikeC: 31,
        humidity: 78,
        observedAt: "20/03/2026 22:15",
        temperatureC: 29,
        windSpeed: 4.5
      })
    ).toContain("Thời tiết hiện tại tại Phú Quốc: mưa nhẹ, 29°C");
  });
});
