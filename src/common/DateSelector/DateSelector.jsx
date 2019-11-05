import React, {memo} from 'react';
import './DateSelector.css';

// 导入组件
import Header from '../Header/Header';
import Month from "./Month/Month";

// 导入插件
import classnames from 'classnames';
import PropTypes from 'prop-types';


const DateSelector = memo(function DateSelector(props) {
    const {
        show,
        onSelect,
        onBack,
    } = props;

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

    //制作： 月份
    const monthSequence = [now.getTime()];
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());


    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <Header onBack={onBack} title='日期选择'/>
            <div className='date-selector-tables'>
                {
                    monthSequence.map((item, index) => {
                        return (
                            <Month key={index}
                                   onSelect={onSelect}
                                   startDayTimeInMonth={item}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
});

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default DateSelector;