import React, {Component} from "react";
import {connect} from "react-redux";

import {postMessage} from "../redux/actions";
import LoadingIndicator from "./utility/LoadingIndicator";

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            message:'',
            email:''
        }

        this.handleChangeOnEmail = this.handleChangeOnEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeOnEmail(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let text = this.props.contentReducer.language === "english" ?
            "Signing up for newsletter." : "Registrerar sig för nyhetsbrev."
        this.props.send({
            email: this.state.email,
            name: this.state.email,
            text: text,
        }, true);
    }

    render() {
        if (this.props.asyncReducer.isPostingMessage) {
            return (
                <div className="signup shadow main-content">
                    <div className="form-header">
                        <h2>
                            <span className="bg-yellow">{this.props.contentReducer.translation.signup.heading1}</span>
                            {this.props.contentReducer.translation.signup.heading2}
                        </h2>
                    </div>
                    <h2>{this.props.contentReducer.translation.signup.heading}</h2>
                    <div className="flex-row posting">
                        <LoadingIndicator color={'yellow'} size={'small'} />
                        <p>{this.props.contentReducer.translation.signup.posting.sending}</p>
                    </div>
                </div>
            );
        }
        if (this.props.asyncReducer.hasSignedUp) {
            return (
                <div className="signup shadow success main-content">
                    <div className="form-header">
                        <h2>
                            <span className="bg-yellow">{this.props.contentReducer.translation.signup.heading1}</span>
                            {this.props.contentReducer.translation.signup.heading2}
                        </h2>
                    </div>
                    <h2>{this.props.contentReducer.translation.signup.heading}</h2>
                    <p className="success">
                        {this.props.contentReducer.translation.signup.posting.success}
                    </p>
                </div>
            );
        }
        if (this.props.asyncReducer.postingMessageFailed) {
            return (
                <div className="signup shadow main-content">
                    <div className="form-header">
                        <h2>
                            <span className="bg-yellow">{this.props.contentReducer.translation.signup.heading1}</span>
                            {this.props.contentReducer.translation.signup.heading2}
                        </h2>
                    </div>
                    <h2>{this.props.contentReducer.translation.signup.heading}</h2>
                    <p>
                        {this.props.contentReducer.translation.signup.posting.fail}
                    </p>
                </div>
            );
        }
        return (
            <form className="signup shadow main-content" onSubmit={this.handleSubmit}>
                <div className="form-header">
                    <h2>
                        <span className="bg-yellow">{this.props.contentReducer.translation.signup.heading1}</span>
                        {this.props.contentReducer.translation.signup.heading2}
                    </h2>
                </div>
                <p>
                    {this.props.contentReducer.translation.signup.text.part1}
                    <em>{this.props.contentReducer.translation.signup.text.part2}</em>
                    {this.props.contentReducer.translation.signup.text.part3}
                </p>
                <label htmlFor="email-field">
                    {this.props.contentReducer.translation.signup.email}
                </label>
                <div className="flex-row">
                    <input id="email-field" type={"email"} value={this.state.email} onChange={this.handleChangeOnEmail} required />
                    <button type="submit">{this.props.contentReducer.translation.signup.submit}</button>
                </div>
            </form>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    send: (message, isSigningUp) => dispatch(postMessage(message, isSigningUp))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);