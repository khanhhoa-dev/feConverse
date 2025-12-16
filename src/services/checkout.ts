import type { IDataPayment } from './../ts/index';
import * as httpsRequest from '../utils/httpsRequest';

//[POST] :/payment/payos/create-url
export const checkoutPayos = async (token: string, data: IDataPayment) => {
    try {
        const result = httpsRequest.post('/payment/payos/create-url', data, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};

//[POST]: /payment/cod
export const checkoutCod = async (token: string, data: IDataPayment) => {
    try {
        const result = httpsRequest.post('/payment/cod', data, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};
