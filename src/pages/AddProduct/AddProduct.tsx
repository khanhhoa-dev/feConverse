import classNames from 'classnames/bind';
import { Form, Input, Select, Space, Switch, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './AddProduct.module.scss';
import type { IProductDetail } from '../../ts/index';
import { createProduct } from '../../services/createProduct';

const cx = classNames.bind(styles);
const { TextArea } = Input;
function AddProduct() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        //Format data size from string to array
        const formatData: IProductDetail = {
            ...values,
            variant: values.variant.map((variant: any) => {
                return {
                    ...variant,
                    size: variant.size.split(',').map((size: string) => size.trim()),
                };
            }),
        };

        //Call API create product
        createProduct(formatData);
        navigate(`/products/${formatData.product}`);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Add Product</h1>
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
                        <Input placeholder="Enter product name..." />
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
                    <Form.Item>
                        <Button
                            type="primary"
                            danger
                            htmlType="submit"
                            block
                            style={{ marginTop: '20px' }}
                        >
                            Add Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;
