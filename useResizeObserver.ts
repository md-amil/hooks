import { useState, useEffect, useRef } from 'react';

const useResizeObserver = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const ref = useRef();

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setSize(entry.contentRect);
            });
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return [ref, size];
};

export default useResizeObserver;
