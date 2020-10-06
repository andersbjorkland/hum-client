import React, {Component} from "react";
import {connect} from "react-redux";

class NewsView extends Component {

    constructor(props) {
        super(props);
        this.fillHtmlTags = this.fillHtmlTags.bind(this);
    }

    fillHtmlTags() {
        let sanitized = this.props.news.text;
        let blogImages = this.props.news.blogImages;
        blogImages.sort((a, b) => {
           if (a.ordering < b.ordering) {
               return -1;
           }
           if (a.ordering > b.ordering) {
               return 1;
           }
           return 0;
        });

        let search = /(\|\d+\|)/g;
        let index = 0;
        while (sanitized.includes(search)) {
            sanitized.replace(search,
                <img src={this.props.newsReducer.imageFolder + blogImages[index].image.fileName} alt={blogImages[index].image.alt} />);
            index++;
            if (index >= blogImages.length()) {
                break;
            }
        }

        // Remove any leftover markups (|#|)
        sanitized.replaceAll(search, '');

        return sanitized;
    }


    render() {
        return (
            <div id={"news-view"} className={"main-content modal"}>
                <h2>{this.props.news.title}</h2>
                <div className={"news-list"}>
                    {this.fillHtmlTags}
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(NewsView);