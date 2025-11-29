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
    _id: string;
    name: string;
    price: string;
    gender: string;
    title: string;
    style: string;
    type: string;
    product: string;
    image: string;
    description: string;
    featured: boolean;
    slug: string;
    variant: IVariant[];
}

export interface IProductResponsive {
    total: number;
    page: number;
    totalPages: number;
    products: DataSelectField[];
}

export interface IAuthUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    admin: boolean;
    gender: string;
    accessToken: string;
}
