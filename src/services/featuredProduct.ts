import * as httpsRequest from '../utils/httpsRequest';

//[GET] :/products/featured
export async function featured(product?: string) {
    try {
        const result = await httpsRequest.get('/products/featured', {
            params: {
                product,
            },
        });
        return result;
    } catch (error) {
        console.error('Error in FeaturedProduct');
        throw error;
    }
}
