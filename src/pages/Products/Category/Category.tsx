import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { MenuOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

import styles from './Category.module.scss';
import ProductView from './ProductView';
import * as CategoryFilter from '../../../services/category';
const cx = classNames.bind(styles);
interface IFilter {
    style: string[];
    gender: string[];
    type: string[];
}

function Category({ product }: { product: 'shoes' | 'clothing' | 'accessories' }) {
    const [data, setData] = useState<IFilter | null>(null);
    const [searchParam, setSearchParam] = useSearchParams();
    const [selectedParam, setSelectedParam] = useState({
        gender: '' as string,
        type: '' as string,
        style: '' as string,
    });
    const [expanded, setExpanded] = useState({
        gender: true as boolean,
        style: true as boolean,
        type: true as boolean,
    });

    useEffect(() => {
        const genderParam = searchParam.get('gender') || '';
        const styleParam = searchParam.get('style') || '';
        const typeParam = searchParam.get('type') || '';

        setSelectedParam({
            gender: genderParam,
            style: styleParam,
            type: typeParam,
        });
    }, [searchParam]);

    useEffect(() => {
        if (!product) {
            console.log('Product is undefined, skipping fetch');
            return;
        }
        const fetchApi = async () => {
            try {
                const result = await CategoryFilter.category(product);
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error('Fetch error full details:', error);
            }
        };

        fetchApi();
    }, [product]);

    const handleChecked = (category: keyof IFilter, checked: boolean, value: string) => {
        let newValue: string;
        if (checked) {
            newValue = '';
        } else {
            newValue = value;
        }

        setSelectedParam((prev) => ({
            ...prev,
            [category]: newValue,
        }));

        const newParams = new URLSearchParams(searchParam);

        if (newValue) {
            newParams.set(category, newValue.toLowerCase());
        } else {
            newParams.delete(category);
        }
        setSearchParam(newParams);
    };

    const handleClick = (category: keyof IFilter) => {
        setExpanded((prev) => ({ ...prev, [category]: !expanded[category] }));
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col span={6} className={cx('col')}>
                    <div className={cx('menu')}>
                        <span className={cx('text-head')}>Hide Filters</span>
                        <MenuOutlined style={{ fontSize: '1.5rem' }} />
                    </div>
                    <div className={cx('contain')}>
                        {data &&
                            Object.entries(data).map(([key, values]) => {
                                const categoryKey = key as keyof IFilter;
                                return (
                                    <div className={cx('list')} key={key}>
                                        <div
                                            className={cx('title')}
                                            onClick={() => {
                                                handleClick(categoryKey);
                                            }}
                                        >
                                            <span className={cx('text-category')}>{key}</span>
                                            {expanded[categoryKey] ? (
                                                <MinusOutlined />
                                            ) : (
                                                <PlusOutlined />
                                            )}
                                        </div>
                                        {expanded[categoryKey] && (
                                            <div className={cx('filter')}>
                                                {values.map((value: string, i: number) => {
                                                    const isChecked =
                                                        selectedParam[categoryKey] === value;
                                                    return (
                                                        <div className={cx('checkbox')} key={i}>
                                                            <input
                                                                name={key}
                                                                type="radio"
                                                                id={value}
                                                                className={cx('input')}
                                                                checked={isChecked}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        handleChecked(
                                                                            categoryKey,
                                                                            false,
                                                                            value
                                                                        );
                                                                    }
                                                                }}
                                                                onClick={(e) => {
                                                                    if (isChecked) {
                                                                        e.preventDefault();
                                                                        handleChecked(
                                                                            categoryKey,
                                                                            true,
                                                                            value
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={value}
                                                                className={cx('label')}
                                                            >
                                                                {value}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </Col>
                <ProductView product={product as 'shoes' | 'clothing' | 'accessories'} />
            </Row>
        </div>
    );
}

export default Category;
