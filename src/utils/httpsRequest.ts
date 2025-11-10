import axios, { type AxiosRequestConfig } from 'axios';

const httpsRequest = axios.create({
    baseURL: import.meta.env.VITE_CONVERSE_BASE_API as string,
});

export const get = async <T = any>(path: string, option: AxiosRequestConfig = {}) => {
    const result = await httpsRequest.get<T>(path, option);
    return result.data;
};

export default httpsRequest;
