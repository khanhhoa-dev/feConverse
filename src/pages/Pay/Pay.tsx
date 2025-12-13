import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Radio,
    Button,
    Card,
    Typography,
    Divider,
    message,
    Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import { DoubleLeftOutlined } from '@ant-design/icons';

import styles from './Pay.module.scss';
import type { IDataPayment } from '../../ts';
import type { IItemCart } from '../ItemsCart/ItemsCart';
import { useCartItem } from '../../contexts/CartContext';
import * as ProductCheckOut from '../../services/checkout';
import { useAccessToken } from '../../hooks/useAppSelector';

const { Title } = Typography;
const { Option } = Select;

const cx = classNames.bind(styles);
export interface IInformationOrder {
    fullname: string;
    email: string;
    address: string;
    phone: string;
    paymentMethod: string;
    shippingMethod: string;
}

function Pay() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const accessToken = useAccessToken();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { checkOutItems, setCheckOutItems } = useCartItem();

    useEffect(() => {
        const getCheckoutProduct = localStorage.getItem('checkoutProduct');

        if (checkOutItems.length === 0 && getCheckoutProduct) {
            setCheckOutItems(JSON.parse(getCheckoutProduct));
        }
    }, [checkOutItems]);

    //Total Price Products
    const orderTotal =
        checkOutItems.reduce((sum: number, item: IItemCart) => {
            const numericPrice = Number(item.price.replace(/,/g, ''));
            return sum + numericPrice * item.quantity;
        }, 0) || 0;

    // Type price: string => number
    const infoProduct = checkOutItems.map((item) => {
        return {
            ...item,
            price: Number(item.price.replace(/,/g, '')),
        };
    });

    const token = accessToken as string;

    const onFinish = async (values: IInformationOrder) => {
        setLoading(true);
        try {
            const checkoutData: IDataPayment = {
                ...values,
                items: infoProduct,
                total: orderTotal,
            };

            if (values.paymentMethod === 'payos') {
                const linkPayos = await ProductCheckOut.checkoutPayos(token, checkoutData);
                window.location.href = linkPayos.checkoutUrl;
                return;
            }

            if (values.paymentMethod === 'cod') {
                await ProductCheckOut.checkoutCod(token, checkoutData);
                navigate('/order-detail');
                return;
            }

            messageApi.success({
                content: 'Order successfully!',
                style: { fontSize: 14, fontWeight: 600 },
            });
        } catch (err) {
            console.error(err);
            messageApi.error('Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <Link to={'/items-cart'}>
                        <DoubleLeftOutlined className={cx('icon')} />
                    </Link>
                    <h1 className={cx('text-title')}>Check out</h1>
                </div>
            </div>
            <div className={'container'}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className={cx('checkout-form')}
                >
                    <Row gutter={24}>
                        <Col span={12} className={cx('col')}>
                            <Card
                                title={<Title level={4}>Information user</Title>}
                                className={cx('cart')}
                            >
                                <Form.Item
                                    name="fullname"
                                    label="Full Name"
                                    rules={[
                                        { required: true, message: 'Please input your full name!' },
                                    ]}
                                    required={false}
                                >
                                    <Input placeholder="Enter your full name" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Please input valid email!',
                                        },
                                    ]}
                                    required={false}
                                >
                                    <Input placeholder="Enter your email" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                    ]}
                                    required={false}
                                >
                                    <Input placeholder="Enter your phone" />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label="Shipping Address"
                                    rules={[
                                        { required: true, message: 'Please input your address!' },
                                    ]}
                                    required={false}
                                >
                                    <Input.TextArea
                                        rows={3}
                                        placeholder="Enter your full address"
                                    />
                                </Form.Item>

                                <Divider className={cx('divider')}>Shipping method</Divider>
                                <Form.Item
                                    name="shippingMethod"
                                    label="Shipping Method"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select shipping method!',
                                        },
                                    ]}
                                    required={false}
                                >
                                    <Select placeholder="Choose shipping method">
                                        <Option value="standard">Standard Shipping - Free</Option>
                                        <Option value="express">Express Shipping</Option>
                                        <Option value="fast">Fast Delivery</Option>
                                    </Select>
                                </Form.Item>

                                <Divider className={cx('divider')}>Payment method</Divider>
                                <Form.Item
                                    name="paymentMethod"
                                    label="Payment Method"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select payment method!',
                                        },
                                    ]}
                                    required={false}
                                >
                                    <Radio.Group>
                                        <Radio value="payos">Payment online (VNPay/MoMo)</Radio>
                                        <Radio value="cod">Cash on delivery (COD)</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={12} className={cx('col')}>
                            <Card
                                title={<Title level={4}>Order Summary</Title>}
                                className={cx('cart')}
                            >
                                {checkOutItems.map((item, i) => {
                                    return (
                                        <div className={cx('product-order')} key={i}>
                                            <div className={cx('inform')}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className={cx('img-product')}
                                                />
                                                <div className={cx('inform-detail')}>
                                                    <h3 className={cx('name-product')}>
                                                        {item.name}
                                                    </h3>
                                                    <span className={cx('color-product')}>
                                                        Color: {item.color}
                                                    </span>
                                                    <span className={cx('size-product')}>
                                                        Size: {item.size}
                                                    </span>
                                                    <span className={cx('quantity')}>
                                                        Quantity: {item.quantity}
                                                    </span>
                                                    <span className={cx('price')}>
                                                        {item.price.toLocaleString()}đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={cx('footer')}>
                                    <div className={cx('total-section')}>
                                        <h3>Order Total: {orderTotal.toLocaleString()}đ</h3>
                                    </div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        danger
                                        className={cx('checkout-btn')}
                                    >
                                        Complete Checkout
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Spin fullscreen spinning={loading} tip="Please wait..."></Spin>
        </div>
    );
}

export default Pay;
