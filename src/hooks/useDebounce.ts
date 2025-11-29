import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number): string => {
    const [valueDebounce, setValueDebounce] = useState<string>('');
    useEffect(() => {
        const timeout = setTimeout(() => {
            setValueDebounce(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value]);
    return valueDebounce;
};

export default useDebounce;
