import React, {Component} from "react";
import {answerAction} from "../redux/actions";
import {connect} from "react-redux";

class AnswerButton extends Component {

    constructor(props) {
        super(props);
        this.answering = this.answering.bind(this);

    }

    answering(event) {
        this.props.answering(event, {
            questionId: this.props.questionObject.id,
            value: this.props.text
        });
    }

    render() {
        let questionObject = this.props.questionObject;
        let symbol = "";
        let className;
        if (questionObject.answer) {
            if (questionObject.answer.toLowerCase() === this.props.text.toLowerCase()) {
                className = "answer-option select";
            } else {
                className = "answer-option deselect";
            }
        } else {
            className = "answer-option";
        }

        if (this.props.text.toLowerCase() === "yes" || this.props.text.toLowerCase() === "ja") {
            symbol = <span className="symbol">✓</span>;
        } else if (this.props.text.toLowerCase() === "no" || this.props.text.toLowerCase() === "nej") {
            symbol = <span className="symbol">✕</span>;
        }
        return (
            <button id={this.props.questionObject.id + this.props.text} className={className} onClick={this.answering}>{symbol}{this.props.text.toUpperCase()}</button>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    answering: (event, data) => dispatch(answerAction(event, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButton);