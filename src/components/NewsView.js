import React, {Component} from "react";
import {connect} from "react-redux";

class NewsView extends Component {

    constructor(props) {
        super(props);
        this.fillHtmlTags = this.fillHtmlTags.bind(this);
    }

    fillHtmlTags() {
        let newsItem = this.props.newsReducer.newsItem;
        let sanitized = newsItem.text;
        let blogImages = newsItem.blogImages;
        blogImages.sort((a, b) => {
           if (a.ordering < b.ordering) {
               return -1;
           }
           if (a.ordering > b.ordering) {
               return 1;
           }
           return 0;
        });

        let search = /(\|\d+\|)/;
        let searchGlobal = /(\|\d+\|)/g;

        let index = 0;
        let i;
        let newsContent = [];
        while (true) {
            i = search.exec(sanitized);
            if (null === i || blogImages.length === 0) {
                break;
            }
            if (i.index > 0) {
                newsContent.push(<p>{sanitized.substring(0, i.index)}</p>);
            }


            newsContent.push(<img src={process.env.REACT_APP_IMAGE_TARGET + blogImages[index].image.fileName} alt={blogImages[index].image.alt} />)

            sanitized = sanitized.substring(i.index + i[0].length);

            index++;
            if (index >= blogImages.length) {
                break;
            }
        }

        // Remove any leftover markups (|#|)
        sanitized.replaceAll(searchGlobal, '');
        newsContent.push(<p>{sanitized}</p>);
        return newsContent;
    }


    render() {
        let newsItem = this.props.newsReducer.newsItem;
        if (null === newsItem || !this.props.newsReducer.showNewsItem) {
            return null;
        }

        let content = this.fillHtmlTags();
        console.log(content);
        return (
            <div id={"news-view"} className={"main-content modal"}>
                <h2>{newsItem.title}</h2>
                <div className={"news-content"}>
                    {content}
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(NewsView);