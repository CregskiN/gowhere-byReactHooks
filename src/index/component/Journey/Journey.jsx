import React from 'react';
import switchImg from '../../images/switch.svg'; //webpack使可以用引用文件的方式引用svg图片
import './Journey.css';

export default function Journey(props) {
    const {
        from,
        to,
        exchangeFromTo, //点击交换始发站终点站
        showCitySelector, //传入true false，打开选择器，分别填入始发站终点站
    } = props;

    return (
        <div className='journey'>
            <div className='journey-station' onClick={() => showCitySelector(true)} >
                <input type='text' readOnly name='from' value={from} className='journey-input journey-from'/>
            </div>

            <div className='journey-switch' onClick={() => exchangeFromTo()}>
                <img src={switchImg} width='70' height='40' alt='switch'/>
            </div>

            <div className='journey-station' onClick={() => showCitySelector(false)}>
                <input type='text' readOnly name='to' value={to} className='journey-input journey-to'/>
            </div>

        </div>
    );
}