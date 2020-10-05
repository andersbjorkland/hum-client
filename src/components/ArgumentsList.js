import React, {Component} from "react";
import {connect} from "react-redux";
import ArgumentItem from "./ArgumentItem";

class ArgumentsList extends Component {
    render() {
            let argumentItems = this.props.contentReducer.arguments;
            let newsItemsElements = argumentItems.map((element, index=0) => <ArgumentItem key={index++} index={index} text={element.text}/>)
            return (
                <div className={"argument-list side-content"}>
                    <h2>Policy: <span className={"thin"}>{this.props.contentReducer.policy.title}</span></h2>
                    <h3 className={"thin"}>{this.props.contentReducer.translation.prosCons}</h3>
                    {newsItemsElements}
                </div>
            );
    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ArgumentsList);