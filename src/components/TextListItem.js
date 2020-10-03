import React, {Component} from "react";
import {connect} from "react-redux";

class TextListItem extends Component {

    constructor(props) {
        super(props);
        this.removeMarkup = this.removeMarkup.bind(this);
    }

    removeMarkup(text) {
        let search = /(\|\d+\|)/g;
        return text.replaceAll(search, '');
    }


    render() {

        return (
            <div className={"news-item"}>
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