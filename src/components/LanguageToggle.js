import React, { Component } from 'react';
import { connect } from 'react-redux';
import {switchLanguage} from "../redux/actions";

class LanguageToggle extends Component {
    constructor(props) {
        super(props);
        this.toggleSwedish = this.toggleSwedish.bind(this);
        this.toggleEnglish = this.toggleEnglish.bind(this);
    }

    toggleSwedish() {
        let isFetching = this.props.asyncReducer.isFetching || this.props.asyncReducer.isFetchingNews;
        if (this.props.contentReducer.language !== "svenska") {
            this.props.toggle("svenska", isFetching);
        }
    }
    toggleEnglish() {
        let isFetching = this.props.asyncReducer.isFetching || this.props.asyncReducer.isFetchingNews;
        if (this.props.contentReducer.language !== "english") {
            this.props.toggle("english", isFetching);
        }
    }

    render() {
        return (
          <div className={"flex-row language-container " + this.props.className}>
              <button 
                className={this.props.contentReducer.language === "svenska" ? "btn select":"btn"} 
                onClick={this.toggleSwedish} >Svenska</button>
              <button 
                className={this.props.contentReducer.language === "english" ? "btn select":"btn"} 
                onClick={this.toggleEnglish}>English</button>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggle: (language, isFetching) => dispatch(switchLanguage(language, isFetching))
})

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle);