import type { ComponentType } from 'react';

import Home from '../pages/Home/Home';
import Product from '../pages/Products/Product';
import Pay from '../pages/Pay/Pay';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import OnlyHeader from '../OnlyHeader/OnlyHeader';
import type { LayoutProps } from '../ts';

import config from '../config';

interface Route {
    path: string;
    component: ComponentType;
    layout?: ComponentType<LayoutProps>;
}

export const publicRoute: Route[] = [
    { path: config.router.home, component: Home },
    { path: config.router.products, component: Product },
    { path: config.router.pay, component: Pay, layout: OnlyHeader },
    { path: config.router.shopping_cart, component: ShoppingCart },
];
export const privateRoute = [];
