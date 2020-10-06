import React, {Component} from "react";
import {connect} from "react-redux";

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
        console.log(this.props.news);
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

export default connect(mapStateToProps)(TextListItem);