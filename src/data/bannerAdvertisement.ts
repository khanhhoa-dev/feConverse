interface IBanner {
    image: string;
    link: string;
}

export const Banners: Record<string, IBanner> = {
    Sale: {
        image: 'https://www.converse.vn/media/weltpixel/owlcarouselslider/images/d/e/dekstop_4__8.jpg',
        link: 'shoes',
    },
    CocaShoes: {
        image: 'https://www.converse.vn/media/weltpixel/owlcarouselslider/images/c/o/coke_exclusive_launch_desktop_shop_2x.jpg',
        link: 'shoes',
    },
    Shoes: {
        image: 'https://www.converse.vn/media/weltpixel/owlcarouselslider/images/s/h/shine_eng_main_desktop_.jpg',
        link: 'shoes',
    },
} as const;
