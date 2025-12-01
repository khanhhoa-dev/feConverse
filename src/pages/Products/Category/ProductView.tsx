import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

import styles from './Category.module.scss';
import type { IProductResponsive } from '../../../ts';
import * as Products from '../../../services/products';

const cx = classNames.bind(styles);

function ProductView({ product }: { product: 'shoes' | 'clothing' | 'accessories' }) {
    const [searchParam, setSearchParam] = useSearchParams();
    const [products, setProducts] = useState<IProductResponsive | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const gender = searchParam.get('gender') || undefined;
    const type = searchParam.get('type') || undefined;
    const style = searchParam.get('style') || undefined;
    const page = searchParam.get('page') || '1';

    useEffect(() => {
        if (!product) {
            console.log('Product is undefined, skipping fetch');
            return;
        }
        setLoading(true);
        const fetchApi = async () => {
            const result = await Products.products(product, gender, type, style, page);
            setProducts(result);
            setLoading(false);
        };

        fetchApi();
    }, [product, gender, type, style, page]);

    const handleChangePage = (pageTotal: number) => {
        const newParams = new URLSearchParams(searchParam);
        newParams.set('page', pageTotal.toString());
        setSearchParam(newParams);
    };

    //Nếu có có dữ liệu trả về
    const hasProduct = !!products?.products?.length;

    return (
        <>
            {loading ? (
                <Col span={18} className={cx('loading')}>
                    <img src="/loader.gif" alt="Loading spinner" className={cx('loading-img')} />
                </Col>
            ) : (
                <Col span={18} className={cx('col')}>
                    <div className={cx('menu')}>
                        <span className={cx('result')}>{products?.total} Results</span>
                    </div>
                    <div className={cx('list-product')}>
                        <Row>
                            {hasProduct ? (
                                products?.products.map((product, i) => {
                                    return (
                                        <Col span={6} className={cx('grid-product')} key={i}>
                                            <div className={cx('item')}>
                                                <Link
                                                    to={`/product/detail/${product.slug}`}
                                                    className={cx('wrap-img')}
                                                >
                                                    <img
                                                        className={cx('img-product')}
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </Link>
                                                <div className={cx('information')}>
                                                    <span className={cx('name-product')}>
                                                        {product.name}
                                                    </span>
                                                    <span className={cx('price')}>
                                                        đ{product.price}
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })
                            ) : (
                                <Col span={24} className={cx('not-found')}>
                                    <img
                                        src="/notfound.png"
                                        alt="Loading spinner"
                                        className={cx('not-found-img')}
                                    />
                                    <span className={cx('not-found-text')}>
                                        No Suitable Products
                                    </span>
                                </Col>
                            )}
                        </Row>
                    </div>
                    {hasProduct && (
                        <Pagination
                            align="center"
                            defaultCurrent={products?.page || 1}
                            total={products?.total || 0}
                            pageSize={8}
                            showSizeChanger={false}
                            onChange={(page) => handleChangePage(page)}
                        />
                    )}
                </Col>
            )}
        </>
    );
}

export default ProductView;
