import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Carousel } from 'antd';

import styles from './FeaturedProduct.module.scss';
import type { DataSelectField } from '../../ts';
import * as featuredProduct from '../../services/featuredProduct';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
interface FeaturedProductProps {
    product?: string;
    title?: string;
}

function FeaturedProduct({ product, title }: FeaturedProductProps) {
    const [dataProducts, setDataProducts] = useState<DataSelectField[]>([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await featuredProduct.featured(product);
                setDataProducts(result);
            } catch (error) {
                console.error('Error Api:', error);
            }
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Featured Product</h1>
            <Carousel
                autoplay
                autoplaySpeed={2000}
                arrows={true}
                dots={true}
                infinite={true}
                slidesToShow={5}
                responsive={[
                    { breakpoint: 1200, settings: { slidesToShow: 5 } },
                    { breakpoint: 992, settings: { slidesToShow: 5 } }, // Laptop: 3
                    { breakpoint: 768, settings: { slidesToShow: 3 } }, // Tablet: 2
                    { breakpoint: 480, settings: { slidesToShow: 2 } }, // Mobile: 1
                ]}
            >
                {dataProducts.map((data, i) => (
                    <div className={cx('propose-product')}>
                        <Link key={i} to={`/product/detail/${data.slug}`}>
                            <div className={cx('gap')}>
                                <div className={cx('wrap-img')}>
                                    <img
                                        src={data.image}
                                        alt={data.name}
                                        className={cx('img-propose')}
                                    />
                                </div>
                                <h3 className={cx('name-product')}>{data.name}</h3>
                                <h4 className={cx('price')}>đ{data.price}</h4>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default FeaturedProduct;
