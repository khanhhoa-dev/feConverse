import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailProduct.module.scss';
import ProductImage from './ProductImage';
import ProductOverview from './ProductOverview';
import * as GetDetailProduct from '../../services/detailProduct';
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';
import type { IProductDetail } from '../../ts';

const cx = classNames.bind(styles);

function DetailProduct() {
    const { slug } = useParams();
    const [dataDetail, setDataDetail] = useState<IProductDetail | null>(null);
    useEffect(() => {
        if (!slug) {
            return;
        }
        const fetchApi = async () => {
            const data = await GetDetailProduct.detail(slug);
            setDataDetail(data);
        };
        fetchApi();
    }, [slug]);

    return (
        <div className={cx('wrapper')}>
            <Row>
                <ProductImage data={dataDetail} />
                <ProductOverview data={dataDetail} />
            </Row>
            <div className={cx('recommended-products')}>
                <FeaturedProduct product="shoes" title="Recommended Products" />
            </div>
        </div>
    );
}

export default DetailProduct;
