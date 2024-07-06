import { useEffect } from 'react';

const useUnmount = fn => {
    useEffect(() => {
        return () => {
            fn();
        };
    }, []);
};

export default useUnmount;
