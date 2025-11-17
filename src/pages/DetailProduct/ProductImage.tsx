import classNames from 'classnames/bind';
import { Col } from 'antd';

import styles from './DetailProduct.module.scss';
import type { IProductDetail } from '../../ts';

const cx = classNames.bind(styles);

function ProductImage({ data }: { data: IProductDetail | null }) {
    console.log(data);
    return (
        <Col span={14} className={cx('column-right')}>
            <div className={cx('product-media')}>
                <img
                    src="https://www.converse.vn/media/catalog/product/cache/ae7cee22ac1ff58c2794c87414f27b45/0/8/0882-CONA08792C00W03H-11.jpg"
                    alt="ImageProduct"
                    className={cx('product-img')}
                />
            </div>
            <div className={cx('description')}>
                <h1 className={cx('name-product')}>Converse x CDG Chuck 70 - Product Details</h1>
                <span className={cx('introduce-product')}>
                    CLASSIC CHUCK 70 WITH A PLAYFUL TWIST. Wear your heart on your shoes with the
                    Converse x Comme des Garçons PLAY Chuck 70 sneaker. This street-ready style
                    features the premium Chuck details you know and love, paired with a whimsical
                    heart-and-eyes graphic peeking just above the sole. Eye-catching is an
                    understatement. WHY YOU SHOULD BE DOWN Canvas is lightweight and durable. Tonal
                    rubber toe cap and contrasting heelstay for standout style. Lace-up design for a
                    snug fit. Vulcanized rubber sole for increased traction. Signature
                    heart-and-eyes logo adds a fun flair.
                </span>
            </div>
        </Col>
    );
}

export default ProductImage;
