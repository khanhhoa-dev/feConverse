import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import Contact from './Contact/Contact';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <>
            <Contact />
            <div className={cx('copyright')}>
                <p className={cx('text')}>
                    © Copyright 2023 Magna Management Asia (MMA) Co., Ltd. All rights reserved.
                </p>
                <p className={cx('text')}>
                    Address: Unit14-02, 14th Floor, Lottery Tower, 77 Tran Nhan Ton, Ward 09,
                    District 5, HCMC, Viet Nam | Tax code: 0314853023 | Hotline: 028.38301111 Ext. 0
                </p>
            </div>
            <div className={cx('checkout-copyright')}>
                <div className={cx('right-copyright')}>
                    <img
                        className={cx('image')}
                        src="https://www.converse.vn/media/wysiwyg/VN_Flag.jpg"
                        alt="Flag VietNamese"
                    />
                    <span className={cx('text')}>VN</span>
                </div>
                <span className={cx('left-copyright')}>©2024 Converse</span>
            </div>
        </>
    );
}

export default Footer;
