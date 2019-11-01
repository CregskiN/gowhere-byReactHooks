import React, {useState} from 'react';
import classnames from 'classnames';
import './CitySelector.css';

function CitySelector(props){

    const {
        show,
        cityData,
        isLoading,
        onBack,
    } = props;

    const [searchKey,setSearchKey] = useState('');

    return (
        <div className={classnames('city-selector', {hidden: !show})}>
            <div className='city-search'>
                <div className='search-back' onClick={() => onBack()}>
                    <svg width='42' height='42'>
                        <polyline points='25,13 16,21 25,29' stroke='#fff' strokeWidth='2' fill='none'/>
                    </svg>
                </div>

                <div className='search-input-wrapper'>
                    <input type='text' value={searchKey} onChange={e => setSearchKey(e.target.value)} className='search-input' placeholder='城市、车站的中文或拼音'/>
                </div>
                <i className={classnames('search-clean',{'hidden':searchKey.length===0})} onClick={() => setSearchKey('')}>&#xf063;</i>
            </div>

        </div>
    )
}

export default CitySelector;
