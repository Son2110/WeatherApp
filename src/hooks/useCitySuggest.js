import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { suggestCities } from "../api/openWeather";

export function useCitySuggest(term, limit = 5) {
  const debounced = useDebounce(term, 300);
  return useQuery({
    queryKey: ["suggest", debounced, limit],
    queryFn: () => suggestCities(debounced, limit),
    enabled: !!debounced && debounced.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}
