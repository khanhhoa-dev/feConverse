import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import type { JSX } from 'react';

import styles from './Header.module.scss';
import config from '../../../config';
import Search from './Search/Search';
import Login from './Login/Login';
import { useUser } from '../../../contexts/UserContext';

const CategoryConfig = config.categoryConfig;

interface HeaderProps {
    isToggle?: boolean;
}
const cx = classNames.bind(styles);

function Header({ isToggle }: HeaderProps): JSX.Element {
    const { LoginIn } = useUser();
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
                        {LoginIn && (
                            <div className={cx('shopping-cart')}>
                                <Badge count={4} size="small" offset={[-8, 1]} color="#00BCD4">
                                    <ShoppingCartOutlined
                                        className={cx('icon-shopping-cart')}
                                        style={{ fontSize: '24px' }}
                                    />
                                </Badge>
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
