import React, {useMemo} from 'react';
import './DepartDate.css';

// 导入逻辑
import dayjs from 'dayjs';
import {h0} from '../../../common/fp';

// 导入插件
import PropTypes from 'prop-types';

//思考： 要不要用memo优化？
//答： 不可以， DepartDate的数据来源不只是props，还有fp.js中从系统获得的时间，零点过后会发生该重渲染，没有重渲染
//解决方案： 时间戳作为props传递给DepartDate
function DepartDate(props) {
    const {
        time,
        onClick,
    } = props;

    // 制作时间戳
    const h0OfDepart = h0(time);
    // 制作 周X 时间
    const departDate = new Date(h0OfDepart);

    const departDateString = useMemo(() => {
        return dayjs(h0OfDepart).format('YYYY-MM-DD');
    }, [h0OfDepart]);

    //判断： 选中日期是不是今天
    const isToday = h0OfDepart === h0();
    const weekString = '周' +
        ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
        (isToday ? '(今天)' : '');

    // eslint-disable-next-line no-console
    console.log(departDateString);
    // eslint-disable-next-line no-console
    console.log(weekString);

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