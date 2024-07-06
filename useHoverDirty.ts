import { useState, useRef, useEffect } from 'react';

const useHoverDirty = () => {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);

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

    return [ref, isHovered];
};

export default useHoverDirty;
