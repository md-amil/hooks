import Event from "events";
import { useEffect, useState } from "react";

const provider = new Event();

export default function useGlobal<T>(name: string) {
  const [state, setState] = useState<T>();
  
  useEffect(() => {
    function handler(value: T) {
      setState(value);
    }
    provider.on(name, handler);
    return () => {
      provider.off(name, handler);
    };
  }, [name]);



  function newState(data: T) {
    setState(data);
    provider.emit(name, data);
  }
  return [state, newState] as const;
}

