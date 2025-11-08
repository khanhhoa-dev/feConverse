//Enum-like
export enum CustomerMenuKey {
    MyAccount = 'my-account',
    AddProduct = 'add-product',
    Logout = 'logout',
}

export type MenuItem = {
    key: CustomerMenuKey;
    label: string;
    route?: string;
    requiredRole?: string[];
};

export const CUSTOMER_MENU: Record<CustomerMenuKey, MenuItem> = {
    [CustomerMenuKey.MyAccount]: {
        key: CustomerMenuKey.MyAccount,
        label: 'My Account',
        route: '/profile',
        requiredRole: ['user', 'admin'],
    },
    [CustomerMenuKey.AddProduct]: {
        key: CustomerMenuKey.AddProduct,
        label: 'Add-Product',
        route: '/add/product',
        requiredRole: ['admin'],
    },
    [CustomerMenuKey.Logout]: {
        key: CustomerMenuKey.Logout,
        label: 'Log-out',
        requiredRole: ['user', 'admin'],
    },
} as const;
