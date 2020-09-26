import React, {Component} from "react";
import {answerAction, answerInvalid, answerUninvalid} from "../redux/actions";
import {connect} from "react-redux";

class AnswerContinuous extends Component {

    constructor(props) {
        super(props);
        this.answering = this.answering.bind(this);
        this.rangeRef = React.createRef();
        this.blurred = this.blurred.bind(this);
        this.className = "";

    }

    answering(event) {
        this.props.answering(event, {
            questionId: this.props.questionObject.id,
            value: this.rangeRef.current.value
        });
    }


    blurred(event) {
        if (this.rangeRef.current.value < this.props.min || this.rangeRef.current.value > this.props.max) {
            console.log("Not a valid value.")
            this.props.invalidAnswer('number-' + this.props.questionObject.id);
            this.className = "invalid";
        } else {
            if (this.className === "invalid") {
                this.props.uninvalidateAnswer('number-' + this.props.questionObject.id);
            }
            this.className = "blurred";
            this.answering(event);
        }

    }

    render() {
        let componentId = "number-" + this.props.questionObject.id;
        let questionObject = this.props.questionObject;
        let className = this.className;
        if (questionObject.answerOptions.isClicked) {
            className += " select"
        }
        let isInvalid = false;
        this.props.contentReducer.invalidInput.forEach(invalidId => {
            if (invalidId === componentId) {
                isInvalid = true;
            }
        });
        let invalidInfo = "";
        if (isInvalid) {
            invalidInfo = <p className={"info-status"}>{this.props.contentReducer.translation.invalidInput}.</p>;
        }
        return (
            <div key={"continuous-" + questionObject.id} className={"flex-row"}>
                <input
                    ref={this.rangeRef}
                    type={"number"}
                    id={"number-" + questionObject.id}
                    className={className}
                    min={this.props.min}
                    max={this.props.max}
                    step={"1"}
                    onBlur={this.blurred}
                />
                {invalidInfo}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    answering: (event, data) => dispatch(answerAction(event, data)),
    invalidAnswer: (componentId) => dispatch(answerInvalid(componentId)),
    uninvalidateAnswer: (componentId) => dispatch(answerUninvalid(componentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerContinuous);