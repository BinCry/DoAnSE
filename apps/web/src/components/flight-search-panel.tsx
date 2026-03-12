"use client";

import { useMemo, useState } from "react";

import { TRIP_TYPES, type TripType } from "@qlvmb/shared-types";

const tripLabels: Record<TripType, string> = {
  one_way: "Một chiều",
  round_trip: "Khứ hồi",
  multi_city: "Nhiều chặng"
};

export function FlightSearchPanel() {
  const [tripType, setTripType] = useState<TripType>("round_trip");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const passengerSummary = useMemo(() => {
    return `${adultCount} người lớn, ${childCount} trẻ em, ${infantCount} em bé`;
  }, [adultCount, childCount, infantCount]);

  return (
    <section className="search-panel">
      <div className="search-panel-head">
        <div>
          <span className="panel-kicker">Đặt vé thông minh</span>
          <h2>Khóa giá nhanh cho hành trình nội địa</h2>
        </div>
        <div className="search-mini-metrics">
          <div>
            <strong>15'</strong>
            <span>Giữ chỗ</span>
          </div>
          <div>
            <strong>24h</strong>
            <span>Mở làm thủ tục</span>
          </div>
        </div>
      </div>
      <div className="toggle-group">
        {TRIP_TYPES.map((item) => (
          <button
            key={item}
            type="button"
            className={tripType === item ? "toggle active" : "toggle"}
            onClick={() => setTripType(item)}
          >
            {tripLabels[item]}
          </button>
        ))}
      </div>
      <div className="search-note">
        Đang chọn <strong>{tripLabels[tripType]}</strong>. Hệ thống hỗ trợ tối
        đa 3 chặng và 9 hành khách trong cùng một lượt đặt chỗ.
      </div>
      <div className="route-pair">
        <label className="field route-field">
          <span>Điểm đi</span>
          <input defaultValue="Thành phố Hồ Chí Minh" />
          <small>Nhà ga số 1 · Tân Sơn Nhất</small>
        </label>
        <button type="button" className="swap-button" aria-label="Đảo chiều">
          ⇄
        </button>
        <label className="field route-field">
          <span>Điểm đến</span>
          <input defaultValue="Hà Nội" />
          <small>Nhà ga số 1 · Nội Bài</small>
        </label>
      </div>
      <div className="field-grid">
        <label className="field">
          <span>Ngày đi</span>
          <input type="date" defaultValue="2026-03-20" />
        </label>
        <label className="field">
          <span>Ngày về</span>
          <input
            type="date"
            defaultValue={tripType === "one_way" ? "" : "2026-03-23"}
            disabled={tripType === "one_way"}
          />
        </label>
        <label className="field">
          <span>Hạng vé</span>
          <select defaultValue="pho_thong_linh_hoat">
            <option value="pho_thong_tiet_kiem">Phổ thông tiết kiệm</option>
            <option value="pho_thong_linh_hoat">Phổ thông linh hoạt</option>
            <option value="thuong_gia">Thương gia</option>
          </select>
        </label>
        <div className="field field-inline">
          <span>Hành khách</span>
          <div className="counter-grid">
            <label>
              Người lớn
              <input
                type="number"
                min={1}
                max={9}
                value={adultCount}
                onChange={(event) => setAdultCount(Number(event.target.value))}
              />
            </label>
            <label>
              Trẻ em
              <input
                type="number"
                min={0}
                max={8}
                value={childCount}
                onChange={(event) => setChildCount(Number(event.target.value))}
              />
            </label>
            <label>
              Em bé
              <input
                type="number"
                min={0}
                max={8}
                value={infantCount}
                onChange={(event) => setInfantCount(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </div>
      {tripType === "multi_city" ? (
        <div className="multi-city-card">
          <strong>Chặng bổ sung</strong>
          <p>
            Chặng 2: Hà Nội đến Đà Nẵng | Chặng 3: Đà Nẵng đến Thành phố Hồ Chí Minh
          </p>
        </div>
      ) : null}
      <div className="search-assurance">
        <span className="assurance-chip">Hoàn/đổi theo gói giá</span>
        <span className="assurance-chip">Mã thanh toán ngân hàng, thẻ, ví điện tử</span>
        <span className="assurance-chip">Email vé và hóa đơn tự động</span>
      </div>
      <div className="search-footer">
        <div>
          <strong>{passengerSummary}</strong>
          <p>Giữ chỗ 15 phút sau khi chọn chuyến phù hợp.</p>
        </div>
        <button type="button" className="button button-primary">
          Tìm chuyến bay
        </button>
      </div>
    </section>
  );
}
