import api from "@/api";
import { useAuth } from "@/auth/hooks";
import { useMutation as useQueryMutation } from "@tanstack/react-query";
import { message } from "antd";
export default function useUpdate(url: string = "") {
  const auth = useAuth();
  const { mutate } = useQueryMutation({
    mutationFn: ({ uri, ...payload }: any) => {
      return api.authorize(auth?.token).put(url, payload);
    },
    onSuccess: (data: any, variables, context) => {
      message.success(data);
    },
    onError: (error: any, variables, context) => {
      message.success(error?.data?.message);
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
    },
  });
  return [mutate];
}
