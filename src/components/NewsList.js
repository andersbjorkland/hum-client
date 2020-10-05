import React, {Component} from "react";
import {connect} from "react-redux";
import TextListItem from "./TextListItem";

class NewsList extends Component {

    constructor(props) {
        super(props);
        this.removeMarkup = this.removeMarkup.bind(this);
    }

    removeMarkup(text) {
        let sanitized = text;
        let search = /(\|\d+\|)/;

        sanitized.replaceAll(search, '');

        return sanitized;
    }


    render() {
        let newsItems = this.props.newsReducer.news;
        let newsItemsElements = newsItems.map((element, index=0) => <TextListItem key={index++} title={element.title} summary={element.text.substr(0, 100)}/>)
        return (
            <div id={"news-list-container"} className={"side-content"}>
                <h2>News</h2>
                <div className={"news-list"}>
                    {newsItemsElements}
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(NewsList);