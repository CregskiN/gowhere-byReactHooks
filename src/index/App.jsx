import React, {
    useCallback,
    useMemo,
} from 'react';
import {bindActionCreators} from "redux"; //将actionCreators与dispatch绑定在一起
import {connect} from 'react-redux';
import './App.css';

import Header from '../common/Header/Header';
import DepartDate from "./component/DepartDate/DepartDate";
import Journey from "./component/Journey/Journey";
import HighSpeed from "./component/HighSpeed/HighSpeed";
import Submit from "./component/Submit/Submit";

import CitySelector from "../common/CitySelector/CitySelector";

import {
    exchangeFromTo,
    showCitySelector, //该两函数返回值是回调函数 ，直接调用数据传不到reducer，应将返回值dispatch
} from './store/actionCreators'

function App(props) {
    const {
        from,
        to,
        isSelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
    } = props;


    //对传入子组件的函数进行封装，避免过度重复渲染，提高性能
    const onBack = useCallback(() => {
        window.history.back();
    }, []); //每次重渲染，onBack都是同一个句柄，如需变化，[]输入依赖变量即可. 此操作避免了header不必要的重渲染

    //回调集合
    const callbackCollection = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch);
    }, []);

    return (
        <div>
            <div className='header-wrapper'>
                <Header title='火车票' onBack={onBack} />
            </div>

            <form>
                <Journey from={from} to={to}  {...callbackCollection}/>
                <DepartDate/>
                <HighSpeed/>
                <Submit/>
            </form>

            <CitySelector show={isSelectorVisible} cityData={cityData} isLoading={isLoadingCityData} />

        </div>
    )
}


const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);