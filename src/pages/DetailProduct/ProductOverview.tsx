import classNames from 'classnames/bind';
import { Col, Button, Select } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

import styles from './DetailProduct.module.scss';
import type { IProductDetail } from '../../ts';

const cx = classNames.bind(styles);
function ProductOverview({ data }: { data: IProductDetail | null }) {
    console.log(data);

    return (
        <Col span={10} className={cx('column-left')}>
            <div className={cx('product-information')}>
                <div className={cx('product-title')}>
                    <h1 className={cx('title')}>Converse x CDG Chuck 70</h1>
                </div>
                <div className={cx('product-price')}>
                    <span className={cx('price')}>₫3,100,000.00</span>
                </div>
                <div className={cx('product-overview')}>
                    <p>
                        A fan-favorite collab, the Comme des Garçons PLAY Chuck 70 sneaker puts a
                        playful spin on a classic.
                    </p>
                </div>
                <div className={cx('list-color')}>
                    <h3 className={cx('label')}>Color</h3>
                    <div className={'color'}>
                        <div className={cx('list-img')}>
                            <img
                                src="https://www.converse.vn/media/catalog/product/cache/ced975331a4708f956231f336bba181e/0/8/0882-CON162056C00006H-1.jpg"
                                alt=""
                                className={cx('image-color')}
                            />
                            <img
                                src="https://www.converse.vn/media/catalog/product/cache/ced975331a4708f956231f336bba181e/0/8/0882-CON162056C00006H-1.jpg"
                                alt=""
                                className={cx('image-color')}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('list-size')}>
                    <h3 className={cx('label')}>Size</h3>
                    <Select
                        className={cx('choose-size')}
                        defaultValue="-- Choose size --"
                        style={{ width: '100%' }}
                        placeholder="-- Choose size --"
                        size="large" // To hơn như ảnh
                    >
                        <Select.Option value="36">36</Select.Option>
                        <Select.Option value="37">37</Select.Option>
                        <Select.Option value="38">38</Select.Option>
                        <Select.Option value="One-Size">One-Size</Select.Option>
                    </Select>
                </div>
                <div className={cx('quantity')}>
                    <h3 className={cx('label')}>Quantity: 20</h3>
                </div>
                <div className={cx('add-shopping-cart')}>
                    <Button danger type="primary" block className={cx('btn')}>
                        Add in shopping cart
                        <ShoppingOutlined />
                    </Button>
                </div>
            </div>
        </Col>
    );
}

export default ProductOverview;
