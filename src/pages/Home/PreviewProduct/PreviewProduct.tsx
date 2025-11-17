import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './PreviewProduct.module.scss';
import { Link } from 'react-router-dom';
import * as previewProduct from '../../../data/previewProduct';

const cx = classNames.bind(styles);
const Category = previewProduct.PreviewProduct;

function PreviewProduct() {
    const [stateImg, setStateImg] = useState<string>('high');
    const handleClickToggle = (key: string) => {
        setStateImg(key);
    };
    const currentImage =
        Object.values(Category).find((cate) => cate.key === stateImg)?.image ||
        Object.values(Category)[0].image;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('preview')}>
                <Link to={`/products/shoes?type=${stateImg}`}>
                    <img src={currentImage} alt="High Top" className={cx('preview-image')} />
                </Link>
            </div>
            <div className={cx('name-product')}>
                {Object.values(Category).map((cate, i) => {
                    return (
                        <div
                            key={i}
                            className={cx('text')}
                            onClick={() => handleClickToggle(cate.key)}
                        >
                            <span>{cate.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PreviewProduct;
