import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Select, message, Spin } from 'antd';
import { ShoppingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import type { IProductDetail } from '../../ts';
import styles from './DetailProduct.module.scss';
import * as Product from '../../services/products';
import * as ItemCart from '../../services/itemCart';
import { useCartItem } from '../../contexts/CartContext';
import { useLoginSelector } from '../../hooks/useAppSelector';
import * as GetDetailProduct from '../../services/detailProduct';
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';

const cx = classNames.bind(styles);
export interface IUpdateProduct {
    productId: string;
    color: string;
    quantity: number;
}

function DetailProduct() {
    const { slug } = useParams();
    const userData = useLoginSelector();
    const { setTotalCart } = useCartItem();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [quantityProduct, setQuantityProduct] = useState<number>(1);
    const [imgProductColor, setImgProductColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [dataDetail, setDataDetail] = useState<IProductDetail | null>(null);

    useEffect(() => {
        if (!slug) {
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const data = await GetDetailProduct.detail(slug);
            setLoading(false);
            setDataDetail(data);
            setSelectedSize(null);
            setQuantityProduct(1);
        };
        fetchApi();
    }, [slug]);

    const handleClickMinus = () => {
        setQuantityProduct((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleClickPlus = () => {
        setQuantityProduct((prev) => prev + 1);
    };

    const handleImgProductColor = (color: string) => {
        setImgProductColor(color);
        setQuantityProduct(1);
        setSelectedSize(null);
    };

    const findImgProduct =
        dataDetail?.variant.find((data) => data.color === imgProductColor) ||
        dataDetail?.variant[0];

    const handleAddToCart = async () => {
        if (!dataDetail || !findImgProduct) {
            return;
        }
        if (!userData) {
            messageApi.error({
                content: 'Please login',
                duration: 4,
                style: {
                    fontSize: '1.4rem',
                    fontWeight: '600',
                },
            });
            return;
        }
        if (!selectedSize) {
            messageApi.error({
                content: 'Please choose size',
                duration: 4,
                style: {
                    fontSize: '1.4rem',
                    fontWeight: '600',
                },
            });
            return;
        }

        const payload = {
            userId: userData._id,
            productId: dataDetail?._id,
            name: dataDetail?.name,
            price: dataDetail?.price,
            quantity: quantityProduct,
            color: findImgProduct?.color,
            image: findImgProduct?.img_detail,
            size: selectedSize,
        };

        const payloadUpdateQuantity = {
            productId: dataDetail._id,
            color: findImgProduct.color,
            quantity: quantityProduct,
        };

        //Add to cart
        setLoading(true);
        const result = await ItemCart.AddItemCart(payload);
        //Update Product Quantity
        const updateQuantity = await Product.updateQuantity(payloadUpdateQuantity);
        setDataDetail(updateQuantity as IProductDetail);
        setTotalCart(result.totalCart);
        setLoading(false);
        messageApi.success({
            content: 'Add product to cart successfully',
            duration: 4,
            style: {
                fontSize: '1.4rem',
                fontWeight: '600',
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <Row>
                <Col span={14} className={cx('column-right')}>
                    <div className={cx('product-media')}>
                        <img
                            src={findImgProduct?.img_detail}
                            alt="ImageProduct"
                            className={cx('product-img')}
                        />
                    </div>
                    <div className={cx('description')}>
                        <h1 className={cx('name-product')}>{dataDetail?.name} - Product Detail</h1>
                        <span className={cx('introduce-product')}>{dataDetail?.description}</span>
                    </div>
                </Col>
                <Col span={10} className={cx('column-left')}>
                    <div className={cx('product-information')}>
                        <div className={cx('product-title')}>
                            <h1 className={cx('title')}>{dataDetail?.name}</h1>
                        </div>
                        <div className={cx('product-price')}>
                            <span className={cx('price')}>₫{dataDetail?.price}</span>
                        </div>
                        <div className={cx('product-overview')}>
                            <p>{dataDetail?.title}</p>
                        </div>
                        <div className={cx('list-color')}>
                            <h3 className={cx('label')}>Color</h3>
                            <div className={'color'}>
                                <div className={cx('list-img')}>
                                    {dataDetail?.variant.map((data, i) => {
                                        return (
                                            <img
                                                key={i}
                                                onClick={() => handleImgProductColor(data.color)}
                                                src={data.img_detail}
                                                alt={data.color}
                                                className={cx(
                                                    'image-color',
                                                    findImgProduct?.color === data.color
                                                        ? 'active'
                                                        : ''
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={cx('list-size')}>
                            <h3 className={cx('label')}>Size</h3>
                            <Select
                                className={cx('choose-size')}
                                style={{ width: '100%' }}
                                value={selectedSize || undefined}
                                placeholder="-- Choose size --"
                                size="large"
                                onChange={(value) => setSelectedSize(value)}
                            >
                                {findImgProduct?.size.map((size, i) => (
                                    <Select.Option key={i} value={size}>
                                        {size}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className={cx('quantity')}>
                            <div className={cx('number-quantity')}>
                                <button className={cx('btn-minus')} onClick={handleClickMinus}>
                                    <MinusOutlined />
                                </button>
                                <span className={cx('number')}>{quantityProduct}</span>
                                <button className={cx('btn-plus')} onClick={handleClickPlus}>
                                    <PlusOutlined />
                                </button>
                            </div>
                            <h3 className={cx('label')}>
                                {findImgProduct?.quantity === 0
                                    ? 'Sold out'
                                    : `${findImgProduct?.quantity} products available`}
                            </h3>
                        </div>

                        {userData?.admin === false && (
                            <div className={cx('add-shopping-cart')}>
                                {findImgProduct?.quantity === 0 ? (
                                    <Button disabled type="primary" block className={cx('btn')}>
                                        Sold out
                                    </Button>
                                ) : (
                                    <Button
                                        danger
                                        type="primary"
                                        block
                                        className={cx('btn')}
                                        onClick={handleAddToCart}
                                    >
                                        Add in shopping cart
                                        <ShoppingOutlined />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <div className={cx('recommended-products')}>
                <FeaturedProduct typeProduct={dataDetail?.product} title="Recommended Products" />
            </div>
            <Spin fullscreen spinning={loading}></Spin>
        </div>
    );
}

export default DetailProduct;
