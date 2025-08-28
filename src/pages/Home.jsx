import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import WeatherCard from "../components/WeatherCard";
import { useCitySearch } from "../hooks/useCitySearch";
import { useCurrentWeather } from "../hooks/useCurrentWeather";
import { useForecast } from "../hooks/useForecast";
import ForecastStrip from "../components/ForecastStrip";
import RecentCities from "../components/RecentCities";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUnits } from "../lib/units.jsx";
import UnitsToggle from "../components/UnitsToggle";
import ErrorBox from "../components/ErrorBox.jsx";
import { queryClient } from "../lib/queryClient.js";
import MyLocationButton from "../components/MyLocationButton.jsx";
import { useTheme } from "../hooks/useTheme.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

const Home = () => {
  const [submitted, setSubmitted] = useState("");

  const [recent, setRecent] = useLocalStorage("wx_recent", []);
  const [coords, setCoords] = useState(null);
  const { darkMode } = useTheme();

  const { units } = useUnits();
  //1. tim geo theo city
  const {
    data: geo,
    isFetching: geoLoading,
    error: geoErr,
  } = useCitySearch(submitted, coords?.lat, coords?.lon);

  //2. neu co geo -> lay weather
  const {
    data: weather,
    isFetching: wxLoading,
    error: wxErr,
  } = useCurrentWeather(geo?.lat, geo?.lon, units);

  const {
    data: forecast,
    isFetching: fcLoading,
    error: fcErr,
  } = useForecast(geo?.lat, geo?.lon, units);

  useEffect(() => {
    if (!geo?.name) return;
    const label = `${geo.name}${geo.country ? ", " + geo.country : ""}`;
    const key = label.toLowerCase();
    setRecent((prev) => {
      const existed = prev.find((x) => x.key === key);
      const pinned = existed?.pinned ?? false;
      const next = [
        { key, label, pinned },
        ...prev.filter((x) => x.key !== key),
      ];
      //8 item
      const pinnedList = next.filter((x) => x.pinned);
      const others = next
        .filter((x) => !x.pinned)
        .slice(0, Math.max(0, 8 - pinnedList.length));
      return [...pinnedList, ...others];
    });
  }, [geo?.name, geo?.country, setRecent]);

  const onPickRecent = (label) => setSubmitted(label);
  const onPin = (key) =>
    setRecent((list) =>
      list.map((x) => (x.key === key ? { ...x, pinned: true } : x))
    );
  const onUnpin = (key) =>
    setRecent((list) =>
      list.map((x) => (x.key === key ? { ...x, pinned: false } : x))
    );

  const onClearNonPinned = () => {
    if (!window.confirm("Delete all recents (excepts favorites)?")) return;
    setRecent((list) => list.filter((x) => x.pinned));
  };

  const onClearAll = () => {
    if (!window.confirm("Delete all?")) return;
    setRecent([]);
  };

  const handleLocationPick = (lat, lon) => {
    setCoords({ lat, lon });
    setSubmitted("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-indigo-200 dark:from-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Weather</h1>

      <UnitsToggle />
      <ThemeToggle />
      <div className="flex gap-2 items-center">
        <SearchBox onSubmit={setSubmitted} initial={submitted} />
        <MyLocationButton onPickCoords={handleLocationPick} />
      </div>

      <RecentCities
        items={recent}
        onPick={onPickRecent}
        onPin={onPin}
        onUnpin={onUnpin}
        onClearAll={onClearAll}
        onClearNonPinned={onClearNonPinned}
      />
      <div className="mt-6 w-full max-w-md">
        {geoLoading && <p>Find position...</p>}
        {geoErr && <p className="text-red-600">Not found position</p>}

        {wxLoading && <p>Loading weather...</p>}
        {wxErr && (
          <ErrorBox
            message="Fail to load weather"
            OnRetry={() =>
              queryClient.invalidateQueries({ queryKey: ["weather"] })
            }
          />
        )}

        {geo && weather && (
          <WeatherCard
            cityLabel={`${geo.name}${geo.country ? ", " + geo.country : ""}`}
            weather={weather}
          />
        )}
      </div>

      {/* forecast 5d */}
      <div className="w-full flex justify-center">
        {fcLoading && <p className="mt-4">Loading...</p>}
        {fcErr && (
          <ErrorBox
            message="Fail to load weather 5 days"
            OnRetry={() =>
              queryClient.invalidateQueries({ queryKey: ["forecast"] })
            }
          />
        )}
      </div>
      {forecast && <ForecastStrip days={forecast} />}
      <footer className="mt-10 text-xs opacity-60">Source: OpenWeather</footer>
    </div>
  );
};

export default Home;
