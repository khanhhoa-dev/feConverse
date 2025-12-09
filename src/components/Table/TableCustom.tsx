import { Table } from 'antd';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import type { TableProps } from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table';
import { DoubleLeftOutlined } from '@ant-design/icons';

import styles from './TableCustom.module.scss';

interface PageHeaderConfig {
    title: string;
    backTo?: string;
    toggleButton?: {
        label: string;
        to: string;
    };
    trashButton?: {
        label: string;
        to: string;
    };
}

export interface ITableCustomProps<T = any> {
    data: T[];
    columns: ColumnsType<T>;
    contextHolder?: ReactNode;
    pageConfig: PageHeaderConfig;
    footerToggle?: TableProps['footer']; //type owner của AntDesign
    rowSelection?: TableProps<T>['rowSelection'];
}

export const cx = classNames.bind(styles);
function TableCustom({
    data,
    columns,
    pageConfig,
    footerToggle,
    rowSelection,
    contextHolder,
}: ITableCustomProps) {
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <Link to={`${pageConfig.backTo}`}>
                        <DoubleLeftOutlined className={cx('icon')} />
                    </Link>
                    <h1 className={cx('title-text')}>{pageConfig.title}</h1>
                </div>

                <div className={cx('link-redirect')}>
                    {pageConfig.toggleButton && (
                        <Link to={pageConfig.toggleButton.to} className={cx('btn-toggle')}>
                            {pageConfig.toggleButton.label}
                        </Link>
                    )}

                    {pageConfig.trashButton && (
                        <Link to={pageConfig.trashButton.to} className={cx('btn-trash')}>
                            {pageConfig.trashButton.label}
                        </Link>
                    )}
                </div>
            </div>

            <div className={cx('container')}>
                <Table
                    className={cx('table')}
                    bordered
                    columns={columns}
                    pagination={false}
                    dataSource={data}
                    rowSelection={rowSelection}
                    rowKey="_id"
                    footer={
                        footerToggle
                            ? footerToggle
                            : () => (
                                  <div className={cx('footer')}>
                                      <span>Total: {data.length}</span>
                                  </div>
                              )
                    }
                />
            </div>
        </div>
    );
}

export default TableCustom;
