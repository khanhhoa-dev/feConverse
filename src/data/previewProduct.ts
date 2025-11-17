interface IPreviewProduct {
    key: string;
    label: string;
    image: string;
}

export const PreviewProduct: Record<string, IPreviewProduct> = {
    High: {
        key: 'high',
        label: 'High tops',
        image: 'https://converse.ca/cdn/shop/files/D-Converse-Homepage-P2A-High-Tops.jpg?v=1743713633',
    },
    Low: {
        key: 'low',
        label: 'Low tops',
        image: 'https://converse.ca/cdn/shop/files/D-Converse-Homepage-P2B-Low-Tops.jpg?v=1743713633',
    },
};
