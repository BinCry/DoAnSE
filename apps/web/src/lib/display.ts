const TEN_SAN_BAY_THEO_MA: Record<string, string> = {
  SGN: "Thành phố Hồ Chí Minh",
  HAN: "Hà Nội",
  DAD: "Đà Nẵng",
  PQC: "Phú Quốc"
};

const TEN_GOI_GIA: Record<string, string> = {
  pho_thong_tiet_kiem: "Phổ thông tiết kiệm",
  pho_thong_linh_hoat: "Phổ thông linh hoạt",
  thuong_gia: "Thương gia"
};

export function hienThiTenSanBay(giaTri: string): string {
  return TEN_SAN_BAY_THEO_MA[giaTri] ?? giaTri;
}

export function hienThiHanhTrinh(diemDi: string, diemDen: string): string {
  return `${hienThiTenSanBay(diemDi)} - ${hienThiTenSanBay(diemDen)}`;
}

export function hienThiHanhTrinhTuChuoi(hanhTrinh: string): string {
  return hanhTrinh
    .split("→")
    .map((phan) => hienThiTenSanBay(phan.trim()))
    .join(" - ");
}

export function hienThiTenGoiGia(goiGia: string): string {
  return TEN_GOI_GIA[goiGia] ?? goiGia;
}
