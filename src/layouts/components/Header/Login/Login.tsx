import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Space, Dropdown, type MenuProps, message, Spin } from 'antd';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import type { ILoginError } from '../../../../stores/Slices/authSlice';
import { fetchLogin, fetchLogout } from '../../../../stores/Slices/authSlice';
import { useLoginSelector, useAccessToken } from '../../../../hooks/useAppSelector';
import { type MenuItem, CustomerMenuKey, CUSTOMER_MENU } from '../../../../data/customerMenu';

const cx = classNames.bind(styles);

export interface ILogin {
    username: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userData = useLoginSelector();
    const accessToken = useAccessToken();
    const [form] = Form.useForm<ILogin>();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);

    const onFinish = useCallback(
        async (values: ILogin) => {
            try {
                setLoading(true);
                await dispatch(fetchLogin(values)).unwrap();
                setLoading(false);
                form.resetFields();
                messageApi.success({
                    content: 'Login Successfully!',
                    style: {
                        fontSize: 14,
                        fontWeight: 600,
                    },
                });
                setIsLoginVisible(false);
                navigate('/');
            } catch (error) {
                const err = error as ILoginError;
                form.setFields([
                    {
                        name: err.field,
                        errors: [err.message],
                    },
                ]);
                setLoading(false);
            }
        },
        [form]
    );

    const onFinishFailed = useCallback((errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }, []);

    const handleOnClickShow = useCallback(() => {
        if (!userData) {
            form.resetFields();
            setIsLoginVisible(true);
        } else {
            setIsLoginVisible(false);
        }
    }, [userData]);

    const filteredMenu = Object.values(CUSTOMER_MENU).filter((item: MenuItem) => {
        //Authorization
        if (userData?.admin) {
            return item.requiredRole?.includes('admin');
        } else {
            return item.requiredRole?.includes('user');
        }
    });

    const handleMenuClick = useCallback(
        async ({ key }: { key: React.Key }) => {
            const item = CUSTOMER_MENU[key as CustomerMenuKey];
            if (item && item.route) {
                navigate(item.route);
            } else if (key === CustomerMenuKey.Logout) {
                await dispatch(fetchLogout(accessToken!));
                form.resetFields();
                messageApi.success({
                    content: 'Logout Successfully!',
                    style: {
                        fontSize: 14,
                        fontWeight: 600,
                    },
                });
                navigate('/');
            }
        },
        [navigate]
    );

    const menuItems: MenuProps['items'] = filteredMenu.map((item: MenuItem) => ({
        key: item.key,
        label: item.label,
    }));

    return (
        <>
            <div className={cx('login')} onClick={handleOnClickShow}>
                {contextHolder}
                {userData ? (
                    <Dropdown
                        menu={{
                            items: menuItems,
                            onClick: handleMenuClick,
                        }}
                        trigger={['hover']}
                        overlayStyle={{
                            width: '220px',
                            minWidth: '200px',
                            marginTop: '10px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <h1 className={cx('text-login')}>Hey, {userData.firstname}</h1>
                            <UserOutlined className={cx('icon-user')} />
                        </div>
                    </Dropdown>
                ) : (
                    <>
                        <h1 className={cx('text-login')}>Login</h1>
                        <UserOutlined className={cx('icon-user')} />
                    </>
                )}
            </div>
            <Modal
                title={
                    <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                        <Link to={''}>
                            <img
                                className={cx('image-logo')}
                                src="https://www.converse.vn/static/version1758555983/frontend/Converse/vietnam/en_US/images/converse.svg"
                                alt="logo-converse"
                                title="Logo-Converse"
                                style={{ width: 120 }}
                            />
                        </Link>
                    </Space>
                }
                open={isLoginVisible}
                onCancel={() => {
                    setIsLoginVisible(false);
                }}
                footer={null}
                width={400}
                centered
                styles={{
                    body: { padding: '20px' },
                    mask: { backgroundColor: 'rgba(0,0,0,0.5)' },
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <h2 className={cx('title-login')}>Sign In</h2>
                    <p style={{ color: 'rgba(0,0,0,.45)', margin: '8px 0 0 0', fontSize: '14px' }}>
                        To get the most out of converse.vn, enter your account email address and
                        password below.
                    </p>
                </div>

                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{ maxWidth: 300, margin: '0 auto' }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        required={false}
                    >
                        <Input className={cx('input-login')} placeholder="Enter your username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        required={false}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            className={cx('input-login')}
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ height: 40, backgroundColor: '#000', borderColor: '#000' }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                        Don’t have an account yet?
                        <Link
                            to="/account/register"
                            onClick={() => setIsLoginVisible(false)}
                            style={{ color: '#333', margin: 1, textDecoration: 'underline' }}
                        >
                            Sign Up
                        </Link>
                        <br />
                        <Link
                            to="/forgot-password"
                            onClick={() => setIsLoginVisible(false)}
                            style={{ color: '#333', textDecoration: 'underline' }}
                        >
                            Forgot your password?
                        </Link>
                    </Form.Item>
                </Form>
                <Spin fullscreen spinning={loading}></Spin>
            </Modal>
        </>
    );
}

export default Login;
