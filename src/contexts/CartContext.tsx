import { useContext, useState, createContext, type ReactNode } from 'react';

import type { IItemCart } from '../pages/ItemsCart/ItemsCart';

interface ICartCheckOut {
    totalCart: number;
    setTotalCart: React.Dispatch<React.SetStateAction<number>>;
    checkOutItems: IItemCart[];
    setCheckOutItems: React.Dispatch<React.SetStateAction<IItemCart[]>>;
}

const CartCheckOut = createContext<ICartCheckOut | null>(null);

export const useCartItem = () => {
    const context = useContext(CartCheckOut);
    if (!context) {
        throw new Error('useCheckoutCart must be within CartProvider');
    }
    return context;
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [checkOutItems, setCheckOutItems] = useState<IItemCart[]>([]);
    const [totalCart, setTotalCart] = useState<number>(0);
    return (
        <CartCheckOut.Provider value={{ checkOutItems, totalCart, setTotalCart, setCheckOutItems }}>
            {children}
        </CartCheckOut.Provider>
    );
}
