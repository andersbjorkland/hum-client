import React, {Component} from "react";
import {connect} from "react-redux";
import {closeNews} from "../redux/actions";

class NewsView extends Component {

    constructor(props) {
        super(props);
        this.fillHtmlTags = this.fillHtmlTags.bind(this);
    }

    fillHtmlTags() {
        let newsItem = this.props.newsReducer.newsItem;
        let sanitized = newsItem.text;
        let blogImages = newsItem.blogImages;
        if (undefined !== blogImages && null !== blogImages) {
            blogImages.sort((a, b) => {
                if (a.ordering < b.ordering) {
                    return -1;
                }
                if (a.ordering > b.ordering) {
                    return 1;
                }
                return 0;
            });
        }

        let search = /(\|\d+\|)/;
        let searchGlobal = /(\|\d+\|)/g;

        let index = 0;
        let i;
        let newsContent = [];
        let key = 0;
        while (true) {
            i = search.exec(sanitized);
            if (null === i || blogImages.length === 0) {
                break;
            }
            if (i.index > 0) {
                newsContent.push(<p key={key++}>{sanitized.substring(0, i.index)}</p>);
            }


            newsContent.push(<img key={key++} src={process.env.REACT_APP_IMAGE_TARGET + blogImages[index].image.fileName} alt={blogImages[index].image.alt} />)

            sanitized = sanitized.substring(i.index + i[0].length);

            index++;
            if (index >= blogImages.length) {
                break;
            }
        }

        // Remove any leftover markups (|#|)
        sanitized.replaceAll(searchGlobal, '');
        newsContent.push(<p key={key++}>{sanitized}</p>);
        return newsContent;
    }


    render() {
        let newsItem = this.props.newsReducer.newsItem;
        if (null === newsItem || !this.props.newsReducer.showNewsItem) {
            return null;
        }

        let content = this.fillHtmlTags();
        return (
            <div id={"news-view"} className={"main-content modal"}>
                <div className={"flex-row"}>
                    <h2>{newsItem.title}</h2>
                    <div className={"close"}>
                        <svg onClick={this.props.closeNews} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                            <g id="close" transform="translate(-385 -194)">
                                <circle id="close-circle" data-name="Ellipse 98" cx="22" cy="22" r="22" transform="translate(385 194)" fill="#bae6fe"/>
                                <g id="close-cross" data-name="Group 159" transform="translate(271.942 -224.528) rotate(45)">
                                    <rect id="close-left-dash" data-name="Rectangle 257" width="6" height="30" rx="3" transform="translate(404 201)" fill="#fff"/>
                                    <rect id="close-right-dash" data-name="Rectangle 258" width="6" height="30" rx="3" transform="translate(422 213) rotate(90)" fill="#fff"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
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

const mapDispatchToProps = dispatch => ({
    closeNews: () => dispatch(closeNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);