import classNames from 'classnames/bind';
import { Col, Row } from 'antd';

import styles from './StoreLocator.module.scss';
import * as Stores from '../../data/stores';

const cx = classNames.bind(styles);
const storeList = Stores.stores;
function StoreLocator() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img
                    src="https://cdn.shopify.com/s/files/1/1880/7069/files/converse-Oct29-banner-section.jpg?v=1635452569"
                    alt="Banner"
                    className={cx('image-banner')}
                />
            </div>
            <div className={cx('store-locator')}>
                <div className={cx('page-title')}>
                    <h2 className={cx('title-text')}>Store List</h2>
                    <span className={cx('total-store')}> {storeList.length} Stores</span>
                </div>
                <div className={cx('list-store')}>
                    {storeList.map((store, i) => {
                        return (
                            <div className={cx('store-information')} key={i}>
                                <Row gutter={16}>
                                    <Col span={8} className={cx('store-item')}>
                                        <div className={cx('image-store-wrapper')}>
                                            <img
                                                src={store.image}
                                                alt={store.name}
                                                className={cx('image-store')}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={16} className={cx('store-item')}>
                                        <div className={cx('store-details')}>
                                            <a href={store.mapLink} className={cx('store-name')}>
                                                {store.name}
                                            </a>
                                            <p className={cx('store-address')}>{store.address}</p>
                                            {store.phone && (
                                                <p className={cx('store-phone')}>
                                                    Phone: {store.phone}
                                                </p>
                                            )}
                                            <a
                                                href={store.mapLink}
                                                className={cx('store-map-link')}
                                            >
                                                Open in Google Maps
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default StoreLocator;
