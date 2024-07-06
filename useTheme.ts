import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(() => window.localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.className = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return [theme, toggleTheme];
};

export default useTheme;
