import React, {Component} from "react";
import {answerAction} from "../redux/actions";
import {connect} from "react-redux";

class AnswerOrdinal extends Component {

    constructor(props) {
        super(props);
        this.answering = this.answering.bind(this);
        this.rangeRef = React.createRef();

    }

    answering(event) {
        this.props.answering(event, {
            questionId: this.props.questionObject.id,
            value: this.rangeRef.current.value
        });
    }

    render() {
        let questionObject = this.props.questionObject;
        let className = "flex-row range-container";
        if (questionObject.answerOptions.isClicked) {
            className += " select"
        }
        return (
            <div key={"range-" + questionObject.id} className={"flex-row range-container"}>
                <p>{this.props.min.toString()}</p>
                <input
                    ref={this.rangeRef}
                    type={"range"}
                    id={"range-" + questionObject.id}
                    className={className}
                    onClick={this.answering}
                    onTouchEnd={this.answering}
                    min={this.props.min}
                    max={this.props.max}
                    step={"1"}
                />
                <p>{this.props.max.toString()}</p>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    answering: (event, data) => dispatch(answerAction(event, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOrdinal);