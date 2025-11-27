import type { ComponentType } from 'react';

import Home from '../pages/Home/Home';
import Product from '../pages/Products/Product';
import Pay from '../pages/Pay/Pay';
import ItemsCart from '../pages/ItemsCart/ItemsCart';
import OnlyHeader from '../layouts/OnlyHeader/OnlyHeader';
import StoreLocator from '../pages/StoreLocator/StoreLocator';
import Help from '../pages/Help/Help';
import DetailProduct from '../pages/DetailProduct/DetailProduct';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Profile from '../pages/Profile/Profile';
import AddProduct from '../pages/AddProduct/AddProduct';
import UpdateProduct from '../pages/UpdateProduct/UpdateProduct';
import DeletedProducts from '../pages/DeletedProducts/DeletedProducts';
import ManageProducts from '../pages/ManageProducts/ManageProducts';
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
    { path: config.router.items_cart, component: ItemsCart },
    { path: config.router.store_locator, component: StoreLocator },
    { path: config.router.help, component: Help },
    { path: config.router.detail_product, component: DetailProduct },
    { path: config.router.forgot_password, component: ForgotPassword, layout: OnlyHeader },
    { path: config.router.register, component: Register },
    { path: config.router.add_product, component: AddProduct, layout: OnlyHeader },
    { path: config.router.profile, component: Profile },
    { path: config.router.update_product, component: UpdateProduct, layout: OnlyHeader },
    { path: config.router.deleted_product, component: DeletedProducts, layout: OnlyHeader },
    { path: config.router.manage_products, component: ManageProducts, layout: OnlyHeader },
];
export const privateRoute = [];
