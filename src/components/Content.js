import React, {Component} from "react";
import {connect} from 'react-redux';


import QuestionItem from "./QuestionItem";
import VoteItem from "./VoteItem";
import GenericItem from "./GenericItem";
import AnswersItem from "./AnswersItem";
import NewsList from "./NewsList";
import ArgumentsList from "./ArgumentsList";
import NewsView from "./NewsView";
import ElectionSchedule from "./ElectionSchedule";
import {updatePage} from "../redux/actions";


class Content extends Component {

    componentDidMount() {
        this.props.updatePage("/");
    }

    render() {
        let i = 0;
        let j = 0;
        let questionKey = 0;
        const questions = this.props.contentReducer.questions.map(question => {
            let beeClass;
            if (i % 2 === 0) {
                beeClass = "top ";
                if (j % 2 === 0) {
                    beeClass += "right"
                } else {
                    beeClass += "left";
                }
            } else {
                beeClass = "bottom ";

                if (j % 2 === 0) {
                    beeClass += "right"
                } else {
                    beeClass += "left";
                }
            }
            if (i % 2 === 0) {
                j++;
            }
            i++;
            questionKey++;
            return (
                <QuestionItem key={questionKey.toString()}
                    questionKey={"question-" + questionKey}
                    numOfCards={i}
                    beeClass={beeClass}
                    questionType={question.category}
                    question={question.content}
                    questionObject={question}
                />
            );
        })
        let questionsIndex = 0;

        let showNewsItem = this.props.newsReducer.showNewsItem;
        if (showNewsItem) {
            return (
                <div id={"content"}>
                    <NewsList />
                    <NewsView />
                </div>
            );
        }
        return (
            <div id="content">
                <NewsList />
                <ElectionSchedule />
                <NewsView />
                <GenericItem
                    id={"theme-content"}
                    className={"mt-0 main-content"}
                    heading={this.props.contentReducer.theme.header}
                    headingLevel={1}
                    subheading={this.props.contentReducer.translation.humSubheading}
                    content={ this.props.contentReducer.theme.content }
                    image={ this.props.contentReducer.theme.symbol }
                />
                {questions[questionsIndex] ? questions[questionsIndex++] : ""}
                <VoteItem />
                <ArgumentsList />
                {questions[questionsIndex] ? questions[questionsIndex++] : ""}
                {questions[questionsIndex] ? questions[questionsIndex++] : ""}
                <GenericItem
                    id={"institution-content"}
                    className={"main-content"}
                    heading={this.props.contentReducer.institution.header}
                    subheading={this.props.contentReducer.translation.institutionSubheading}
                    content={ this.props.contentReducer.institution.content }
                />
                {questions[questionsIndex] ? questions[questionsIndex++] : ""}
                {questions[questionsIndex] ? questions[questionsIndex++] : ""}

                {this.props.contentReducer.numOfAnswers > 0 ? <AnswersItem /> : ""}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    updatePage: page => dispatch(updatePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);