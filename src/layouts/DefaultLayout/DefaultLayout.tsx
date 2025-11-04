import classNames from 'classnames/bind';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './DefaultLayout.module.scss';
import type { LayoutProps } from '../../ts';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: LayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
