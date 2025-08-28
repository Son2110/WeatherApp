import React from "react";
import { useUnits } from "../lib/units.jsx";

const WeatherCard = ({ cityLabel, weather }) => {
  const { isMetric, tempSymbol, windLabel } = useUnits();

  const windDisplay = isMetric
    ? Math.round(weather.wind_speed * 3.6) // m/s -> km/h
    : Math.round(weather.wind_speed); // mph
  return (
    <div className="rounded-2xl border p-4 shadow-sm max-w-md w-full bg-white/70 dark:bg-zinc-900/60">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">{cityLabel}</h2>
        <span className="text-sm opacity-7- capitalize">
          {weather.description}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
        <div className="text-6xl font-bold">
          {Math.round(weather.temp)}
          {tempSymbol}
        </div>
        <ul className="text-sm space-y-1 opacity-80">
          <li>Humidity: {weather.humidity}%</li>
          <li>
            Wind speed: {windDisplay} {windLabel}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;
