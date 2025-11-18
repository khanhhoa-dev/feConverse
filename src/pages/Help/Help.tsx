import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './Help.module.scss';
import { type HelpItem, helpData } from '../../data/helps';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const HelpPage = () => {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Frequently Asked Questions</h2>

            <Collapse
                accordion={true}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className={cx('customCollapse')}
                bordered={false}
            >
                {Object.entries(helpData).map(([header, items]) => {
                    return (
                        <Panel header={header} key={header}>
                            {items.map((item: HelpItem, index: number) => {
                                return (
                                    <div key={index}>
                                        <h4 className={cx('question')}>{item.question}</h4>
                                        <p className={cx('answer')}>{item.answer}</p>
                                        <ul className={cx('details-list')}>
                                            {item.details &&
                                                item.details.map((detail, i) => {
                                                    return (
                                                        <li key={i} className={cx('item')}>
                                                            {detail}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                );
                            })}
                        </Panel>
                    );
                })}
            </Collapse>
        </div>
    );
};

export default HelpPage;
