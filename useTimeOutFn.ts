import { useEffect, useRef, useCallback } from 'react';

const useTimeoutFn = (fn, delay) => {
    const callback = useRef(fn);
    const timeout = useRef();

    useEffect(() => {
        callback.current = fn;
    }, [fn]);

    const set = useCallback(() => {
        timeout.current = setTimeout(() => callback.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);

    return { set, clear };
};

export default useTimeoutFn;
