import { useEffect } from "react";

export default function useMount(fn, deps = []) {
  useEffect(() => {
    fn();
  }, deps);
}
