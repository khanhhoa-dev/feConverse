import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';

export const useLoginSelector = () => {
    const userData = useSelector((state: RootState) => state.auth.login.data);
    return userData;
};
