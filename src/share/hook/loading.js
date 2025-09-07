import { useState } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const finishLoading = () => {
        setLoading(false);
    };

    const startLoading = () => {
        setLoading(true);
    };

    return [loading, startLoading, finishLoading];
};
