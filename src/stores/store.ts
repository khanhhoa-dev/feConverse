import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/Slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>; // Type cho toàn bộ state
export type AppDispatch = typeof store.dispatch; // Type cho dispatch (hỗ trợ thunks)
