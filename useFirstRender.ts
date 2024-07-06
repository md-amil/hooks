import { useRef } from 'react';

const useFirstRender = () => {
    const firstRender = useRef(true);

    if (firstRender.current) {
        firstRender.current = false;
        return true;
    }
    return false;
};

export default useFirstRender;
