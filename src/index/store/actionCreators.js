import * as actionTypes from './actionTypes';

export function setFrom(from) {
    return {
        type: actionTypes.ACTION_SET_FROM,
        payload: from,
    };
}

export function setTo(to) {
    return {
        type: actionTypes.ACTION_SET_TO,
        payload: to,
    };
}

export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: actionTypes.ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

// 接收城市信息并存储
export function setCityData(cityData) {
    return {
        type: actionTypes.ACTION_SET_CITY_DATA,
        payload: cityData,
    };
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        //异步函数
        const { highSpeed } = getState();
        dispatch({
            type: actionTypes.ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}

// 显示城市选择器
export function showCitySelector(currentSelectingLeftCity) {
    return dispatch => {
        dispatch({
            type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}

// 隐藏城市选择器
export function hideCitySelector() {
    return {
        type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}

// 城市选择器中点击事件
export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();

        if (currentSelectingLeftCity) {
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        }

        dispatch(hideCitySelector());
    };
}

// 显示日期选择器
export function showDateSelector() {
    return {
        type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}

// 隐藏日期选择器
export function hideDateSelector() {
    return {
        type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}

// 交换出发站目的站
export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to } = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    };
}

// 选择日期的点击事件
export function setDepartDate(departDate) {
    return {
        type: actionTypes.ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

//获得城市列表 异步
export function fetchCityData() {
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState();

        if (isLoadingCityData) {
            return;
        }

        const cache = JSON.parse(
            localStorage.getItem('city_data_cache') || '{}'
        );

        if (Date.now() < cache.expires) {
            dispatch(setCityData(cache.data));
            return;
        }

        dispatch(setIsLoadingCityData(true));

        fetch('/rest/cities?_' + Date.now())
            .then(res => res.json())
            .then(cityData => {
                dispatch(setCityData(cityData));

                localStorage.setItem(
                    'city_data_cache',
                    JSON.stringify({
                        expires: Date.now() + 60 * 1000, //设置一小时有效期
                        data: cityData,
                    })
                );

                dispatch(setIsLoadingCityData(false));
            })
            .catch(() => {
                dispatch(setIsLoadingCityData(false));
            });
    };
}
