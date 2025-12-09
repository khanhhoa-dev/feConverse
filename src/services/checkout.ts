import type { IDataPayment } from './../ts/index';
import * as httpsRequest from '../utils/httpsRequest';

export const checkout = async (token: string, data: IDataPayment) => {
    try {
        const result = httpsRequest.post('/payos/create-payment', data, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};
