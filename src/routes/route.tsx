import type { ComponentType } from 'react';

import Home from '../pages/Home/Home';
import Product from '../pages/Products/Product';
import Pay from '../pages/Pay/Pay';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import OnlyHeader from '../layouts/OnlyHeader/OnlyHeader';
import StoreLocator from '../pages/StoreLocator/StoreLocator';
import Help from '../pages/Help/Help';
import DetailProduct from '../pages/DetailProduct/DetailProduct';
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
    { path: config.router.store_locator, component: StoreLocator },
    { path: config.router.help, component: Help },
    { path: config.router.detail_product, component: DetailProduct },
];
export const privateRoute = [];
