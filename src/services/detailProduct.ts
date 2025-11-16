import * as httpRequest from '../utils/httpsRequest';

export async function detail(slug: string) {
    try {
        const result = httpRequest.get(`/${slug}`);
        return result;
    } catch (error) {
        console.error(error);
    }
}
