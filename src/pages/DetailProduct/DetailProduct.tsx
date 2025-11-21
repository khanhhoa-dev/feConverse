import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button, Select, message } from 'antd';
import { ShoppingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './DetailProduct.module.scss';
import * as GetDetailProduct from '../../services/detailProduct';
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';
import type { IProductDetail } from '../../ts';
import { useUser } from '../../contexts/UserContext';
import DeleteProduct from './DeleteProduct';

const cx = classNames.bind(styles);
function DetailProduct() {
    const { slug } = useParams();
    const [quantity, setQuantity] = useState<number>(1);
    const [imgProductColor, setImgProductColor] = useState<string>('');
    const [dataDetail, setDataDetail] = useState<IProductDetail | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const { role } = useUser();

    useEffect(() => {
        if (!slug) {
            return;
        }
        const fetchApi = async () => {
            const data = await GetDetailProduct.detail(slug);
            setDataDetail(data);
            setSelectedSize(null);
            setQuantity(1);
        };
        fetchApi();
    }, [slug]);

    const handleClickMinus = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleClickPlus = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleImgProductColor = (color: string) => {
        setImgProductColor(color);
        setQuantity(1);
        setSelectedSize(null);
    };

    const handleAddToCart = () => {
        if (!dataDetail || !findImgProduct) {
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

        //Loại bỏ dấu "," ở price
        const rawPrice = dataDetail?.price || '1';
        const numericPrice = Number(rawPrice.replace(/,/g, ''));

        const payload = {
            productId: dataDetail?._id,
            name: dataDetail?.name,
            price: numericPrice * quantity,
            quantity,
            color: findImgProduct?.color,
            image: findImgProduct?.img_detail,
            size: selectedSize,
        };

        console.log('Cart Detail:', payload);

        messageApi.success({
            content: 'Add product to cart successfully',
            duration: 4,
            style: {
                fontSize: '1.4rem',
                fontWeight: '600',
            },
        });
    };

    const findImgProduct =
        dataDetail?.variant.find((data) => data.color === imgProductColor) ||
        dataDetail?.variant[0];
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
                                <span className={cx('number')}>{quantity}</span>
                                <button className={cx('btn-plus')} onClick={handleClickPlus}>
                                    <PlusOutlined />
                                </button>
                            </div>
                            <h3 className={cx('label')}>
                                {findImgProduct?.quantity} products available
                            </h3>
                        </div>

                        <div className={cx('add-shopping-cart')}>
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
                        </div>
                        {role === 'admin' && (
                            <div className={cx('admin-action')}>
                                <Link to={`/update/${dataDetail?.slug}`} className={cx('wrap-btn')}>
                                    <Button
                                        danger
                                        type="primary"
                                        block
                                        style={{ marginTop: '30px' }}
                                        className={cx('btn-update')}
                                    >
                                        Update Products
                                    </Button>
                                </Link>
                                <DeleteProduct data={dataDetail as IProductDetail} />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <div className={cx('recommended-products')}>
                <FeaturedProduct typeProduct={dataDetail?.product} title="Recommended Products" />
            </div>
        </div>
    );
}

export default DetailProduct;
