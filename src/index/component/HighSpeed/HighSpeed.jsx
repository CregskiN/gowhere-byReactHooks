import React from 'react';
import './HighSpeed.css';

//引入： 插件
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function HighSpeed(props) {
    const { highSpeed, toggle } = props;

    // eslint-disable-next-line no-console
    console.log('HighSpeed组件被渲染了!');

    return (
        <div className="high-speed">
            <div className="high-speed-label">只看高铁/动车</div>
            <div className="high-speed-switch" onClick={() => toggle()}>
                <input type="hidden" name="highSpeed" value={highSpeed} />

                <div
                    className={classnames('high-speed-track', {
                        checked: highSpeed,
                    })}
                >
                    <span
                        className={classnames('high-speed-handle', {
                            checked: highSpeed,
                        })}
                    ></span>
                </div>
            </div>
        </div>
    );
}

HighSpeed.propTypes = {
    highSpeed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};
