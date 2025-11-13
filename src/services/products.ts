import * as httpsRequest from '../utils/httpsRequest';

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
