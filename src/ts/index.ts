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

//Product & Pagination
interface IVariant {
    color: string;
    img_detail: string;
    size: string[];
    quantity: number;
}

export interface IProductDetail {
    name: string;
    price: string;
    gender: string;
    title: string;
    styles: string;
    type: string;
    product: string;
    image: string;
    description: string;
    featured: boolean;
    variant: IVariant[];
}

export interface IProductResponsive {
    total: number;
    page: number;
    totalPages: number;
    products: DataSelectField[];
}
