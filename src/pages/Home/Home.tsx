import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Carousel, ConfigProvider } from 'antd';

import styles from './Home.module.scss';
import config from '../../config';
import PreviewProduct from './PreviewProduct/PreviewProduct';
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';
import LookbookSection from './LookbookSection/LookbookSection';
import Marketing from './Marketing/Marketing';

const cx = classNames.bind(styles);
const Banners = config.Banners;
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <ConfigProvider
                    theme={{
                        components: {
                            Carousel: {
                                dotWidth: 10,
                                dotHeight: 10,
                                dotActiveWidth: 20,
                            },
                        },
                    }}
                >
                    <Carousel autoplay autoplaySpeed={3000}>
                        {Object.entries(Banners).map(([key, value]) => (
                            <Link to={`/products/${value.link}`} key={key} className={cx('banner')}>
                                <img src={value.image} alt={key} className={cx('banner-img')} />
                            </Link>
                        ))}
                    </Carousel>
                </ConfigProvider>
            </div>
            <PreviewProduct />
            <FeaturedProduct />
            <LookbookSection />
            <Marketing />
        </div>
    );
}

export default Home;
