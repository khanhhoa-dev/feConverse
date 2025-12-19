import { Spin, Tag, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';

import * as OrderInfo from '../../services/orderDetail';
import { updateStatus } from '../../services/orderDetail';
import type { IOrderDetail, ICheckOutItem } from '../../ts';
import TableCustom from '../../components/Table/TableCustom';
import { useAccessToken, useLoginSelector } from '../../hooks/useAppSelector';

function OrderManage() {
    const accessToken = useAccessToken();
    const userData = useLoginSelector();
    const [loading, setLoading] = useState<boolean>(false);
    const [dataOrderAll, setDataOrderAll] = useState<IOrderDetail[]>([]);

    useEffect(() => {
        const fetchOrderAll = async () => {
            try {
                setLoading(true);
                const result = await OrderInfo.orderAll(accessToken as string);
                setLoading(false);
                setDataOrderAll(result);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchOrderAll();
    }, []);
    const userId = userData?._id;
    // Lọc userId
    const itemsFilter = dataOrderAll.flatMap((data) => data.items.map((item) => item.userId));
    // Loại bỏ trùng lặp
    const uniqueUserIds = [...new Set(itemsFilter)];
    const userFilters = uniqueUserIds.map((id) => ({
        text: id.slice(-6),
        value: id,
    }));

    const handleChangeStatus = async (status: string, orderId: number) => {
        // Cập nhật trạng thái đơn hàng
        await updateStatus(accessToken as string, status, orderId, userId as string);
    };

    const columns: TableColumnsType<IOrderDetail> = [
        {
            title: 'User ID',
            dataIndex: 'items',
            width: 140,
            align: 'center',
            render: (items: ICheckOutItem[]) => {
                const userId = items[0].userId;
                const shortUserId = userId.slice(-6);
                return <strong title={userId}>{shortUserId}</strong>;
            },
            filters: userFilters,
            onFilter: (value, record) => record.items.some((item) => item.userId === value),
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
            sorter: (a, b) => a.total - b.total,
            render: (total: number) => <span>{total.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Order status',
            dataIndex: 'orderStatus',
            align: 'center',
            render: (status: string, record) => {
                const orderId = record.orderCode;
                return (
                    <Select
                        defaultValue={status.toUpperCase()}
                        style={{ width: 180 }}
                        bordered={false}
                        onChange={(value) => handleChangeStatus(value, orderId)}
                        options={[
                            { value: 'pending', label: 'Waiting for confirmation' },
                            { value: 'confirmed', label: 'Confirmed' },
                            { value: 'shipping', label: 'Shipping' },
                            { value: 'paid', label: 'Delivered' },
                            { value: 'canceled', label: 'Cancel' },
                        ]}
                    />
                );
            },
        },
        {
            title: 'Payment status',
            dataIndex: 'paymentStatus',
            width: 180,
            align: 'center',
            render: (statusPayment: string) => {
                let color = 'default';
                let text = statusPayment;
                if (statusPayment === 'pending') {
                    ((color = 'yellow'), (text = 'Unpaid'));
                } else if (statusPayment === 'paid') {
                    color = 'green';
                    text = 'Paid';
                } else if (statusPayment === 'fail') {
                    color = 'red';
                    text = 'Payment Error';
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Order date',
            dataIndex: 'createdAt',
            width: 140,
            align: 'center',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
    ];

    const pageConfig = {
        title: 'Manage order',
        backTo: '/',
    };

    return (
        <>
            <TableCustom columns={columns} data={dataOrderAll} pageConfig={pageConfig} />
            <Spin spinning={loading} fullscreen></Spin>
        </>
    );
}

export default OrderManage;
