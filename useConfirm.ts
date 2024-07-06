import { useState } from 'react';

const useConfirm = (message = "Are you sure?") => {
    const [confirmed, setConfirmed] = useState(false);

    const confirm = () => {
        if (window.confirm(message)) {
            setConfirmed(true);
        }
    };

    return [confirmed, confirm];
};

export default useConfirm;
