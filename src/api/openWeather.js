//chia 2 buoc lay lat,lng sau do lay thoi tiet theo position
const API = {
  geo: "https://api.openweathermap.org/geo/1.0/direct",
  weather: "https://api.openweathermap.org/data/2.5/weather",
};

const APPID = () => import.meta.env.VITE_OPENWEATHER_KEY;

export async function searchCity(name) {
  const url = new URL(API.geo);
  url.searchParams.set("q", name);
  url.searchParams.set("limit", "1");
  url.searchParams.set("appid", APPID());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Not found position!");

  const data = await res.json();
  const r = data?.[0];
  if (!r) return null;

  return {
    name: r.name,
    country: r.country,
    lat: r.lat,
    lon: r.lon,
  };
}

export async function getCurrentWeather(lat, lon, units = "metrics") {
  const url = new URL(API.weather);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("units", units); //metric | imperial
  url.searchParams.set("lang", "vi");
  url.searchParams.set("appid", APPID());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Not found weather data");

  const data = await res.json();

  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed, //m/s
    description: data.weather?.[0]?.description ?? "",
    icon: data.weather?.[0]?.icon ?? "01d", // "10d"
  };
}

export async function getForecast5d(lat, lon, units = "metrics") {
  const url = new URL("https://api.openweathermap.org/data/2.5/forecast");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("units", units);
  url.searchParams.set("lang", "vi");
  url.searchParams.set("appid", import.meta.env.VITE_OPENWEATHER_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Không thể lấy dự báo 5 ngày");
  const data = await res.json();

  if (!Array.isArray(data.list)) return [];
  // Gom theo YYYY-MM-DD
  const byDay = new Map();

  for (const item of data.list || []) {
    const dtTxt = item.dt_txt || ""; // "2025-08-21 12:00:00"
    const day = dtTxt.slice(0, 10); // "2025-08-21"
    if (!day) continue;

    const tempMin = item.main?.temp_min;
    const tempMax = item.main?.temp_max;
    const icon = item.weather?.[0]?.icon;
    const desc = item.weather?.[0]?.description; // <-- đúng key

    if (!byDay.has(day)) {
      byDay.set(day, {
        day,
        min: tempMin,
        max: tempMax,
        icons: {},
        descs: {}, // <-- dùng 'descs' nhất quán
        noon: null, // giữ entry 12:00 nếu có
      });
    }

    const d = byDay.get(day);

    // cập nhật min/max an toàn
    if (Number.isFinite(tempMin)) {
      d.min = Number.isFinite(d.min) ? Math.min(d.min, tempMin) : tempMin;
    }
    if (Number.isFinite(tempMax)) {
      d.max = Number.isFinite(d.max) ? Math.max(d.max, tempMax) : tempMax;
    }

    // đếm tần suất để chọn icon/description phổ biến
    if (icon) d.icons[icon] = (d.icons[icon] || 0) + 1;
    if (desc) d.descs[desc] = (d.descs[desc] || 0) + 1;

    // ưu tiên mốc 12:00 làm đại diện ngày
    if (dtTxt.includes("12:00:00")) d.noon = item;
  }

  // Ra mảng, sắp xếp, lấy 5 ngày
  const days = Array.from(byDay.values())
    .sort((a, b) => (a.day < b.day ? -1 : 1))
    .slice(0, 5)
    .map((d) => {
      // chọn icon/desc: ưu tiên entry 12:00, nếu không có thì lấy phổ biến nhất
      let icon = d.noon?.weather?.[0]?.icon;
      let description = d.noon?.weather?.[0]?.description;

      if (!icon) {
        icon =
          Object.entries(d.icons).sort((a, b) => b[1] - a[1])?.[0]?.[0] ||
          "01d";
      }
      if (!description) {
        description =
          Object.entries(d.descs).sort((a, b) => b[1] - a[1])?.[0]?.[0] || "";
      }

      return {
        date: d.day, // <-- 'date' đúng như component dùng
        min: Math.round(d.min),
        max: Math.round(d.max),
        icon,
        description, // <-- key chuẩn
      };
    });

  return days;
}

export async function suggestCities(name, limit = 5) {
  const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
  url.searchParams.set("q", name);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("appid", import.meta.env.VITE_OPENWEATHER_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Not found");
  const data = await res.json();
  return (data || []).map((r) => ({
    name: r.name,
    country: r.country,
    lat: r.lat,
    lon: r.lon,
  }));
}

export async function searchCityByCoords(lat, lon) {
  const url = new URL("https:/api.openweathermap.org/geo/1.0/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("limit", "1");
  url.searchParams.set("appid", APPID());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Not found position");

  const data = await res.json();
  const r = data?.[0];
  if (!r) return null;

  return {
    name: r.name,
    country: r.country,
    lat: r.lat,
    lon: r.lon,
  };
}
