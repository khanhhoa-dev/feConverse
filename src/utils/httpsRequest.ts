import axios, { type AxiosRequestConfig } from 'axios';
import type { IProductDetail } from '../ts/index';

const httpsRequest = axios.create({
    baseURL: import.meta.env.VITE_CONVERSE_BASE_API as string,
});

//[GET]
export const get = async <T = any>(path: string, option: AxiosRequestConfig = {}) => {
    const result = await httpsRequest.get<T>(path, option);
    return result.data;
};

//[POST]
export const post = async <T = any>(
    path: string,
    data: IProductDetail,
    option: AxiosRequestConfig = {}
) => {
    const result = await httpsRequest.post<T>(path, data, option);
    return result.data;
};

//[PATCH]
export const patch = async <T = any>(
    path: string,
    data?: IProductDetail,
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
