import { useState, useEffect, useCallback } from 'react';

const useAsync = asyncFunction => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setIsLoading(true);
        setData(null);
        setError(null);
        return asyncFunction()
            .then(response => setData(response))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    }, [asyncFunction]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { isLoading, data, error, execute };
};

export default useAsync;
