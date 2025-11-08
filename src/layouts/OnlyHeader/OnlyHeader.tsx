import classNames from 'classnames/bind';

import Header from '../components/Header/Header';
import type { LayoutProps } from '../../ts';
import styles from './OnlyHeader.module.scss';

const cx = classNames.bind(styles);
function OnlyHeader({ children }: LayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <Header isToggle />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default OnlyHeader;
