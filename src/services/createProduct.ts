import * as httpsRequest from '../utils/httpsRequest';
import type { IProductDetail } from '../ts/index';

export const createProduct = async (data: IProductDetail) => {
    const result = await httpsRequest.post('/create/product', data);
    return result;
};
