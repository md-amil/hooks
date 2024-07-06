import { useState, useEffect, useRef } from 'react';

const useElementSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const ref = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                setSize({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight,
                });
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [ref, size];
};

export default useElementSize;
