import React, {Component} from "react";
import Nav from "./components/Nav";
import Content from "./components/Content";
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return (
        <div>
            <Nav page={"home"}/>
            <Content />
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);