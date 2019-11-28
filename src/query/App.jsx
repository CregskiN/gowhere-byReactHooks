import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import './App.css';

//导入组件
import Header from '../common/Header/Header';
import Nav from '../common/Nav/Nav';
import List from './component/List/List';
import Bottom from './component/Bottom/Bottom';

function App(props) {
    const { from, to } = props;

    const onBack = useCallback(() => {
        // memorized 保证每次都是同一个句柄
        window.history.back();
    }, []);

    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} - ${to}`} onBack={onBack} />
            </div>
            <Nav />
            <List />
            <Bottom />
        </div>
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
