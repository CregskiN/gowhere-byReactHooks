import React from 'react';
import { connect } from 'react-redux';
import './App.css';

//导入组件
import Nav from '../common/Nav/Nav';
import List from './component/List/List';
import Bottom from './component/Bottom/Bottom';

function App(props) {
    return (
        <div>
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
