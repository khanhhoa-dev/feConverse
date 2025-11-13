import * as httpsRequest from '../utils/httpsRequest';

//[GET]: /products/:product/filter
export async function category(product: string) {
    try {
        const result = await httpsRequest.get(`/products/${product}/filter`);
        return result;
    } catch (error) {
        console.error('Category Not Found:', error);
        throw error;
    }
}
