import React, {Component} from "react";
import {connect} from 'react-redux';

import Content from "./components/Content";
import Nav from "./components/Nav";
import LoadingIndicator from "./components/utility/LoadingIndicator";


class App extends Component {
    render() {
        if (this.props.asyncReducer.isFetching) {
            return (
                <div>
                    <Nav page={"home"}/>
                    <LoadingIndicator />
                </div>
                );
        } 
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