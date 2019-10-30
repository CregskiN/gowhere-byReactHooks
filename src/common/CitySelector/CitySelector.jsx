import React from 'react';
import classnames from 'classnames';
import './CitySelector.css';

function CitySelector(props){
    const {
        show,
        cityData,
        isLoading,
    } = props;



    return (
        <div className={classnames('city-selector', {'hidden': !show})}>
            <div className='city-search'>

            </div>

        </div>
    )

}

export default CitySelector;
