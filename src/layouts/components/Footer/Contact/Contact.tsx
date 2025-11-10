import classNames from 'classnames/bind';
import { Row, Col, Input, ConfigProvider } from 'antd';
import { ArrowRightOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from '../Footer.module.scss';

const cx = classNames.bind(styles);
function Contact() {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col span={6} className={cx('col')}>
                    <div className={cx('item')}>
                        <h2 className={cx('title')}>Never Miss a Beat</h2>
                        <span className={cx('description')}>
                            Be the first to hear about product launches, collaborations, and more
                            when you sign up for our emails.
                        </span>
                        <div className={cx('search')}>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Input: {
                                            borderRadius: 0,
                                        },
                                    },
                                }}
                            >
                                <Input placeholder="Enter your email address... " />
                            </ConfigProvider>
                            <button className={cx('btn')}>
                                <ArrowRightOutlined style={{ color: '#fff' }} />
                            </button>
                        </div>
                        <span className={cx('description')}>
                            By signing up, you agree to receive any communications from us and you
                            have read our Privacy Policy and Terms & Conditions.
                        </span>
                    </div>
                </Col>
                <Col span={6} className={cx('col')}>
                    <div className={cx('item')}>
                        <h2 className={cx('title')}>Find a Store</h2>
                        <span className={cx('follow')}>Follow Us:</span>
                        <div className={cx('contact')}>
                            <Link to={'https://www.facebook.com/converse.vietnam/'}>
                                <FacebookOutlined className={cx('icon')} />
                            </Link>
                            <Link to={'https://www.instagram.com/converse.vn/?igshid=YmMyMTA2M2Y'}>
                                <InstagramOutlined className={cx('icon')} />
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col span={6} className={cx('col-2')}>
                    <div className={cx('item')}>
                        <h2 className={cx('title')}>Get Help</h2>
                        <ul className={cx('list')}>
                            <li className={cx('li-item')}>Contact Us</li>
                            <li className={cx('li-item')}>Order Status</li>
                            <li className={cx('li-item')}>FAQ s</li>
                            <li className={cx('li-item')}>Size Guide</li>
                            <li className={cx('li-item')}>Return Policy</li>
                        </ul>
                    </div>
                </Col>
                <Col span={6} className={cx('col-2')}>
                    <div className={cx('item')}>
                        <h2 className={cx('title')}>About Us</h2>
                        <ul className={cx('list')}>
                            <li className={cx('li-item')}>About Converse</li>
                            <li className={cx('li-item')}>Terms & Conditions</li>
                            <li className={cx('li-item')}>Privacy Policy</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Contact;
