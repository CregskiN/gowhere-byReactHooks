import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { h0 } from '../../common/fp';
import { ORDER_DEPART } from '../constant';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(reducers),
    {
        from: null,
        to: null,
        departDate: h0(Date.now()),
        highSpeed: false,
        trainList: [],
        orderType: ORDER_DEPART,
        onlyTickets: false,
        checkedTicketTypes: {},
        trainTypes: [],
        checkedTrainTypes: {},
        departStations: [],
        checkedDepartStations: {},
        arriveStations: [],
        checkedArriveStations: {},
        departTimeStart: 0,
        departTimeEnd: 24,
        arriveTimeStart: 0,
        arriveTimeEnd: 24,
        isFilterVisible: false,
        searchParsed: false, //标志对地址栏url的解析
    },

    composeEnhancers(applyMiddleware(thunk))
);

export default store;
