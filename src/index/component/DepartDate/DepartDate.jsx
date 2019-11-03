import React, {useMemo} from 'react';
import './DepartDate.css';

import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import {h0} from '../../../common/fp';

function DepartDate(props) {
    const {
        time,
        onClick
    } = props;

    // 制作时间戳
    const h0OfDepart = h0(time);
    const departDateString = useMemo(() => {
        return dayjs(time).format('YYYY-MM-DD');
    }, [h0OfDepart]);

    // 制作星期
    const departDate = new Date();
    //判断： 选中日期是不是今天
    const isToday = h0OfDepart === h0();
    const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] + (isToday ? '(今天)' : '');

    return (
        <div className='depart-date' onClick={onClick}>
            <input type='hidden' name='date' value={departDateString}/>
            {departDateString} <span className='depart-week'>{weekString}</span>
        </div>
    );
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default DepartDate;