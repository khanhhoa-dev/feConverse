import { Table, Modal, message } from 'antd';
import classNames from 'classnames/bind';
import { DoubleLeftOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';

import styles from './ManageProducts.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import type { IProductDetail } from '../../ts';
import { allProducts } from '../../services/products';
import { deleteSoftProduct } from '../../services/deleteSoftProduct';

const cx = classNames.bind(styles);

function ManageProducts() {
    const [dataProduct, setDataProduct] = useState<IProductDetail[]>([]);
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProduct = async () => {
            try {
                const data = await allProducts();
                setDataProduct(data || []);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchAllProduct();
    }, []);

    // Capitalize
    const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

    const handleCancelDelete = () => {
        setOpenModel(false);
    };

    const handleDeleteProduct = (id: string) => {
        setDeleteId(id);
        setOpenModel(true);
    };

    const handleOkDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteSoftProduct(deleteId);
            messageApi.success({
                content: 'Delete product successfully!',
                style: { fontSize: 14, fontWeight: 600 },
            });
            setDataProduct((prev) => prev.filter((item) => item._id !== deleteId));
            setOpenModel(false);
            setDeleteId(null);
        } catch (error) {
            console.log('Delete error:', error);
            message.error('Failed to delete product');
        }
    };

    const handleUpdateProduct = (slug: string) => {
        navigate(`/update/${slug}`);
    };

    const columns: TableColumnsType<IProductDetail> = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: 80,
            align: 'center',
            render: (img) => (
                <img
                    src={img}
                    alt="product"
                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 220,
            align: 'center',
            filters: dataProduct.map((p) => ({
                text: p.name,
                value: p.name,
            })),
            onFilter: (value, record) => record.name.includes(value as string),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            align: 'center',
            width: 100,
            render: (gender) => capitalize(gender),
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
                { text: 'Unisex', value: 'unisex' },
            ],
            onFilter: (value, record) => record.gender === value,
        },
        {
            title: 'Product',
            dataIndex: 'product',
            width: 120,
            align: 'center',
            render: (product) => capitalize(product),
            filters: [
                { text: 'Shoes', value: 'shoes' },
                { text: 'Clothing', value: 'clothing' },
                { text: 'Accessories', value: 'accessories' },
            ],
            onFilter: (value, record) => record.product === value,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: 120,
            align: 'center',
            sorter: (a, b) => Number(a.price.replace(/,/g, '')) - Number(b.price.replace(/,/g, '')),
            render: (price) => `${price} VNĐ`,
        },

        {
            title: 'Type',
            dataIndex: 'type',
            align: 'center',
            render: (type) => capitalize(type),
            filters: [
                { text: 'High', value: 'high' },
                { text: 'Low', value: 'low' },
                { text: 'Tee', value: 'tee' },
                { text: 'Jacket', value: 'jacket' },
                { text: 'Hoodies', value: 'hoodies' },
                { text: 'Short', value: 'short' },
                { text: 'Pant', value: 'pant' },
                { text: 'Skirt', value: 'skirt' },
                { text: 'Hats', value: 'hats' },
                { text: 'Backpacks', value: 'backpacks' },
                { text: 'Bag', value: 'bag' },
                { text: 'Others', value: 'others' },
            ],
            onFilter: (value, record) => record.type === value,
        },

        {
            title: 'Style',
            dataIndex: 'style',
            align: 'center',
            render: (type) => capitalize(type),
            filters: [
                { text: 'Chuck-70', value: 'chuck-70' },
                { text: 'Classic-chuck', value: 'classic-chuck' },
                { text: 'Skate-elevation', value: 'skate-elevation' },
                { text: 'Tops-tshirt', value: 'tops-tshirt' },
                { text: 'Pants-shorts', value: 'pants-shorts' },
                { text: 'Jacket-hoodies', value: 'jacket-hoodies' },
                { text: 'Bags-backpacks', value: 'bags-backpacks' },
                { text: 'Hats', value: 'hats' },
                { text: 'Hats', value: 'hats' },
                { text: 'Waist-bag', value: 'waist-bag' },
                { text: 'Laces', value: 'laces' },
            ],
            onFilter: (value, record) => record.style === value,
        },

        {
            title: 'View Product',
            dataIndex: '_id',
            align: 'center',
            width: 30,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <EyeOutlined
                        style={{ fontSize: 20, cursor: 'pointer' }}
                        onClick={() => navigate(`/product/detail/${record.slug}`)}
                    />
                </div>
            ),
        },
        {
            title: 'Update Product',
            dataIndex: 'slug',
            align: 'center',
            width: 30,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <EditOutlined
                        style={{ fontSize: 20, cursor: 'pointer' }}
                        onClick={() => handleUpdateProduct(record.slug)}
                    />
                </div>
            ),
        },
        {
            title: 'Delete Product',
            dataIndex: 'slug',
            align: 'center',
            width: 30,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <DeleteOutlined
                        style={{ fontSize: 20, cursor: 'pointer' }}
                        onClick={() => handleDeleteProduct(record._id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <Link to={'/'}>
                        <DoubleLeftOutlined className={cx('icon')} />
                    </Link>
                    <h1 className={cx('title-text')}>Manage products</h1>
                </div>

                <div className={cx('add-products')}>
                    <Link to={'/add/product'} className={cx('btn-add')}>
                        Add product
                    </Link>
                    <Link to={'/deleted-products'} className={cx('btn-trash')}>
                        Trash can
                    </Link>
                </div>
            </div>

            <div className={cx('container')}>
                <Table
                    className={cx('table')}
                    bordered
                    columns={columns}
                    pagination={false}
                    dataSource={dataProduct}
                    rowKey="_id"
                    footer={() => {
                        return (
                            <div className={cx('footer')}>
                                <span>Total product: {dataProduct.length}</span>
                            </div>
                        );
                    }}
                />
            </div>
            <Modal
                title="Are you sure you want to delete this product?"
                open={openModel}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
                okText="Yes, Delete it"
                cancelText="No, Keep it"
                okButtonProps={{ danger: true }}
                cancelButtonProps={{
                    style: {
                        color: 'var(--black-color)',
                        borderColor: 'var(--border-color)',
                    },
                }}
            >
                <p>This action can be undone by restoring the product later.</p>
            </Modal>
        </div>
    );
}

export default ManageProducts;
