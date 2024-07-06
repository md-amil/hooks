import { useState, useRef, useEffect } from 'react';

const useHoverEffect = (effect, deps = []) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (hovered) {
            effect();
        }
    }, [hovered, ...deps]);

    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);
            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    return ref;
};

export default useHoverEffect;
