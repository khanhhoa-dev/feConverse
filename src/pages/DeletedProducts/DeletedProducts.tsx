import classNames from 'classnames/bind';
import { Button, Modal, message, Spin } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as DeletedProduct from '../../services/deleteSoftProduct';
import styles from './DeletedProduct.module.scss';

const cx = classNames.bind(styles);
interface DataSelectField {
    _id: string;
    name: string;
    image: string;
    price: string;
    product: string;
    slug: string;
}
function DeletedProducts() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [dataProduct, setDataProduct] = useState<DataSelectField[] | null>(null);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await DeletedProduct.deleted();
            setDataProduct(data);
        };
        fetchApi();
    }, []);

    const handleRestore = async (id: string) => {
        try {
            await DeletedProduct.restore(id);
            messageApi.success({
                content: 'Product restores Successfully!',
                duration: 3,
                style: {
                    fontSize: '1.4rem',
                    fontWeight: '600',
                },
            });
            setDataProduct((prev) => {
                if (!prev) return [];
                return prev.filter((product) => product._id !== id);
            });
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const handleOkDeleteHard = async (id: string) => {
        try {
            setLoading(true);
            await DeletedProduct.deleteHard(id);
            setOpenModal(false);
            setLoading(false);
            messageApi.success({
                content: 'Product deleted successfully!',
                duration: 3,
                style: {
                    fontSize: '1.4rem',
                    fontWeight: '600',
                },
            });
            setDataProduct((prev) => {
                if (!prev) return [];
                return prev.filter((product) => product._id !== id);
            });
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleCancelDeleteHard = () => {
        setOpenModal(false);
    };

    const handleDeleteHard = async () => {
        setOpenModal(true);
    };

    const checkData = !!dataProduct?.length;
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('title')}>
                <Link to={'/manage-products'} className={cx('icon')}>
                    <DoubleLeftOutlined />
                </Link>
                <h1 className={cx('text')}>Trash can</h1>
            </div>
            <div className={cx('header')}>
                <h2 className={cx('title-header')}>List product</h2>
            </div>
            <div className={cx('container')}>
                {checkData ? (
                    dataProduct.map((data, i) => {
                        return (
                            <div className={cx('wrap-deleted-product')} key={i}>
                                <div className={cx('inform-product')}>
                                    <img
                                        className={cx('img-product')}
                                        src={data.image}
                                        alt="Image-Product"
                                    />
                                    <div className={cx('detail-product')}>
                                        <h2 className={cx('name')}>{data.name}</h2>
                                        <span className={cx('price')}>đ{data.price}</span>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    <Button
                                        className={cx('btn-restore')}
                                        onClick={() => handleRestore(data._id)}
                                    >
                                        Restore
                                    </Button>
                                    <Button type="primary" danger onClick={handleDeleteHard}>
                                        Delete
                                    </Button>
                                    <Modal
                                        title="Are you sure you want to delete this product?"
                                        open={openModal}
                                        onOk={() => handleOkDeleteHard(data._id)}
                                        onCancel={handleCancelDeleteHard}
                                        okText="Yes, Delete it"
                                        cancelText="No, Keep it"
                                        okButtonProps={{ danger: true }}
                                        cancelButtonProps={{
                                            style: {
                                                color: 'var(--black-color)',
                                                borderColor: 'var(--border-color)',
                                            },
                                        }}
                                    >
                                        <p>If you delete it you will not be able to recover it.</p>
                                    </Modal>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className={cx('not-product')}>
                        <img
                            src="/notfound.png"
                            alt="Not Product"
                            className={cx('img-not-product')}
                        />
                        <span className={cx('text')}>Empty trash can</span>
                    </div>
                )}
            </div>
            <Spin spinning={loading} fullscreen></Spin>
        </div>
    );
}

export default DeletedProducts;
