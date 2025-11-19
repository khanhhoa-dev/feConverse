import * as httpsRequest from '../utils/httpsRequest';
import type { IProductDetail } from '../ts/index';

export const updateProduct = async (slug: string, data: IProductDetail) => {
    try {
        const result = await httpsRequest.patch(`/update/product/${slug}`, data);
        return result;
    } catch (error) {
        console.error('Error in UpdateProduct:', error);
        throw error;
    }
};
