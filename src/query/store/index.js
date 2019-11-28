import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { h0 } from '../../common/fp';
import { ORDER_DEPART } from '../constant';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(reducers),
    {
        // 从 url获取
        from: null,
        to: null,
        departDate: h0(Date.now()),
        highSpeed: false,
        //
        trainList: [],
        orderType: ORDER_DEPART, // 是一个枚举值
        onlyTickets: false,
        trainTypes: [], // 车次类型

        checkedTicketTypes: {},
        checkedTrainTypes: {},
        departStations: [],
        checkedDepartStations: {},

        arriveStations: [],
        checkedArriveStations: {},
        departTimeStart: 0, // 出发时间 起始
        departTimeEnd: 24, // 出发时间 截止
        arriveTimeStart: 0, // 到达时间 起始
        arriveTimeEnd: 24, // 到达时间 截止
        isFilterVisible: false,
        searchParsed: false, //标志对地址栏url的解析
    },

    composeEnhancers(applyMiddleware(thunk))
);

export default store;
