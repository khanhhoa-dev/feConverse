import * as httpsRequest from '../utils/httpsRequest';

//[GET] :/search/product?name=name
export async function search(name: string) {
    try {
        //"Get" ở đây là đang gọi hàm Get ở httpsRequest  không phải gọi method "Get"
        const result = await httpsRequest.get('/search/product', {
            params: {
                name,
            },
        });
        return result;
    } catch (error) {
        console.error('Error in SearchProduct:', error);
        throw error;
    }
}
