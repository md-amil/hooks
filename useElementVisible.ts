import { useState, useEffect, useRef } from 'react';

const useElementVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return [ref, isVisible];
};

export default useElementVisibility;
