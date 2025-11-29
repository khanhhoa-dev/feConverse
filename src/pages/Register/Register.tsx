import classNames from 'classnames/bind';
import { Form, Input, Row, Col, Select, Button, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchRegister } from '../../stores/Slices/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import styles from './Register.module.scss';

export interface IRegister {
    firstname: string;
    lastname: string;
    username: string;
    gender: string;
    email: string;
    password: string;
}

const cx = classNames.bind(styles);
function Register() {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = useCallback(
        (values: IRegister) => {
            dispatch(fetchRegister(values));
            form.resetFields();
            messageApi.success({
                content: 'Register Successfully!',
                style: { fontSize: 14, fontWeight: 600 },
            });
            navigate('/');
        },
        [form]
    );

    const onFinishFailed = useCallback((errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img
                    src="https://www.converse.vn/media/wysiwyg/signup_banner.jpg"
                    alt="Banner Create Account"
                    className={cx('image')}
                />
                <h2 className={cx('title')}>Create An Account</h2>
                <p className={cx('description')}>
                    With your Converse account, enjoy free shipping and returns, a faster checkout,
                    and a more personalized experience. You can even save your favorites as you
                    shop, and access new releases and special offers.
                </p>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                name="register"
                layout="vertical"
                className={cx('form')}
            >
                <Row>
                    {contextHolder}
                    <Col span={24} className={cx('col')}>
                        <h1 className={cx('title-register')}>Register</h1>
                        <Form.Item
                            label="First name:"
                            name="firstname"
                            rules={[{ required: true, message: 'Please enter your firstname!' }]}
                            required={false}
                        >
                            <Input placeholder="Enter fistname" className={cx('field')} />
                        </Form.Item>
                        <Form.Item
                            label="Last name:"
                            name="lastname"
                            rules={[{ required: true, message: 'Please enter your lastname!' }]}
                            required={false}
                        >
                            <Input placeholder="Enter lastname" className={cx('field')} />
                        </Form.Item>
                        <Form.Item
                            label="Username:"
                            name="username"
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                            required={false}
                        >
                            <Input placeholder="Enter username" className={cx('field')} />
                        </Form.Item>
                        <Form.Item
                            label="Gender:"
                            name="gender"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                            required={false}
                        >
                            <Select
                                placeholder="Select gender"
                                className={cx('field')}
                                options={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email:"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Invalid email!' },
                            ]}
                            required={false}
                        >
                            <Input placeholder="Enter email" className={cx('field')} />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number:"
                            name="phonenumber"
                            rules={[{ required: true, message: 'Please enter your phone number!' }]}
                            required={false}
                        >
                            <Input className={cx('field')} placeholder="Enter your phone number" />
                        </Form.Item>
                        <Form.Item
                            label="Password:"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                            required={false}
                        >
                            <Input.Password
                                className={cx('field')}
                                placeholder="Enter your password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                className={cx('btn-submit')}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Register;
