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
        let hasImages = true;

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
        } else {
            hasImages = false;
        }

        let search = /(\|\d+\|)/;
        let newLine = /[\n]+/;

        let index = 0;
        let i;
        let p;
        let newsContent = [];
        let key = 0;
        let hasNewLine = true;
        let pText;
        let loopCount = 0;
        while (loopCount++ < 50) {
            // Check what comes first: image or newline
            i = search.exec(sanitized);
            p = newLine.exec(sanitized);

            if (null === i) {
                hasImages = false;
            }

            if (null === p) {
                hasNewLine = false;
            }

            if (hasImages && hasNewLine) {

                if (i.index < p.index) {
                    newsContent.push(<img key={key++} src={process.env.REACT_APP_IMAGE_TARGET + blogImages[index].image.fileName} alt={blogImages[index].image.alt} />)
                    sanitized = sanitized.substring(i.index + i[0].length);
                    index++;

                } else {
                    pText = sanitized.substring(0, i.index);

                    newsContent.push(<p key={key++}>{pText}</p>);
                    sanitized = sanitized.substring(pText.length);
                }

            } else if (hasImages) {
                newsContent.push(<img key={key++} src={process.env.REACT_APP_IMAGE_TARGET + blogImages[index].image.fileName} alt={blogImages[index].image.alt} />)
                sanitized = sanitized.substring(i.index + i[0].length);
                index++;

            } else if (hasNewLine) {
                newsContent.push(<p key={key++}>{sanitized.substring(0, p.index)}</p>);
                sanitized = sanitized.substring(p.index + p[0].length)
            }

            if (hasImages && index >= blogImages.length) {
                hasImages = false;
            }

            if (!hasImages && !hasNewLine) {
                break;
            }
        }

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

// check if there is a new line.
//      Insert paragraph
// check if there is a img ||.
//      Insert image

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    closeNews: () => dispatch(closeNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);