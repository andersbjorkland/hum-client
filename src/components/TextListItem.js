import React, {Component} from "react";
import {connect} from "react-redux";
import {openNews} from "../redux/actions";

class TextListItem extends Component {

    constructor(props) {
        super(props);
        this.removeMarkup = this.removeMarkup.bind(this);
        this.viewNews = this.viewNews.bind(this);
    }

    removeMarkup(text) {
        let search = /(\|\d+\|)/g;
        return text.replaceAll(search, '');
    }

    viewNews() {
        this.props.viewNews(this.props.news);
    }


    render() {

        return (
            <div className={"news-item"} onClick={this.viewNews}>
                <h3 className={"list-title"}>{this.props.title}</h3>
                <p className={"list-summary"}>{this.removeMarkup(this.props.summary)}</p>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    viewNews: newsItem => dispatch(openNews(newsItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextListItem);