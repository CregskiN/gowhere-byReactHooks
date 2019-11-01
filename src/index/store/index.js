import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(reducers),

    {
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        cityData: null, //城市信息
        isLoadingCityData: false, //是否正在加载
        isDateSelectorVisible: false,
        departDate: Date.now(),
        highSpeed: false,
    },

    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;