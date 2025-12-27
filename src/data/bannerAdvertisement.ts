interface IBanner {
    image: string;
    link: string;
}

export const Banners: Record<string, IBanner> = {
    Sale: {
        image: 'https://www.converse.vn/media/weltpixel/owlcarouselslider/images/c/o/converse-x-madhappy-eng-main-desktop-.gif',
        link: 'shoes',
    },
    CocaShoes: {
        image: 'https://www.converse.vn/media/weltpixel/owlcarouselslider/images/s/h/shai_red_exclusive_launch_desktop_1_.jpg',
        link: 'shoes',
    },
    Shoes: {
        image: 'https://www.converse.vn/media/weltpixel/owlcarouselslider/images/d/e/dekstop_design_main_banner_49.jpg',
        link: 'shoes',
    },
} as const;
