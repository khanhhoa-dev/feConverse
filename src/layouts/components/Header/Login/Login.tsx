import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Space, Dropdown, type MenuProps } from 'antd';
import styles from './Login.module.scss';

import { type MenuItem, CustomerMenuKey, CUSTOMER_MENU } from '../../../../data/customerMenu';
import { useUser } from '../../../../contexts/UserContext';

const cx = classNames.bind(styles);

function Login() {
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);
    const [form] = Form.useForm<{ email: string; password: string }>();
    const navigate = useNavigate();
    const { role, setRole, LoginIn } = useUser();

    // Optimize onFinish để tránh re-render thừa
    const onFinish = useCallback(
        (values: { email: string; password: string }) => {
            console.log('Login values:', values);
            setRole('admin');
            form.resetFields();
            setIsLoginVisible(false);
        },
        [form, setRole]
    );

    const onFinishFailed = useCallback((errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }, []);

    const handleOnClickShow = useCallback(() => {
        LoginIn ? setIsLoginVisible(false) : setIsLoginVisible(true);
    }, [LoginIn]);

    const filteredMenu = Object.values(CUSTOMER_MENU).filter((item: MenuItem) => {
        if (!item.requiredRole) return true;
        return item.requiredRole.includes(role);
    });

    const handleMenuClick = useCallback(
        ({ key }: { key: React.Key }) => {
            const item = CUSTOMER_MENU[key as CustomerMenuKey];
            if (item && item.route) {
                navigate(item.route);
            } else if (key === CustomerMenuKey.Logout) {
                localStorage.removeItem('token');
                setRole('user');
                navigate('/');
            }
        },
        [navigate, setRole]
    );

    const menuItems: MenuProps['items'] = filteredMenu.map((item: MenuItem) => ({
        key: item.key,
        label: item.label,
    }));

    return (
        <>
            <div className={cx('login')} onClick={handleOnClickShow}>
                {LoginIn ? (
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
                            <h1 className={cx('text-login')}>Hey, Lê</h1>
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
                onCancel={() => setIsLoginVisible(false)}
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
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Invalid email!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            className={cx('input-login')}
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
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
            </Modal>
        </>
    );
}

export default Login;
