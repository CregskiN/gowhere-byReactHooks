import React, { memo } from 'react';
import './Submit.css';

export default memo(function Submit(props) {
    // eslint-disable-next-line no-console
    console.log('Submit组件被渲染了！');

    return (
        <div className="submit">
            <button type="submit" className="submit-button">
                搜索
            </button>
        </div>
    );
});
