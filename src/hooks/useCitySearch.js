import { useQuery } from "@tanstack/react-query";
import { searchCity, searchCityByCoords } from "../api/openWeather";

export function useCitySearch(name, lat, lon) {
  return useQuery({
    queryKey: ["geo", name, lat, lon],
    queryFn: () => {
      if (lat && lon) {
        return searchCityByCoords(lat, lon);
      }
      return searchCity(name);
    },
    enabled: !!(name || (lat && lon)), //city rong thi ko goi
  });
}
