import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const handleSuccess = position => {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        };

        const handleError = error => setError(error.message);

        const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError);

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    return { ...position, error };
};

export default useGeolocation;
