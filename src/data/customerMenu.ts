//Enum-like
export enum CustomerMenuKey {
    MyAccount = 'my-account',
    ManageProducts = 'manage-products',
    ManageUsers = 'manage-users',
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
    [CustomerMenuKey.Logout]: {
        key: CustomerMenuKey.Logout,
        label: 'Log-out',
        requiredRole: ['user', 'admin'],
    },
} as const;
