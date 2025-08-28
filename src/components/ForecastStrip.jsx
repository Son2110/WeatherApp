import React from "react";
import { useUnits } from "../lib/units.jsx";

const ForecastStrip = ({ days = [] }) => {
  const { tempSymbol } = useUnits();
  if (!days.length) return null;

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {days.map((d, i) => (
        <div key={d?.date ?? i} className="p-3 rounded-xl border text-center">
          <div className="text-xs opacity-70">{dayLabel(d?.date)}</div>
          <img
            src={`https://openweathermap.org/img/wn/${d?.icon}.png`}
            alt={d?.description ?? ""}
            title={d?.description ?? ""}
            className="mx-auto"
          />
          <div className="text-sm capitalize">{d?.description ?? ""}</div>
          <div className="text-sm font-medium">
            {d.min}
            {tempSymbol}/{" "}
            <span className="text-lg">
              {d.max}
              {tempSymbol}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastStrip;

// YYYY-MM-DD -> "Th 5, 21"
function dayLabel(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr; // trả nguyên chuỗi nếu format lạ

  const [y, m, d] = parts.map((x) => Number(x));
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d))
    return dateStr;

  // Tạo ngày UTC để tránh lệch múi giờ
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (isNaN(dt.getTime())) return dateStr;

  const fmt = new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
  return fmt.format(dt);
}
