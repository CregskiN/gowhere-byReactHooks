import React, {useCallback, useMemo} from 'react';
import {bindActionCreators} from "redux"; //将actionCreators与dispatch绑定在一起
import {connect} from 'react-redux';
import './App.css';

//导入index首页 需要的组件
import Header from '../common/Header/Header';
import DepartDate from "./component/DepartDate/DepartDate";
import Journey from "./component/Journey/Journey";
import HighSpeed from "./component/HighSpeed/HighSpeed";
import Submit from "./component/Submit/Submit";
import CitySelector from "../common/CitySelector/CitySelector.jsx";

// 导入action
import {
    exchangeFromTo,
    showCitySelector, //该两函数返回值是回调函数 ，直接调用数据传不到reducer，应将返回值dispatch（可优化 thunk）
    hideCitySelector,
    fetchCityData,
    setSelectedCity, showDateSelector,
} from './store/actionCreators'


function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
    } = props;

    //封装： 因window.history会持续变化， 避免子组件过度渲染
    const onBack = useCallback(() => {
        window.history.back();
    }, []); //每次重渲染，onBack都是同一个句柄，如需变化，[]输入依赖变量即可. 此操作避免了header不必要的重渲染

    //封装： 绑定传入journey组件的action和dispatch
    const journeyCbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch);
    }, []);

    //封装： 绑定传入citySelector组件的action和dispatch
    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity,
        }, dispatch)
    }, []);


    return (
        <div>
            <div className='header-wrapper'>
                <Header title='火车票' onBack={onBack} />
            </div>

            <form className='form'>
                <Journey from={from} to={to} {...journeyCbs}/>
                <DepartDate time={departDate} onClick={showDateSelector()}/>
                <HighSpeed/>
                <Submit/>
            </form>

            <CitySelector show={isCitySelectorVisible}
                          cityData={cityData}
                          isLoading={isLoadingCityData}
                          {...citySelectorCbs}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);