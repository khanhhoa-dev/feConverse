import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Space } from 'antd';

import styles from '../Header.module.scss';

interface LoginProps {
    UserLogin?: boolean;
}

const cx = classNames.bind(styles);

function Login({ UserLogin }: LoginProps) {
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);
    const onFinish = (values: { email: string; password: string }) => {
        console.log('Login values:', values);
        setIsLoginVisible(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnClickShow = () => {
        {
            UserLogin ? setIsLoginVisible(false) : setIsLoginVisible(true);
        }
    };
    return (
        <>
            <div className={cx('login')} onClick={handleOnClickShow}>
                {UserLogin ? (
                    <h1 className={cx('text-login')}>Hey, Lê</h1>
                ) : (
                    <h1 className={cx('text-login')}>Login</h1>
                )}
                <UserOutlined className={cx('icon-user')} />
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
                                style={{ width: 120 }} // Làm logo nhỏ hơn cho form bé
                            />
                        </Link>
                    </Space>
                }
                open={isLoginVisible}
                onCancel={() => setIsLoginVisible(false)}
                footer={null}
                width={400}
                centered
                bodyStyle={{ padding: '20px' }}
                maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <h2 style={{ margin: 0, fontSize: '24px' }}>Sign In</h2>
                    <p style={{ color: 'rgba(0,0,0,.45)', margin: '8px 0 0 0', fontSize: '14px' }}>
                        To get the most out of converse.vn, enter your account email address and
                        password below.
                    </p>
                </div>
                <Form
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{ maxWidth: 300, margin: '0 auto' }}
                >
                    <Form.Item
                        label="Email *"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Invalid email!' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password *"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
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
                            to="/signup"
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
