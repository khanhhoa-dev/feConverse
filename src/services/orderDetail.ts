import * as httpsRequest from '../utils/httpsRequest';

import type { IOrderDetail } from '../ts';

export const orderDetail = async (accessToken: string, id: string) => {
    try {
        const result = await httpsRequest.get<IOrderDetail[]>(`/order-detail/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};
