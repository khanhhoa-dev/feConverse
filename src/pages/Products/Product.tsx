import classNames from 'classnames/bind';
import { useParams, useSearchParams } from 'react-router-dom';

import styles from './Product.module.scss';
import ToggleBackground, {
    ListBackground,
    type ProductType,
} from '../../components/ToggleBackground/ToggleBackground';
import Category from './Category/Category';

const cx = classNames.bind(styles);
type MainProductType = 'shoes' | 'clothing' | 'accessories';
function Product() {
    const [searchParams] = useSearchParams();
    const { product } = useParams<{ product?: MainProductType }>();
    const style = searchParams.get('style');

    //Toggle Background
    let backgroundKey: ProductType | null = null;
    if (style && style in ListBackground) {
        backgroundKey = style as ProductType;
    } else if (product) {
        backgroundKey = product;
    }

    const ToggleImg = backgroundKey ? ToggleBackground(backgroundKey) : undefined;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-image')}>
                {ToggleImg && (
                    <img className={cx('image')} src={ToggleImg} alt="Image Background" />
                )}
            </div>
            <Category product={product as MainProductType} />
        </div>
    );
}

export default Product;
