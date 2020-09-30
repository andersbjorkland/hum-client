import React, {Component} from "react";
import {connect} from "react-redux";

class LoadingIndicator extends Component {
    render() {
        return (
            <div className="loading-indicator">
                <div id="li1" className="loading-inner"></div>
                <div id="li2" className="loading-inner"></div>
                <div id="ind1" className="indicator"></div>
                <div id="ind2" className="indicator"></div>
                <div className="dotting"><div id="dd1"></div><div id="dd2"></div><div id="dd3"></div></div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});


export default connect(mapStateToProps)(LoadingIndicator);