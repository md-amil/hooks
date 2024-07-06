import api from "@/api";
import { useAuth } from "@/auth/hooks";
import { useQuery } from "@tanstack/react-query";

export type TUseApiResponse<T> = [T | undefined, boolean, Error | unknown];

export default function useFetch<T>(
  url: string,
  params: any = {}
): TUseApiResponse<T> {
  const auth = useAuth();
  const { isPending, error, data } = useQuery<T>({
    queryKey: [url, ...Object.values(params)],
    queryFn: () =>
      api.get<T>(url, {
        params: { ...params },
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      }),
    // initialData,
  });
  return [data, isPending, error];
}
