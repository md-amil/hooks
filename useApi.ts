import api from "@/api";
import { useAuth } from "@/auth/hooks";
import { useState, useCallback, useRef } from "react";

export interface ApiResponse<T> {
  result?: T | undefined;
  error?: Error | undefined;
  isFetching: boolean;
}

export type TUseApiResponse<T> = [
  T | undefined,
  (...args: any[]) => Promise<void>,
  boolean,
  Error | unknown,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

export default function useApi<T>(
  url?: string,
  initialValue?: T | undefined
): TUseApiResponse<T> {
  const [data, setData] = useState<T | undefined>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(undefined);
  const uri = useRef(url);
  const auth = useAuth();
  const handleMount = useCallback(
    async (params: any) => {
      setError(undefined);
      setIsLoading(true);
      try {
        if (params?.uri) {
          uri.current = params.uri;
          delete params.uri;
        }
        const result = await api.get<T>(uri.current, {
          params: { ...params },
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        });
        setData(result);
      } catch (error: any) {
        setError(error);
      }
      setIsLoading(false);
    },
    [url]
  );

  return [data, handleMount, isLoading, error, setData];
}
