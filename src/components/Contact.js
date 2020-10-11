import React, {Component} from "react";
import {connect} from 'react-redux';
import {switchLanguage, updatePage} from "../redux/actions";
import ContactForm from "./ContactForm";


class Contact extends Component {
    constructor(props) {
        super(props);
        this.props.updatePage("contact");
        if (this.props.lang === "sv") {
            let isFetching = this.props.asyncReducer.isFetching || this.props.asyncReducer.isFetchingNews;
            this.props.setLanguage("svenska", isFetching);
        }
    }

    render() {
        return (
            <div id="contact" className="content">
                <ContactForm />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    updatePage: page => dispatch(updatePage(page)),
    setLanguage: (language, isFetching) => dispatch(switchLanguage(language, isFetching))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);