import * as httpsRequest from '../utils/httpsRequest';

//[DELETE]: Delete Soft
export const deleteSoftProduct = async (id: string) => {
    try {
        const result = await httpsRequest.del(`/products/delete-soft/${id}`);
        return result;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};

//[GET]: Product Deleted Soft
export const deleted = async () => {
    try {
        const result = await httpsRequest.get('products/deleted');
        return result;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

//[PATCH]: Product Restore
export const restore = async (id: string) => {
    try {
        const result = await httpsRequest.patch(`/products/restore/${id}`);
        return result;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

//[DELETE]: Delete Hard
export const deleteHard = async (id: string) => {
    try {
        const result = await httpsRequest.del(`/products/delete-hard/${id}`);
        return result;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};
