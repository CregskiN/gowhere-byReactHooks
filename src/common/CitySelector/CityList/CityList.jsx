import React,{memo} from 'react';
import PropTypes from 'prop-types';

//最小粒度,城市名
const CityItem = memo(function CityItem(props) {
    const {name, onSelect} = props;
    return (
        <li className='city-li' onClick={() => onSelect(name)}>{name}</li>
    )
});

CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

//分区+城市名
const CitySection = memo(function CitySection(props) {
    const {title, cities = [], onSelect} = props;
    return (
        <ul className='city-ul'>
            <li className='city-li' key={title} data-cate={title}>{title}</li>
            {
                cities.map((item, index) => {
                    return (
                        <CityItem key={item.name}
                                  name={item.name}
                                  onSelect={onSelect}/>
                    );
                })
            }
        </ul>
    );
});

CitySection.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};


//最大粒度
const CityList = memo(function CityList(props) {

    const {sections, onSelect} = props;
    return (
        <div className='city-list'>
            <div className='city-cate'>
                {
                    sections.map((item, index) => {
                        return (
                            <CitySection key={item.title}
                                         title={item.title}
                                         cities={item.citys}
                                         onSelect={onSelect}/>
                        )
                    })
                }
            </div>
        </div>
    )
});

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};





export default CityList;