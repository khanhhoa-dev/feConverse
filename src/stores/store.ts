import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/Slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>; // Type cho toàn bộ state
export type AppDispatch = typeof store.dispatch; // Type cho dispatch (hỗ trợ thunks)
