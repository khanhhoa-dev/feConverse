interface IListBackground {
    shoes: string;
    clothing: string;
    accessories: string;
    hats: string;
    laces: string;
    'chuck-70': string;
    'classic-chuck': string;
    'skate-elevation': string;
    'pants-shorts': string;
    'jacket-hoodies': string;
    'bags-backpacks': string;
    'waist-bag': string;
}
export type ProductType = keyof IListBackground;
export const ListBackground: IListBackground = {
    shoes: 'https://www.converse.vn/media/catalog/category/Men_s_Shoes_2.jpg',
    clothing: 'https://www.converse.vn/media/catalog/category/Men_Top_and_tee_1.jpg',
    accessories: 'https://www.converse.vn/media/catalog/category/WOMAN_All_Accessories_2.jpg',
    hats: 'https://www.converse.vn/media/catalog/category/Men_hats_1.jpg',
    laces: 'https://www.converse.vn/media/catalog/category/Women_Others.jpg',
    'chuck-70': 'https://www.converse.vn/media/catalog/category/Chuck_70_11.jpg',
    'classic-chuck': 'https://www.converse.vn/media/catalog/category/Classic_Chuck_8.jpg',
    'skate-elevation': 'https://www.converse.vn/media/catalog/category/Women_Elevation_1.jpg',
    'pants-shorts': 'https://www.converse.vn/media/catalog/category/Men_pants_and_shorts_1_.jpg',
    'jacket-hoodies': 'https://www.converse.vn/media/catalog/category/Women_s_Jackets_Hoodies.jpg',
    'bags-backpacks': 'https://www.converse.vn/media/catalog/category/Men_Bags_backpacks.jpg',
    'waist-bag': 'https://www.converse.vn/media/catalog/category/Women_Waist_Bag_1.jpg',
};

function ToggleBackground(key: ProductType): string {
    return ListBackground[key];
}

export default ToggleBackground;
