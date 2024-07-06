import { useRef } from "react";
import useMount from "./useMount";


export default function useDebounce(func,ms=500){
    const timerRef = useRef<NodeJS.Timeout|null>(null)
    return function (args) {
        if(timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(()=>func(args),ms)
    }
}


