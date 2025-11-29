import classNames from 'classnames/bind';
import { DoubleLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Popconfirm, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';

import styles from './ItemsCart.module.scss';
import { Link } from 'react-router-dom';
import * as ItemCart from '../../services/itemCart';
import { useCartItem } from '../../contexts/CartContext';
import { useLoginSelector } from '../../hooks/useAppSelector';

const cx = classNames.bind(styles);

export interface IItemCart {
    _id: string;
    userId: string;
    productId: string;
    name: string;
    quantity: number;
    price: string;
    color: string;
    image: string;
    size: string;
}
export interface GetItemCartResponse {
    dataCart: IItemCart[];
    totalCart?: number;
}

function ItemsCart() {
    const navigate = useNavigate();
    const userData = useLoginSelector();
    const [messageApi, contextHolder] = message.useMessage();
    const { setCheckOutItems, setTotalCart } = useCartItem();
    const [dataSource, setDataSource] = useState<IItemCart[] | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: ColumnsType<IItemCart> = [
        {
            title: 'Image product',
            dataIndex: 'image',
            key: 'image',
            width: 150,
            render: (image: string) => (
                <img
                    src={image}
                    alt="Image Product"
                    style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 4 }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                    }}
                />
            ),
            align: 'center',
        },
        {
            title: 'Name product',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            align: 'center',
        },
        {
            title: 'Price (VNĐ)',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => price.toLocaleString('vi-VN'),
            align: 'center',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 80,
            align: 'center',
            render: (_: any, record: IItemCart) => (
                <Popconfirm
                    title="Are you sure you want to delete this product?"
                    onConfirm={() => handleDeleteItemCart(record._id)}
                    className={cx('btn')}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{
                        style: {
                            backgroundColor: '#ef1f50',
                            borderColor: '#ef1f50',
                            color: '#fff',
                        },
                    }}
                    cancelButtonProps={{ style: { color: 'black', borderColor: ' #333' } }}
                >
                    <DeleteOutlined style={{ cursor: 'pointer', fontSize: 18 }} />
                </Popconfirm>
            ),
        },
    ];
    useEffect(() => {
        const fetchApiItem = async () => {
            try {
                const data = await ItemCart.GetItemCart(userData?.accessToken!);
                setDataSource(data.dataCart);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchApiItem();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[]) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    const handleDeleteItemCart = (id: string) => {
        ItemCart.DeleteItemCart(id, userData?.accessToken!);
        const setDataCart = dataSource?.filter((item) => item._id !== id) || [];
        setDataSource(setDataCart);
        setTotalCart(dataSource?.length!);
        messageApi.success({
            content: 'Successfully removed product from cart!',
            style: { fontWeight: 600, fontSize: 14 },
        });
    };

    const handleCheckOut = () => {
        const selectedProductCheckOut =
            dataSource?.filter((item) => selectedRowKeys.includes(item._id)) || [];

        if (selectedProductCheckOut.length === 0) {
            messageApi.warning({
                content: 'Please select product to checkout',
                style: { fontWeight: 600, fontSize: 14 },
            });
            return;
        }
        setCheckOutItems(selectedProductCheckOut);
        localStorage.setItem('checkoutProduct', JSON.stringify(selectedProductCheckOut));
        navigate('/pay');
    };

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('title')}>
                <Link to="/">
                    <DoubleLeftOutlined className={cx('icon')} />
                </Link>
                <h1 className={cx('title-text')}>Item cart</h1>
            </div>
            <div className={cx('container')}>
                <Table
                    className={cx('table')}
                    bordered={true}
                    rowSelection={rowSelection}
                    dataSource={dataSource || []}
                    columns={columns}
                    pagination={false}
                    rowKey="_id"
                    footer={() => {
                        //Lọc sản phẩm đã chọn
                        const selectedItems =
                            dataSource?.filter((item) => selectedRowKeys.includes(item._id)) || [];
                        const totalPrice =
                            selectedItems?.reduce((sum, item) => {
                                const numericPrice = Number(item.price.replace(/,/g, ''));
                                return sum + numericPrice * item.quantity;
                            }, 0) || 0;

                        return (
                            <div className={cx('footer-table')}>
                                <span className={cx('total')}>
                                    Total items: {selectedRowKeys.length}
                                </span>
                                <span className={cx('total')}>
                                    Total price: {totalPrice.toLocaleString('vi-VN')} VNĐ
                                </span>
                                <div className={cx('check-out')}>
                                    <Button danger type="primary" onClick={() => handleCheckOut()}>
                                        Check out
                                    </Button>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}

export default ItemsCart;
