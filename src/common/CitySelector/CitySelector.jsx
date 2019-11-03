import React, {useState, useEffect, memo, useMemo, useCallback} from 'react';

import './CitySelector.css';

//导入： 插件
import classnames from 'classnames';
import PropTypes from 'prop-types';


//导入： 拆分小组件
import CityList from './CityList/CityList'; //城市列表
import AlphaIndex from "./AlphaIndex/AlphaIndex"; //字母导航条
import Suggest from "./Suggest/Suggest"; //搜索建议

//memo： 纯粹属性输入 优化性能
const CitySelector = memo(function CitySelector(props) {
    const {
        show,
        cityData,
        onSelect,
        isLoading,
        onBack,
        fetchCityData,
    } = props;

    //useState： 临时存储搜索框中的内容
    const [searchKey, setSearchKey] = useState('');

    //useMemo： 返回数值
    const key = useMemo(() => searchKey.trim(), [searchKey]); //把searchKey去除两侧空白 返回给key

    //副作用： 请求获取城市信息
    useEffect(() => {
        if (!show || cityData || isLoading) {
            return;
        }
        fetchCityData();
    }, [show, cityData, isLoading]);

    // 下两个封装有误， AlphaIndex 应为 CityList 的小组件
    // CityList组件封装
    const outputCitySections = () => {
        if (isLoading) {
            return <div>loading</div>
        }
        if (cityData) {
            // eslint-disable-next-line no-console
            console.log(cityData);
            return (
                <CityList
                    sections={cityData.cityList}
                    onSelect={onSelect}/>
            )
        }
        return <div>error</div>;
    };
    //封装组件： AlphaIndex
    const getAlphaIndex = () => {
        //数组： 创建字母表
        const alphabet = Array.from(new Array(26), (item, index) => {//新建长度为26的数组 遍历 设置
            return String.fromCharCode(65 + index); //返回对应ascii对应的字符表示
        });
        //函数： 位置跳转跳转到对应的位置
        const toAlpha = useCallback((alpha) => {
            document.querySelector(`[data-cate='${alpha}']`) //属性选择器
                .scrollIntoView();
        }, []);

        return (
            <div className='city-index'>
                <AlphaIndex alphabet={alphabet} onClick={toAlpha}/>
            </div>
        )
    };

    // 封装组件SuggestItem
    const getSuggest = () => {
        if (key) {
            return (
                <Suggest
                    searchKey={key}
                    onSelect={key => onSelect(key)}
                />
            )
        }

    };


    return (
        <div className={classnames('city-selector', {hidden: !show})}>
            <div className='city-search'>

                <div className='search-back'
                     onClick={() => onBack()}>
                    <svg width='42'
                         height='42'>
                        <polyline points='25,13 16,21 25,29'
                                  stroke='#fff'
                                  strokeWidth='2'
                                  fill='none'/>
                    </svg>
                </div>

                <div className='search-input-wrapper'>
                    <input type='text'
                           value={searchKey}
                           onChange={e => setSearchKey(e.target.value)}
                           className='search-input'
                           placeholder='城市、车站的中文或拼音'
                    />
                </div>

                <i className={classnames('search-clean', {hidden: key.length === 0})}
                   onClick={() => setSearchKey('')}>&#xf063;</i>

            </div>

            {outputCitySections()}

            {getAlphaIndex()}

            {getSuggest()}
        </div>
    )
});

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchCityData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CitySelector;
