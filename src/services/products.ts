import type { IProductDetail } from '../ts';
import * as httpsRequest from '../utils/httpsRequest';

// [GET]: /products/all
export async function allProducts() {
    try {
        const result = httpsRequest.get<IProductDetail[]>('products/all');
        return result;
    } catch (error) {
        console.log('Error', error);
    }
}
export async function products(
    product: string,
    gender?: string,
    type?: string,
    style?: string,
    page?: string
) {
    const result = await httpsRequest.get(`products/${product}`, {
        params: {
            gender,
            type,
            style,
            page,
        },
    });
    return result;
}
