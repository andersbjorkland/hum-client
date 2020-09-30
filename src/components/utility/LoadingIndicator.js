import React, {Component} from "react";
import {connect} from "react-redux";

class LoadingIndicator extends Component {

    render() {
        let classNameEnhance = '';
        if (undefined !== this.props.color ) {
            classNameEnhance += ' ' + this.props.color;
        }

        if (undefined !== this.props.size ) {
            classNameEnhance += ' ' + this.props.size;
        }

        return (
            <div className={"loading-indicator" + classNameEnhance}>
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