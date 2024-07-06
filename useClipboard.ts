import { useState, useCallback } from 'react';

const useClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(async text => {
        if (!navigator.clipboard) {
            console.error('Clipboard not supported');
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Copy failed', error);
            setIsCopied(false);
        }
    }, []);

    return [isCopied, copyToClipboard];
};

export default useClipboard;
