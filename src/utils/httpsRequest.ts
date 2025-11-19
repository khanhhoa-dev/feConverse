import axios, { type AxiosRequestConfig } from 'axios';
import type { IProductDetail } from '../ts/index';

const httpsRequest = axios.create({
    baseURL: import.meta.env.VITE_CONVERSE_BASE_API as string,
});

export const get = async <T = any>(path: string, option: AxiosRequestConfig = {}) => {
    const result = await httpsRequest.get<T>(path, option);
    return result.data;
};

export const post = async <T = any>(
    path: string,
    data: IProductDetail,
    option: AxiosRequestConfig = {}
) => {
    const result = await httpsRequest.post<T>(path, data, option);
    console.log(result);
    return result.data;
};

export const patch = async <T = any>(
    path: string,
    data: IProductDetail,
    option: AxiosRequestConfig = {}
) => {
    const result = await httpsRequest.patch<T>(path, data, option);
    console.log(result.data);
    return result.data;
};

export default httpsRequest;
