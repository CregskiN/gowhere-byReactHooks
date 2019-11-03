import React, {memo} from 'react';
import PropType from  'prop-types';

const AlphaIndexItem = memo(function AlphaIndex(props) {
    const {
        alpha,
        onClick,
    } = props;

    return (
        <i className='city-index-item' onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    )
});

const AlphaIndex = function AlphaIndex(props) {
    const {alphabet,onClick} = props;

    return (
        alphabet.map((item, index) => {
            return (
                <AlphaIndexItem key={item} alpha={item} onClick={onClick}/>
            )
        })
    );
};

AlphaIndex.propTypes = {
    alphabet: PropType.array.isRequired,
    onClick: PropType.func.isRequired,

};


export default AlphaIndex;