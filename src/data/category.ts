// Enum-like
export enum RouteCategory {
    shoes = 'shoes',
    clothing = 'clothing',
    accessories = 'accessories',
    storelocator = 'Store Locator',
    help = 'Help',
}

type CategoryType = {
    name: RouteCategory;
    title: string;
    route: string;
};

export const categoryConfig: Record<RouteCategory, CategoryType> = {
    [RouteCategory.shoes]: {
        name: RouteCategory.shoes,
        title: 'Shoes',
        route: `/products/${RouteCategory.shoes}`,
    },
    [RouteCategory.clothing]: {
        name: RouteCategory.clothing,
        title: 'Clothing',
        route: `/products/${RouteCategory.clothing}`,
    },
    [RouteCategory.accessories]: {
        name: RouteCategory.accessories,
        title: 'Accessories',
        route: `/products/${RouteCategory.accessories}`,
    },
    [RouteCategory.storelocator]: {
        name: RouteCategory.storelocator,
        title: 'Store Locator',
        route: '/store-locator',
    },
    [RouteCategory.help]: {
        name: RouteCategory.help,
        title: 'Help',
        route: '/help',
    },
} as const;
