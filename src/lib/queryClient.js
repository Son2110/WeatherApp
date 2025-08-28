import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 phut
      retry: 1, // loi thu lai 1 lan
      refetchOnWindowFocus: false, // tranh chop' chop' khi focus
    },
  },
});
