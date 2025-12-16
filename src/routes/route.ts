import type { ComponentType } from 'react';

import Pay from '../pages/Pay/Pay';
import Help from '../pages/Help/Help';
import Home from '../pages/Home/Home';
import Product from '../pages/Products/Product';
import Register from '../pages/Register/Register';
import ItemsCart from '../pages/ItemsCart/ItemsCart';
import AddProduct from '../pages/AddProduct/AddProduct';
import OnlyHeader from '../layouts/OnlyHeader/OnlyHeader';
import OrderDetail from '../pages/OrderDetail/OrderDetail';
import CancelOrder from '../pages/CancelOrder/CancelOrder';
import ManagerUsers from '../pages/ManageUsers/ManageUsers';
import StoreLocator from '../pages/StoreLocator/StoreLocator';
import OrderReviewed from '../pages/OrderReviewed/OrderReviewed';
import UpdateProduct from '../pages/UpdateProduct/UpdateProduct';
import DetailProduct from '../pages/DetailProduct/DetailProduct';
import ManageProducts from '../pages/ManageProducts/ManageProducts';
import DeletedProducts from '../pages/DeletedProducts/DeletedProducts';
import type { LayoutProps } from '../ts';

import config from '../config';

interface Route {
    path: string;
    component: ComponentType;
    layout?: ComponentType<LayoutProps>;
}

export const publicRoute: Route[] = [
    { path: config.router.help, component: Help },
    { path: config.router.home, component: Home },
    { path: config.router.products, component: Product },
    { path: config.router.register, component: Register },
    { path: config.router.items_cart, component: ItemsCart },
    { path: config.router.order_detail, component: OrderDetail },
    { path: config.router.cancel_order, component: CancelOrder },
    { path: config.router.store_locator, component: StoreLocator },
    { path: config.router.review_order, component: OrderReviewed },
    { path: config.router.pay, component: Pay, layout: OnlyHeader },
    { path: config.router.detail_product, component: DetailProduct },
    { path: config.router.add_product, component: AddProduct, layout: OnlyHeader },
    { path: config.router.manage_users, component: ManagerUsers, layout: OnlyHeader },
    { path: config.router.update_product, component: UpdateProduct, layout: OnlyHeader },
    { path: config.router.manage_products, component: ManageProducts, layout: OnlyHeader },
    { path: config.router.deleted_product, component: DeletedProducts, layout: OnlyHeader },
];
export const privateRoute = [];
