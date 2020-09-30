import React, {Component} from "react";
import {connect} from "react-redux";

import {postAnswer} from '../redux/actions';
import bee from '../images/small-bee@2x.png';


class AnswersItem extends Component {

    constructor(props) {
        super(props);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.answers = {answers: []}
    }

    sendAnswer(event) {
        event.preventDefault();
        this.props.postAnswer(this.answers);
    }

    render() {
        let number = this.props.contentReducer.numOfAnswers;
        let template = this.props.contentReducer.translation.answersHeading;
        let replaceIndex = template.indexOf('[');
        let heading = template.substring(0, replaceIndex) + number + template.substring(replaceIndex+2);
        if (number > 1) {
            if (this.props.contentReducer.language.toLowerCase() === 'svenska') {
                heading = heading.substring(0, heading.length-1) + 'or';
            } else {
                heading += 's';
            }
        }

        let questions = [...this.props.contentReducer.questions];
        let answeredQuestions = questions.filter(question => question.answer !== null);
        let stateAnswers = {answers: []};
        let hiddenInputs = answeredQuestions.map(question => {
            stateAnswers.answers.push({ [question.id] : question.answer});
            let key = "answer_" + question.id;
           return <input type={"hidden"} id={key} name={key} key={key} value={question.answer}/>;
        });
        this.answers = stateAnswers;

        let bees = [];
        for (let i = 0; i < number; i++) {
            bees.push(
                <img id={"bee-scatter-" + i} key={"beesum-"+i} className={"question-bee"} src={bee} alt="A small bumblebee"/>
            );
        }

        return (
            <form onSubmit={this.sendAnswer} id={this.props.id ? this.props.id : ""} className="content-item center-align relative results" method="post">
                <div className="item-header center">
                    <h2 className="bold">{heading}</h2>
                </div>
                {bees}
                <p>{this.props.contentReducer.translation.answersContent}</p>
                {hiddenInputs}
                <button className="answer-option" >{this.props.contentReducer.translation.answersButton}</button>
            </form>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    postAnswer: (answer) => dispatch(postAnswer(answer))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswersItem);