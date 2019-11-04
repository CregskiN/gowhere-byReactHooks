import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {h0} from '../../fp';

const Day = function Day(props) {
    const {
        day,
        onSelect,
    } = props;

    if (!day) {
        return <td className='null'></td>
    }

    const classes = [];

    const now = h0();

    if (day < now) {
        classes.push('disabled');
    }

    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend');
    }

    const dateString = now === day ? '今天' : new Date(day).getDate();

    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    )
};

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};


const Week = function Week(props) {
    const {
        days,
        onSelect,
    } = props;

    return (
        <tr className='date-table-days'>
            {
                days.map((item, index) => {
                    return (
                        <Day key={index} day={item} onSelect={onSelect}/>
                    )
                })
            }
        </tr>
    )
};

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};


const Month = memo(function DateBoard(props) {
    const {
        startDayTimeInMonth,
        onSelect,
    } = props;

    //制作： 月份板块 数据
    const startDay = new Date(startDayTimeInMonth);
    const currentDay = new Date(startDayTimeInMonth);

    let days = [];
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }
    //在前加空白
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null).concat(days);
    //在后加空白
    const lastDay = new Date(days[days.length - 1]);
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0)
        .fill(null));

    const weeks = [];
    for (let row = 0; row < days.length / 7; row++) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }


    return (
        <table className='date-table'>
            <thead>
                <tr>
                    <td colSpan='7'>
                        <h5>
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className='data-table-weeks'>
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className='weekend'>周六</th>
                    <th className='weekend'>周日</th>
                </tr>
                {
                    weeks.map((item, index) => {
                        return <Week key={index} days={item} onSelect={onSelect}/>
                    })
                }
            </tbody>
        </table>
    )
});

Month.propTypes = {
    startDayTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default Month;