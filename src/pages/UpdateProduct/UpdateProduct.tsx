import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Form, Input, Select, Space, Switch, Button, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DoubleLeftOutlined } from '@ant-design/icons';

import type { IProductDetail } from '../../ts';
import * as DetailProduct from '../../services/detailProduct';
import styles from './UpdateProduct.module.scss';
import * as UpdateProductService from '../../services/updateProduct';

const cx = classNames.bind(styles);
const { TextArea } = Input;
function UpdateProduct() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [productData, setProductData] = useState<IProductDetail | null>(null);

    useEffect(() => {
        if (!slug) {
            return;
        }
        const fetchProductData = async () => {
            const data = await DetailProduct.detail(slug as string);
            setProductData(data);
        };
        fetchProductData();
    }, [slug]);

    // Đổ dữ liệu vào form khi productData thay đổi
    useEffect(() => {
        if (productData) {
            form.setFieldsValue(productData);
        }
    }, [productData, form]);

    // Xử lý khi submit form
    const onFinish = (values: IProductDetail) => {
        console.log('Form values:', values);
        if (!slug) {
            return;
        }
        UpdateProductService.updateProduct(slug, values);
        messageApi.success({
            content: 'Product updated successfully!',
            duration: 4,
            style: {
                fontSize: '1.4rem',
                fontWeight: '600',
            },
        });
        navigate(`/product/detail/${slug}`);
    };

    // Xử lý khi submit form thất bại
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>
                <Link to={`/product/detail/${slug}`}>
                    <DoubleLeftOutlined className={cx('icon-arrow')} />
                </Link>
                Update Product
            </h1>
            <div className={cx('form-container')}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name-Product:"
                        name="name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                        required={false}
                    >
                        <Input placeholder="Enter product name..." value={productData?.name} />
                    </Form.Item>
                    <Form.Item
                        label="Price-Product:"
                        name="price"
                        rules={[{ required: true, message: 'Please enter product price' }]}
                        required={false}
                    >
                        <Input placeholder="Enter product price..." />
                    </Form.Item>
                    <Form.Item
                        label="Gender:"
                        name="gender"
                        rules={[{ required: true, message: 'Please enter gender' }]}
                        required={false}
                    >
                        <Select
                            placeholder="Select gender..."
                            options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Unisex', value: 'unisex' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Title-Product:"
                        name="title"
                        rules={[{ required: true, message: 'Please enter product title' }]}
                        required={false}
                    >
                        <TextArea rows={2} placeholder="Enter product title..." />
                    </Form.Item>
                    <Form.Item
                        label="Style-Product:"
                        name="style"
                        required={false}
                        rules={[{ required: true, message: 'Please enter style' }]}
                    >
                        <Input placeholder="Enter product style..." />
                    </Form.Item>
                    <Form.Item
                        label="Type-Product:"
                        name="type"
                        rules={[{ required: true, message: 'Please enter type' }]}
                        required={false}
                    >
                        <Input placeholder="Enter product name..." />
                    </Form.Item>
                    <Form.Item
                        label="Product:"
                        name="product"
                        rules={[{ required: true, message: 'Please product' }]}
                        required={false}
                    >
                        <Input placeholder="Enter product product..." />
                    </Form.Item>
                    <Form.Item
                        label="Image-Product:"
                        name="image"
                        rules={[{ required: true, message: 'Please enter product image' }]}
                        required={false}
                    >
                        <Input placeholder="Enter product image..." />
                    </Form.Item>
                    <Form.Item
                        label="Description-Product:"
                        name="description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                        required={false}
                    >
                        <TextArea rows={4} placeholder="Enter product description..." />
                    </Form.Item>
                    <Form.Item
                        label="Featured-Product:"
                        name="featured"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                    <Form.List name="variant">
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {fields.map(({ key, name, ...restField }) => {
                                        return (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'color']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter color',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter color..."
                                                        className={cx('input')}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'img_detail']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter image...',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter link image..."
                                                        className={cx('input')}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'size']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter size',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="37,38,39,40,41,42"
                                                        className={cx('input')}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'quantity']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please quantity',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter quantity..."
                                                        className={cx('input')}
                                                    />
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{
                                                        marginBottom: '30px',
                                                        marginLeft: '10px',
                                                    }}
                                                />
                                            </Space>
                                        );
                                    })}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            className={cx('add-variant-btn')}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Variant Product
                                        </Button>
                                    </Form.Item>
                                </>
                            );
                        }}
                    </Form.List>
                    {contextHolder}
                    <Form.Item>
                        <Button
                            type="primary"
                            danger
                            htmlType="submit"
                            block
                            style={{ marginTop: '20px' }}
                        >
                            Update Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default UpdateProduct;
