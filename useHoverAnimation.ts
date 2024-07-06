import { useState, useRef, useEffect } from 'react';

const useHoverAnimation = animationClass => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            const handleMouseOver = () => setHovered(true);
            const handleMouseOut = () => setHovered(false);

            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);

            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    useEffect(() => {
        if (hovered && ref.current) {
            ref.current.classList.add(animationClass);
        } else if (ref.current) {
            ref.current.classList.remove(animationClass);
        }
    }, [hovered, animationClass]);

    return ref;
};

export default useHoverAnimation;
