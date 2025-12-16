//Enum-like
export enum CustomerMenuKey {
    ManageProducts = 'manage-products',
    ManageUsers = 'manage-users',
    OrderDetail = 'order-detail',
    Logout = 'logout',
}

export type MenuItem = {
    key: CustomerMenuKey;
    label: string;
    route?: string;
    requiredRole?: string[];
};

export const CUSTOMER_MENU: Record<CustomerMenuKey, MenuItem> = {
    [CustomerMenuKey.ManageProducts]: {
        key: CustomerMenuKey.ManageProducts,
        label: 'Manage-Products',
        route: '/manage-products',
        requiredRole: ['admin'],
    },
    [CustomerMenuKey.ManageUsers]: {
        key: CustomerMenuKey.ManageUsers,
        label: 'Manage-Users',
        route: '/manage-users',
        requiredRole: ['admin'],
    },
    [CustomerMenuKey.OrderDetail]: {
        key: CustomerMenuKey.OrderDetail,
        label: 'Order-Detail',
        route: '/order-detail',
        requiredRole: ['user'],
    },
    [CustomerMenuKey.Logout]: {
        key: CustomerMenuKey.Logout,
        label: 'Log-out',
        requiredRole: ['user', 'admin'],
    },
} as const;
