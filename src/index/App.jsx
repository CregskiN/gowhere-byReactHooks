import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux'; //将actionCreators与dispatch绑定在一起
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import './App.css';

import { h0 } from '../common/fp';

//导入index首页 需要的组件
import Header from '../common/Header/Header';
import DepartDate from './component/DepartDate/DepartDate';
import Journey from './component/Journey/Journey';
import HighSpeed from './component/HighSpeed/HighSpeed';
import Submit from './component/Submit/Submit';
import CitySelector from '../common/CitySelector/CitySelector.jsx';
import DateSelector from '../common/DateSelector/DateSelector';

// 导入action
import {
    //返回值是回调函数 ，直接调用数据传不到reducer，应将返回值dispatch（可优化 thunk）
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    setSelectedCity,
    fetchCityData,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed,
} from './store/actionCreators';

function App() {
    const state = useSelector(state => state, shallowEqual());
    const dispatch = useDispatch();
    const {
        from,
        to,
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,
        departDate,
        highSpeed,
    } = state;

    // eslint-disable-next-line no-console
    console.log(state);

    //封装： 因window.history会持续变化， 避免子组件过度渲染
    const onBack = useCallback(() => {
        window.history.back();
    }, []); //每次重渲染，onBack都是同一个句柄，如需变化，[]输入依赖变量即可. 此操作避免了header不必要的重渲染

    //封装： 绑定传入Journey组件的action和dispatch
    const journeyCbs = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo,
                showCitySelector,
            },
            dispatch
        );
    }, []);

    //封装： 绑定传入CitySelector组件的action和dispatch
    const citySelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideCitySelector,
                fetchCityData,
                onSelect: setSelectedCity,
            },
            dispatch
        );
    }, []);

    //封装： 绑定传入DepartDateCbs组件的action和dispatch
    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);

    //封装： 绑定传入DateSelector组件的action和dispatch
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    //封装： 选择日期的函数
    const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }
        if (day < h0()) {
            return;
        }
        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, []);

    //封装： 传入highSpeed组件的action和dispatch
    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, []);

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>

            <form action="./query.html" className="form">
                <Journey from={from} to={to} {...journeyCbs} />
                <DepartDate time={departDate} {...departDateCbs} />
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
                <Submit />
            </form>

            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />

            <DateSelector
                show={isDateSelectorVisible}
                onSelect={onSelectDate}
                {...dateSelectorCbs}
            />
        </div>
    );
}

export default App;
