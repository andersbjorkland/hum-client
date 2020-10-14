import React, {Component} from "react";
import {connect} from "react-redux";
import AnswerButton from "./AnswerButton";
import bee from '../images/small-bee@2x.png';
import AnswerOrdinal from "./AnswerOrdinal";
import AnswerContinuous from "./AnswerContinuous";

class QuestionItem extends Component {

    render() {
        let answer;
        let index = 0;
        let numOfCards;
        let className = this.props.asyncReducer.sentAnswers ? "question-item sent" : "question-item";
        let cards = [];
        let cardChar = this.props.asyncReducer.sentAnswers ? '!' : '?';
        if (this.props.numOfCards) {
            numOfCards = this.props.numOfCards;
            for (let i = 0; i < numOfCards; i++) {
            cards.push(<div key={i.toString()} className={"card rot-" + i}>{cardChar}</div>)
            }
        } else {
            cards = <div className={"card"}>{cardChar}</div>;
        }


        let beeClass = this.props.beeClass ? this.props.beeClass : "";
        
        if (this.props.questionObject.answerOptions.category === "nominal") {
            let answerIndex = 0;
            answer = this.props.questionObject.answerOptions.values.map(option => <AnswerButton key={option + (index++)} questionObject={this.props.questionObject} text={option} answerIndex={answerIndex++} />)
            if (this.props.asyncReducer.sentAnswers && null !== this.props.questionObject.answer) {
                answer = <div className="flex-row"><p className="answer-chevron">›</p><p>{this.props.questionObject.answerOptions.values[this.props.questionObject.answer]}</p></div>
            }
        } else if (this.props.questionObject.answerOptions.category === "ordinal") {
            answer = <AnswerOrdinal
                questionObject={this.props.questionObject}
                min={this.props.questionObject.answerOptions.values[0]}
                max={this.props.questionObject.answerOptions.values[1]}

                />
            if (this.props.asyncReducer.sentAnswers && null !== this.props.questionObject.answer) {
                answer = <div className="flex-row"><p className="answer-chevron">›</p><p>{this.props.questionObject.answer}</p></div>
            }
        } else {
            answer = <AnswerContinuous
                questionObject={this.props.questionObject}
                min={this.props.questionObject.answerOptions.values[0]}
                max={this.props.questionObject.answerOptions.values[1]}

            />
            if (this.props.asyncReducer.sentAnswers && null !== this.props.questionObject.answer) {
                answer = <div className="flex-row"><p className="answer-chevron">›</p><p>{this.props.questionObject.answer}</p></div>
            }
        }

        
        return (
            <div className={className + " main-content"}>
                <img className={"question-bee " + beeClass} src={bee} alt="A small bumblebee"/>
                <div className="cards-container">
                    { cards }
                </div>
                <div className="question-content">
                    <label htmlFor={this.props.questionObject.id}>{this.props.questionObject.content}</label>
                    <div>
                        { answer }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(QuestionItem);