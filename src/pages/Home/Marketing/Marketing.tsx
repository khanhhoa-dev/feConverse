import classNames from 'classnames/bind';
import { Row, Col } from 'antd';
import {
    InteractionOutlined,
    TruckOutlined,
    FacebookOutlined,
    InstagramOutlined,
} from '@ant-design/icons';

import styles from './Marketing.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Marketing() {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col span={8} className={cx('col')}>
                    <div className={cx('marketing')}>
                        <TruckOutlined className={cx('icon')} />
                        <h2 className={cx('title')}>Fast, Free Shipping</h2>
                        <span className={cx('description')}>
                            Free Shipping on every order nationwide.
                        </span>
                        <Link to={'/shipping'} className={cx('link')}>
                            <span>Learn More</span>
                        </Link>
                    </div>
                </Col>
                <Col span={8} className={cx('col')}>
                    <div className={cx('marketing')}>
                        <InteractionOutlined className={cx('icon')} />
                        <h2 className={cx('title')}>Worry-Free Returns</h2>
                        <span className={cx('description')}>Terms & conditions apply</span>
                        <Link to={'/return-policy'} className={cx('link')}>
                            <span>Learn More</span>
                        </Link>
                    </div>
                </Col>
                <Col span={8} className={cx('col')}>
                    <div className={cx('marketing')}>
                        <div className={cx('contact')}>
                            <Link to={'https://www.facebook.com/converse.vietnam/'}>
                                <FacebookOutlined className={cx('icon')} />
                            </Link>
                            <Link to={'https://www.instagram.com/converse.vn/?igshid=YmMyMTA2M2Y'}>
                                <InstagramOutlined className={cx('icon')} />
                            </Link>
                        </div>
                        <h2 className={cx('title')}>Follow Us</h2>
                        <span className={cx('description')}>
                            Keep up with the latest Converse news on our social channels.
                        </span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Marketing;
