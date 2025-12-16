import * as httpsRequest from '../utils/httpsRequest';

import type { IOrderDetail } from '../ts';

//[GET]: /order-detail/:id
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

//[GET]: /order-detail/canceled/:id
export const orderCanceled = async (accessToken: string, id: string) => {
    try {
        const result = await httpsRequest.get<IOrderDetail[]>(`/order-detail/canceled/${id}`, {
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

//[GET]: /order-detail/reviewed/:id
export const orderReviewed = async (accessToken: string, id: string) => {
    try {
        const result = await httpsRequest.get<IOrderDetail[]>(`/order-detail/reviewed/${id}`, {
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

//[PATCH]: /order-detail/update-status/:orderCode
export const updateStatus = async (accessToken: string, dataUpdate: string, orderCode: number) => {
    try {
        const result = httpsRequest.patch(
            `/order-detail/update-status/${orderCode}`,
            {
                orderStatus: dataUpdate,
            },
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};

//[PATCH]: /order-detail/review-order/:orderCode
export const reviewOrder = async (accessToken: string, orderCode: number) => {
    try {
        const result = httpsRequest.patch(
            `/order-detail/review-order/${orderCode}`,
            {},
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};
