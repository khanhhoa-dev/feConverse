import classNames from 'classnames/bind';
import type { JSX } from 'react';

import styles from './Popper.module.scss';
import type { LayoutProps } from '../../ts';

const cx = classNames.bind(styles);

function Popper({ children, active }: LayoutProps): JSX.Element {
    return <div className={cx('popper', { active })}>{children}</div>;
}

export default Popper;
