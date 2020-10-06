import React, {Component} from "react";
import {connect} from "react-redux";

class ArgumentItem extends Component {

    render() {
        let classSide = this.props.index % 2 === 0 ? "left" : "right";
        return (
            <div className={"argument-item speech-bubble " + classSide}>
                <div className={"argument-item speech-bubble-inner"}>
                    <p>{this.props.text}</p>
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ArgumentItem);