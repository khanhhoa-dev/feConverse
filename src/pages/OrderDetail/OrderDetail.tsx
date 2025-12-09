import { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Spin, Modal, message, Tag, Popconfirm, Button, Rate, Typography } from 'antd';

import type { IOrderDetail } from '../../ts';
import * as OrderInfo from '../../services/orderDetail';
import TableCustom from '../../components/Table/TableCustom';
import { useLoginSelector } from '../../hooks/useAppSelector';

const { Text } = Typography;
function OrderDetail() {
    const userData = useLoginSelector();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [userOrderInfo, setUserOrderInfo] = useState<IOrderDetail[]>([]);

    const accessToken = userData?.accessToken as string;
    const userId = userData?._id as string;
    useEffect(() => {
        if (!userId) return;
        const fetchUserOrderInfo = async () => {
            try {
                setLoading(true);
                const result = await OrderInfo.orderDetail(accessToken, userId);
                setLoading(false);
                setUserOrderInfo(result);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchUserOrderInfo();
    }, []);

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
            title: 'Image',
            dataIndex: 'items',
            width: 100,
            align: 'center',
            render: (items: any[]) => (
                <img
                    src={items[0]?.image}
                    alt="product"
                    style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8 }}
                />
            ),
        },
        {
            title: 'Product name',
            dataIndex: 'items',
            width: 200,
            align: 'center',
            render: (items: any[]) => (
                <div>
                    {items.map((item) => (
                        <div key={item._id}>
                            {item.name} ({item.color} - Size {item.size})
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
            title: 'Status',
            dataIndex: 'orderStatus',
            width: 160,
            align: 'center',
            render: (status: string) => {
                let color = 'default';
                let text = status;
                if (status === 'paid') {
                    color = 'green';
                    text = 'Delivered';
                } else if (status === 'pending') {
                    color = 'yellow';
                    text = 'Waiting for confirmation';
                } else if (status === 'transport') {
                    color = 'blue';
                    text = 'Transported';
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Order date',
            dataIndex: 'createdAt',
            width: 140,
            align: 'center',
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Cancel order',
            dataIndex: 'orderCode',
            align: 'center',
            width: 140,
            render: (id, record) => {
                if (record.orderStatus === 'paid') {
                    return (
                        <>
                            <Button
                                danger
                                type="primary"
                                size="small"
                                style={{ width: 90, height: 30 }}
                            >
                                Reviews
                            </Button>

                            <Modal
                                title="Product reviews"
                                open={false}
                                // onOk={handleSubmitReview}
                                // onCancel={() => setOpenRate(false)}
                                okText="Submit a review"
                                cancelText="Cancel"
                                confirmLoading={loading}
                                // okButtonProps={{ disabled: rating === 0 }}
                            >
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <Text
                                        strong
                                        style={{ fontSize: 16, display: 'block', marginBottom: 16 }}
                                    >
                                        Are you satisfied with this product?
                                    </Text>
                                    {record.items.map((item: any) => (
                                        <div key={item._id} style={{ marginBottom: 16 }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 8,
                                                    marginRight: 12,
                                                }}
                                            />
                                            <Text>
                                                {item.name} ({item.color} - Size {item.size})
                                            </Text>
                                        </div>
                                    ))}

                                    <Rate allowHalf style={{ fontSize: 40 }} />
                                </div>
                            </Modal>
                        </>
                    );
                } else if (record.orderStatus === 'pending') {
                    return (
                        <Popconfirm
                            title="Are you sure you want to cancel this order?"
                            okText="Yes, cancel order"
                            cancelText="No"
                            okButtonProps={{ danger: true }}
                        >
                            <Button
                                danger
                                type="primary"
                                size="small"
                                style={{ width: 90, height: 30 }}
                            >
                                Cancel order
                            </Button>
                        </Popconfirm>
                    );
                } else if (record.orderStatus === 'transport') {
                    return (
                        <Button type="primary" disabled style={{ width: 90, height: 30 }}>
                            Cancel order
                        </Button>
                    );
                }
            },
        },
    ];

    const pageConfig = {
        title: 'Order detail',
        backTo: '/',
    };

    return (
        <>
            <TableCustom
                columns={columns}
                data={userOrderInfo}
                pageConfig={pageConfig}
                contextHolder={contextHolder}
            />
            <Spin spinning={loading} fullscreen></Spin>
        </>
    );
}

export default OrderDetail;
