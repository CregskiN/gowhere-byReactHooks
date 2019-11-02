import React from 'react';


//最小粒度,城市名
function CityItem(props) {
    const {name, onSelect} = props;
    return (
        <li className='city-li' onClick={() => onSelect(name)}>{name}</li>
    )
}

//分区+城市名
function CitySection(props) {
    const {title, cities = [], onSelect} = props;
    return (
        <ul className='city-ul'>
            <li className='city-li' key={title}>{title}</li>
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
}

//最大粒度
function CityList(props) {

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
}

export default CityList;