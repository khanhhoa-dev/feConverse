import { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Spin, Select, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import * as Users from '../../services/users';
import { useAccessToken } from '../../hooks/useAppSelector';
import TableCustom from '../../components/Table/TableCustom';

export interface IInformUser {
    _id: string;
    username: string;
    email: string;
    gender: string;
    phonenumber: number;
    admin: boolean;
    createdAt: Date;
}

function ManagerUsers() {
    const accessToken = useAccessToken();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [idDeleteUser, setIdDeleteUser] = useState<string>('');
    const [usersData, setUsersData] = useState<IInformUser[]>([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                setLoading(true);
                const result = await Users.AllUser(accessToken!);
                setLoading(false);
                setUsersData(result);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchUsersData();
    }, []);

    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const handleOkDelete = async () => {
        if (!idDeleteUser) return;
        setLoading(true);
        //Call API
        await Users.DeleteUsers(accessToken as string, idDeleteUser);
        setLoading(false);
        messageApi.success({
            content: 'Delete user successfully!',
            style: { fontSize: 14, fontWeight: 600 },
        });
        setOpenModel(false);
        setUsersData((prev) => prev?.filter((item) => item._id !== idDeleteUser)!);
    };
    const handleCancelDelete = () => {
        setOpenModel(false);
    };

    const handleDeleteUser = (_id: string) => {
        setOpenModel(true);
        setIdDeleteUser(_id);
    };
    const handleUpdateRole = async (_id: string, dataUpdate: boolean) => {
        //Call API
        await Users.UpdateRoleUser(accessToken as string, dataUpdate, _id);
    };

    const columns: TableColumnsType<IInformUser> = [
        {
            title: 'STT',
            dataIndex: 'index',
            width: 40,
            align: 'center',
            render: (_, __, index: number) => index + 1,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            width: 220,
            align: 'center',
            filters: usersData?.map((p) => ({
                text: p.username,
                value: p.username,
            })),
            onFilter: (value, record) => record.username.includes(value as string),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 120,
            align: 'center',
            render: (email) => email,
        },
        {
            title: 'Role',
            dataIndex: 'admin',
            width: 120,
            align: 'center',
            render: (admin: boolean, record) => (
                <Select
                    defaultValue={admin}
                    bordered={false}
                    style={{ width: 110 }}
                    options={[
                        { label: 'Admin', value: true },
                        { label: 'User', value: false },
                    ]}
                    onChange={(value) => handleUpdateRole(record._id, value)}
                />
            ),
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
            ],
            onFilter: (value, record) => record.gender === value,
        },

        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            width: 120,
            align: 'center',
            render: (price) => `0${price}`,
        },
        {
            title: 'Date of creation',
            dataIndex: 'createdAt',
            width: 120,
            align: 'center',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (createdAt) => new Date(createdAt).toLocaleString(),
        },
        {
            title: 'Delete User',
            dataIndex: 'id',
            align: 'center',
            width: 50,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <DeleteOutlined
                        style={{ fontSize: 20, cursor: 'pointer' }}
                        onClick={() => handleDeleteUser(record._id)}
                    />
                </div>
            ),
        },
    ];

    const pageConfig = {
        title: 'Manager user',
        backTo: '/',
    };

    return (
        <>
            <TableCustom
                columns={columns}
                data={usersData}
                contextHolder={contextHolder}
                pageConfig={pageConfig}
            />
            <Spin spinning={loading} fullscreen></Spin>
            <Modal
                title="Are you sure you want to delete this user?"
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
                <p>This action can be undone by restoring the user later.</p>
            </Modal>
        </>
    );
}

export default ManagerUsers;
