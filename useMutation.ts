import api from "@/api";
import { useAuth } from "@/auth/hooks";
import { useMutation as useQueryMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRef } from "react";

export default function useMutation(url: string = "") {
  const ref = useRef(null);
  const auth = useAuth();
  const { mutateAsync } = useQueryMutation({
    mutationFn: ({ uri, ...payload }: any) => {
      return api
        .authorize(auth?.token)
        [ref.current ? "update" : "post"](
          `${url}/${ref.current || ""}`,
          payload
        );
    },
    onSuccess: (data: any, variables, context) => {
      message.success(data.message);
    },
    onError: (error: any, variables, context) => {
      message.error(error);
    },
    onSettled: async (data, error, variables, context) => {},
  });

  async function mutation(payload, id?: number) {
    ref.current = id;
    return mutateAsync(payload);
  }
  return [mutation];
}
