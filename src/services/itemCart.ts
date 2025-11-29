import * as httpsRequest from '../utils/httpsRequest';
import type { GetItemCartResponse } from '../pages/ItemsCart/ItemsCart';

export interface IPayLoadItemCart {
    userId: string;
    productId: string;
    name: string;
    quantity: number;
    price: string;
    color: string;
    image: string;
    size: string;
}

export interface IAddItemCart {
    item: IPayLoadItemCart;
    totalCart: number;
}

//[GET]: /items-cart
export const GetItemCart = async (token: string) => {
    try {
        const result = await httpsRequest.get<GetItemCartResponse>('/items-cart/', {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};

//[DELETE]: /items-cart/delete/:id
export const DeleteItemCart = async (id: string, token: string) => {
    try {
        const result = await httpsRequest.del(`/items-cart/delete/${id}`, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};

//[POST] :/items-cart/add
export const AddItemCart = async (payload: IPayLoadItemCart) => {
    try {
        const result = await httpsRequest.post<IAddItemCart>('/items-cart/add', payload);
        return result;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};
