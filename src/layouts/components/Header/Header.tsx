import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

import Login from './Login/Login';
import Search from './Search/Search';
import styles from './Header.module.scss';
import * as Category from '../../../data/category';
import * as ItemCart from '../../../services/itemCart';
import { useCartItem } from '../../../contexts/CartContext';
import { useLoginSelector, useAccessToken } from '../../../hooks/useAppSelector';
import type { GetItemCartResponse } from '../../../pages/ItemsCart/ItemsCart';

const CategoryConfig = Category.categoryConfig;

interface HeaderProps {
    isToggle?: boolean;
}
const cx = classNames.bind(styles);

function Header({ isToggle }: HeaderProps) {
    const { totalCart } = useCartItem();
    const accessToken = useAccessToken();
    const userData = useLoginSelector();
    const [totalItemCart, setTotalItemCart] = useState<GetItemCartResponse | null>(null);
    useEffect(() => {
        const fetchTotalCart = async () => {
            const totalItem = await ItemCart.GetItemCart(accessToken!);
            setTotalItemCart(totalItem);
        };
        fetchTotalCart();
    }, [totalCart, accessToken]);

    return (
        <header
            className={cx('wrapper', {
                simple: isToggle,
            })}
        >
            {isToggle ? (
                <>
                    <Link to={'/'} className={cx('logo', { isToggle })}>
                        <img
                            className={cx('image-logo')}
                            src="https://www.converse.vn/static/version1758555983/frontend/Converse/vietnam/en_US/images/converse.svg"
                            alt="logo-converse"
                            title="Logo-Converse"
                        />
                    </Link>
                </>
            ) : (
                <>
                    <Link to={'/'} className={cx('logo')}>
                        <img
                            className={cx('image-logo')}
                            src="https://www.converse.vn/static/version1758555983/frontend/Converse/vietnam/en_US/images/converse.svg"
                            alt="logo-converse"
                            title="Logo-Converse"
                        />
                    </Link>
                    <div className={cx('category')}>
                        {/* Chuyển một Object thành mảng các cặp [Key,Value] [ ['shoes', 'Shoes'] ] */}
                        {Object.entries(CategoryConfig).map(([key, value]) => {
                            return (
                                <Link
                                    key={key}
                                    to={value.route}
                                    className={cx('item')}
                                    title={value.name}
                                >
                                    {value.title}
                                </Link>
                            );
                        })}
                    </div>
                    <div className={cx('login-search')}>
                        <Search />
                        {userData && userData.admin === false && accessToken && (
                            <div className={cx('items-cart')}>
                                <Link to="/items-cart">
                                    <Badge
                                        count={totalItemCart?.totalCart}
                                        size="small"
                                        offset={[-8, 1]}
                                        color="#00BCD4"
                                    >
                                        <ShoppingCartOutlined
                                            className={cx('icon-items-cart')}
                                            style={{ fontSize: '24px' }}
                                        />
                                    </Badge>
                                </Link>
                            </div>
                        )}
                        <Login />
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;
