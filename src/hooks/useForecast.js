import { useQuery } from "@tanstack/react-query";
import { getForecast5d } from "../api/openWeather";

export function useForecast(lat, lon, units = "metric") {
  return useQuery({
    queryKey: ["forecast", lat, lon, units],
    queryFn: () => getForecast5d(lat, lon, units),
    enabled: lat != null && lon != null,
    staleTime: 5 * 60 * 1000, //5 phut
  });
}
