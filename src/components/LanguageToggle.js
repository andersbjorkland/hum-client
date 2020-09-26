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
        this.props.toggle("svenska");
    }
    toggleEnglish() {
        this.props.toggle("english");
    }

    render() {
        return (
          <div className={"flex-row language-container"}>
              <button className={"btn"} onClick={this.toggleSwedish}>Svenska</button>
              <button className={"btn"} onClick={this.toggleEnglish}>English</button>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggle: language => dispatch(switchLanguage(language))
})

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle);