import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../api/openWeather";

export function useCurrentWeather(lat, lon, units = "metric") {
  return useQuery({
    queryKey: ["weather", lat, lon, units],
    queryFn: () => getCurrentWeather(lat, lon, units),
    enabled: lat != null && lon != null, //can lat/lon moi goi
  });
}
