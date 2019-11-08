import * as actionTypes from './actionTypes';

const defaultState = {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null, //城市信息
    isLoadingCityData: false, //是否正在加载
    isDateSelectorVisible: false,
    departDate: Date.now(),
    highSpeed: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ACTION_SET_FROM:
            return _from(state, action);
        case actionTypes.ACTION_SET_TO:
            return _to(state, action);
        case actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
            return _isCitySelectorVisible(state, action);
        case actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
            return _currentSelectingLeftCity(state, action);
        case actionTypes.ACTION_SET_CITY_DATA:
            return _cityData(state, action);
        case actionTypes.ACTION_SET_IS_LOADING_CITY_DATA:
            return _isLoadingCityData(state, action);
        case actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
            return _isDateSelectorVisible(state, action);
        case actionTypes.ACTION_SET_HIGH_SPEED:
            return _highSpeed(state, action);
        case actionTypes.ACTION_SET_DEPART_DATE:
            return _departDate(state, action);

        default:
            return state;
    }
};

const _from = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.from = payload;
    return newState;
};

const _to = (state = '上海', action) => {
    const { payload } = action;
    const newState = state;
    newState.to = payload;
    return newState;
};

const _isCitySelectorVisible = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.isCitySelectorVisible = payload;
    return newState;
};

const _currentSelectingLeftCity = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.currentSelectingLeftCity = payload;
    return newState;
};

const _cityData = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.cityData = payload;
    return newState;
};

const _isLoadingCityData = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.isLoadingCityData = payload;
    return newState;
};

const _isDateSelectorVisible = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.isDateSelectorVisible = payload;
    return newState;
};

const _highSpeed = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.highSpeed = payload;
    return newState;
};
const _departDate = (state, action) => {
    const { payload } = action;
    const newState = state;
    newState.departDate = payload;
    return newState;
};
