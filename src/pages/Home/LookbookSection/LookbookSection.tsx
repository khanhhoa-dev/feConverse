import { Row, Col } from 'antd';
import classNames from 'classnames/bind';

import styles from './LookbookSection.module.scss';
const cx = classNames.bind(styles);

const LookbookSection = () => {
    return (
        <section className={cx('wrapper')}>
            <h1 className={cx('title')}>How to Style Your RST</h1>
            <Row>
                <Col span={6}>
                    <div className={cx('img-right')}>
                        <img
                            className={cx('img-top')}
                            src="https://bo.converse.id/media/wysiwyg/con_rst/ig-post1.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('img-right')}>
                        <img
                            className={cx('img-bottom')}
                            src="https://bo.converse.id/media/wysiwyg/con_rst/ig-post2.png"
                            alt=""
                        />
                    </div>
                </Col>
                <Col span={6}>
                    <div className={cx('img-center')}>
                        <img
                            className={cx('img-mid')}
                            src="https://bo-aws-staging.converse.id/media/wysiwyg/spc_conv/ig-post3.png"
                            alt=""
                        />
                    </div>
                </Col>
                <Col span={6}>
                    <div className={cx('img-center')}>
                        <img
                            className={cx('img-mid')}
                            src="https://bo.converse.id/media/wysiwyg/con_rst/ig-post4.png"
                            alt=""
                        />
                    </div>
                </Col>
                <Col span={6}>
                    <div className={cx('img-left')}>
                        <img
                            className={cx('img-top')}
                            src="https://bo.converse.id/media/wysiwyg/con_rst/ig-post5.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('img-left')}>
                        <img
                            className={cx('img-bottom')}
                            src="https://bo.converse.id/media/wysiwyg/con_rst/ig-post6.png"
                            alt=""
                        />
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default LookbookSection;
