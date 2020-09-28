import React, {Component} from "react";
import {connect} from 'react-redux';

import Content from "./components/Content";
import LanguageToggle from "./components/LanguageToggle";
import Nav from "./components/Nav";


class App extends Component {
    render() {
        if (this.props.asyncReducer.isFetching) {
            return (
                <div>
                    <Nav page={"home"}/>
                </div>
                );
        } 
        return (
        <div>
            <Nav page={"home"}/>
            <LanguageToggle />
            <Content />
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);