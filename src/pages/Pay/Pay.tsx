import classNames from 'classnames/bind';

import { useCartItem } from '../../contexts/CartContext';
import styles from './Pay.module.scss';

const cx = classNames.bind(styles);
function Pay() {
    const { checkOutItems } = useCartItem();
    console.log(checkOutItems);

    return <h1>Chào mừng bạn đến với trang Thanh toán</h1>;
}

export default Pay;
