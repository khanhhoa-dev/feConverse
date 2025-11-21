import classNames from 'classnames/bind';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { IProductDetail } from '../../ts';
import styles from './DetailProduct.module.scss';
import * as DeleteSoftProduct from '../../services/deleteSoftProduct';

const cx = classNames.bind(styles);
function DeleteProduct({ data }: { data: IProductDetail }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleCancelDelete = () => {
        setOpen(false);
    };

    const handleClickDelete = () => {
        setOpen(true);
    };

    const handleOkDelete = async () => {
        if (!data?._id) return;

        try {
            await DeleteSoftProduct.deleteSoftProduct(data._id);
            setOpen(false);
            messageApi.success({
                content: 'Delete Successful!',
                duration: 2,
            });
            navigate(-1);
        } catch (error) {
            messageApi.error('Delete Fail!');
        }
    };

    return (
        <div className={cx('wrap-btn')}>
            {contextHolder}
            <Button
                danger
                type="primary"
                block
                className={cx('btn-delete')}
                style={{ marginTop: '30px' }}
                onClick={handleClickDelete}
            >
                Delete Products
            </Button>
            <Modal
                title="Are you sure you want to delete this product?"
                open={open}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
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
                <p>This action can be undone by restoring the product later.</p>
            </Modal>
        </div>
    );
}

export default DeleteProduct;
