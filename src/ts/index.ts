import type { ReactNode } from 'react';

export interface LayoutProps {
    children: ReactNode;
    active?: boolean;
}

export interface DataSelectField {
    name: string;
    image: string;
    price: string;
    product: string;
    slug: string;
}
