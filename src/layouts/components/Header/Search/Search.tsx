import classNames from 'classnames/bind';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import styles from './Search.module.scss';
import useDebounce from '../../../../hooks/useDebounce';
import * as searchService from '../../../../services/searchProduct';
import Popper from '../../../../components/Popper/Popper';

interface DataProduct {
    name: string;
    image: string;
    price: string;
    product: string;
    slug: string;
}

const cx = classNames.bind(styles);

function Search() {
    const [inputValue, setInputValue] = useState('');
    const [datas, setDatas] = useState<DataProduct[]>([]);
    const [active, setActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    const debounceValue = useDebounce(inputValue, 600);

    useEffect(() => {
        if (inputValue.trim()) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [inputValue]);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setDatas([]);
            return;
        }
        const fetchApi = async () => {
            const result = await searchService.search(debounceValue);
            setDatas(result);
        };

        fetchApi();
    }, [debounceValue]);
    useEffect(() => {
        setInputValue('');
        setActive(false);
        setDatas([]);
    }, [location.pathname]);

    const showPopper = inputValue.trim() && (datas.length > 0 || debounceValue !== inputValue);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        setActive(false);
    };

    const handleClear = () => {
        setInputValue('');
        inputRef.current?.focus();
    };
    const handleFocus = () => {
        if (inputValue.trim()) {
            setActive(true);
        }
    };

    return (
        <div className={cx('search')}>
            <SearchOutlined className={cx('icon-search')} />
            <input
                type="text"
                className={cx('input')}
                placeholder="Search for products..."
                onChange={handleChangeInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={inputValue}
                ref={inputRef}
            />
            <CloseCircleFilled
                className={cx('icon-close')}
                style={{
                    opacity: inputValue ? 0.7 : 0,
                    pointerEvents: inputValue ? 'auto' : 'none',
                }}
                onClick={handleClear}
            />
            <Popper active={active}>
                {showPopper ? (
                    datas.map((data, i) => {
                        return (
                            <Link
                                to={`/${data.slug}`}
                                className={cx('item')}
                                key={i}
                                onClick={() => {
                                    setInputValue('');
                                }}
                            >
                                <img src={data.image} alt={data.name} className={cx('image')} />
                                <div className={cx('information')}>
                                    <h2 className={cx('name')}>{data.name}</h2>
                                    <h3 className={cx('price')}>{data.price}đ</h3>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className={cx('no-product')}>
                        <img
                            src="https://img.freepik.com/premium-vector/packaging-box-icon-flat-design_1039903-652.jpg?w=740"
                            alt="No Product"
                            className={cx('img-no-product')}
                        />
                        <h4 className={cx('text-no-product')}>No Product Found</h4>
                    </div>
                )}
            </Popper>
        </div>
    );
}

export default Search;
