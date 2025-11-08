import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { JSX } from 'react';

import styles from './Header.module.scss';
import config from '../../../config';
import Search from './Search/Search';
import Login from './Login/Login';

const CategoryConfig = config.categoryConfig;

interface HeaderProps {
    isToggle?: boolean;
}
const cx = classNames.bind(styles);
const UserLogin = false;

function Header({ isToggle }: HeaderProps): JSX.Element {
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
                                    to={`/products/${value}`}
                                    className={cx('item')}
                                    title={value}
                                >
                                    {value}
                                </Link>
                            );
                        })}
                        <Link to={'/torelocator'} className={cx('item')}>
                            Store Locator
                        </Link>
                        <Link to={'/help'} className={cx('item')}>
                            Help
                        </Link>
                    </div>
                    <div className={cx('login-search')}>
                        <Search />
                        {UserLogin && (
                            <div className={cx('shopping-cart')}>
                                <ShoppingCartOutlined className={cx('icon-shopping-cart')} />
                            </div>
                        )}
                        <Login UserLogin={UserLogin} />
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;
