import type { IProductDetail } from '../ts';
import type { IUpdateProduct } from '../pages/DetailProduct/DetailProduct';
import * as httpsRequest from '../utils/httpsRequest';

// [GET]: /products/all
export async function allProducts(token: string) {
    try {
        const result = httpsRequest.get<IProductDetail[]>('products/all', {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error', error);
    }
}

// [GET]: /products/:product
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

//[POST]: /products/update-quantity
export async function updateQuantity(data: IUpdateProduct) {
    try {
        const result = httpsRequest.post<IProductDetail>('/products/update-quantity', data);
        return result;
    } catch (error) {
        console.log('Error', error);
    }
}
