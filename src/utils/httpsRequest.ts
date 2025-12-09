import { jwtDecode } from 'jwt-decode';
import { persistor } from '../stores/store';
import axios, { type AxiosRequestConfig } from 'axios';

import { store } from '../stores/store';
import type { RootState } from '../stores/store';
import { updateAccessToken } from '../stores/Slices/authSlice';

interface RefreshResponse {
    accessToken: string;
}

const httpsRequest = axios.create({
    baseURL: import.meta.env.VITE_CONVERSE_BASE_API as string,
    withCredentials: true,
});

// [Check token expire]
const isTokenExpire = (token: string): boolean => {
    if (!token) return true;
    try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const timeNow = Math.floor(Date.now() / 1000);
        return timeNow >= decodedToken.exp;
    } catch (error) {
        console.warn('Invalid token, treating as expired');
        return true;
    }
};

// [Call Api refresh token]
const refreshAccessToken = async (): Promise<RefreshResponse> => {
    const response = await axios.post(
        `${import.meta.env.VITE_CONVERSE_BASE_API}/auth/refresh`,
        {},
        { withCredentials: true }
    );
    return response.data;
};

//[Auto Refresh Token Expire]
httpsRequest.interceptors.request.use(async (config) => {
    const userData = (store.getState() as RootState).auth.login.data;

    let tokenRefresh = userData?.accessToken;
    if (tokenRefresh && isTokenExpire(tokenRefresh)) {
        try {
            const refreshData = await refreshAccessToken();
            store.dispatch(updateAccessToken({ accessToken: refreshData.accessToken }));
            tokenRefresh = refreshData.accessToken;
            await persistor.flush();
        } catch (error) {
            console.error('Refresh failed:', error);
        }
    }
    if (tokenRefresh) {
        config.headers = config.headers || {};
        config.headers.token = `Bearer ${tokenRefresh}`;
    }
    return config;
});

//[Interceptor response]
httpsRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            (error.response?.status === 401 || error.response?.status === 403) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshData = await refreshAccessToken();
                store.dispatch(updateAccessToken({ accessToken: refreshData.accessToken }));
                // await persistor.flush();
                originalRequest.headers.token = `Bearer ${refreshData.accessToken}`;
                return httpsRequest(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

//[GET]
export const get = async <T = any>(path: string, option: AxiosRequestConfig = {}) => {
    const result = await httpsRequest.get<T>(path, option);
    return result.data;
};

//[POST]
export const post = async <T = any, D = any>(
    path: string,
    data: D,
    option: AxiosRequestConfig = {}
) => {
    const result = await httpsRequest.post<T>(path, data, option);
    return result.data;
};

//[PATCH]
export const patch = async <T = any, D = any>(
    path: string,
    data?: D,
    option: AxiosRequestConfig = {}
) => {
    const result = await httpsRequest.patch<T>(path, data, option);
    return result.data;
};

//[DELETE]
export const del = async <T = any>(path: string, option: AxiosRequestConfig = {}) => {
    const result = await httpsRequest.delete<T>(path, option);
    return result.data;
};

export default httpsRequest;
