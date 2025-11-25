import * as httpsRequest from '../utils/httpsRequest';
import type { IProductDetail } from '../ts/index';

export const createProduct = async (data: IProductDetail) => {
    try {
        const result = await httpsRequest.post('/create/product', data);
        return result;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};
