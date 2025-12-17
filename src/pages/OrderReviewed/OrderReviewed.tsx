import { Spin, Tag, Button } from 'antd';
import { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';

import * as OrderInfo from '../../services/orderDetail';
import type { IItemCart } from '../ItemsCart/ItemsCart';
import { useCartItem } from '../../contexts/CartContext';
import type { IOrderDetail, ICheckOutItem } from '../../ts';
import TableCustom from '../../components/Table/TableCustom';
import { useLoginSelector, useAccessToken } from '../../hooks/useAppSelector';

function OrderReviewed() {
    const navigate = useNavigate();
    const userData = useLoginSelector();
    const accessToken = useAccessToken();
    const { setCheckOutItems } = useCartItem();
    const [loading, setLoading] = useState<boolean>(false);
    const [reviewOrder, setReviewedOrder] = useState<IOrderDetail[]>([]);

    const userId = userData?._id as string;
    useEffect(() => {
        if (!userId) return;
        const fetchReviewedOrder = async () => {
            try {
                setLoading(true);
                const result = await OrderInfo.orderReviewed(accessToken as string, userId);
                setLoading(false);
                setReviewedOrder(result);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchReviewedOrder();
    }, []);

    const handleOrderAcquisition = async (data: IOrderDetail) => {
        setLoading(true);
        const dataCheckout = data.items.map((item) => ({
            ...item,
            price: item.price.toLocaleString(),
        }));
        const items: IItemCart[] = dataCheckout;
        setCheckOutItems(items);
        setLoading(false);
        navigate('/pay');
    };

    const columns: TableColumnsType<IOrderDetail> = [
        {
            title: 'STT',
            width: 60,
            align: 'center',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Order code',
            dataIndex: 'orderCode',
            width: 140,
            align: 'center',
            render: (code) => <strong>{code}</strong>,
        },
        {
            title: 'Product',
            dataIndex: 'items',
            width: 300,
            align: 'center',
            render: (items: ICheckOutItem[]) => (
                <div>
                    {items.map((item) => (
                        <div
                            key={item._id}
                            style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
                        >
                            <img
                                src={item?.image}
                                alt="Image Product"
                                style={{
                                    width: 60,
                                    height: 60,
                                    objectFit: 'contain',
                                    borderRadius: 8,
                                    marginRight: 10,
                                }}
                            />
                            <p style={{ width: 160, margin: 0 }}>
                                {item.name} ({item.color} - Size {item.size})
                            </p>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'items',
            width: 80,
            align: 'center',
            render: (items: any[]) => items.reduce((sum, item) => sum + item.quantity, 0),
        },
        {
            title: 'Total order',
            dataIndex: 'total',
            width: 130,
            align: 'center',
            render: (total: number) => <span>{total.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Order status',
            dataIndex: 'isReviewed',
            width: 160,
            align: 'center',
            render: (review: boolean) => {
                let color = 'default';
                let text = '';
                if (review === true) {
                    color = 'green';
                    text = 'Reviewed';
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Order acquisition',
            dataIndex: 'orderCode',
            align: 'center',
            width: 140,
            render: (_, record) => {
                return (
                    <>
                        <Button
                            danger
                            type="primary"
                            size="small"
                            style={{ width: 90, height: 30 }}
                            onClick={() => handleOrderAcquisition(record)}
                        >
                            Acquisition
                        </Button>
                    </>
                );
            },
        },
    ];

    const pageConfig = {
        title: 'Order canceled',
        backTo: '/order-detail',
    };

    return (
        <>
            <TableCustom columns={columns} data={reviewOrder} pageConfig={pageConfig} />
            <Spin spinning={loading} fullscreen></Spin>
        </>
    );
}

export default OrderReviewed;
