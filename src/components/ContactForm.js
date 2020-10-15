import React, {Component} from "react";
import {connect} from "react-redux";

import {postMessage} from "../redux/actions";
import LoadingIndicator from "./utility/LoadingIndicator";

class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            message:'',
            email:''
        }

        this.handleChangeOnName = this.handleChangeOnName.bind(this);
        this.handleChangeOnMessage = this.handleChangeOnMessage.bind(this);
        this.handleChangeOnEmail = this.handleChangeOnEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeOnName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeOnMessage(event) {
        this.setState({message: event.target.value});
    }
    handleChangeOnEmail(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.send({
            email: this.state.email,
            name: this.state.name,
            text: this.state.message,
        });
    }

    render() {
        if (this.props.asyncReducer.isPostingMessage) {
            return (
                <div className="contact shadow">
                    <h2>{this.props.contentReducer.translation.contact.heading}</h2>
                    <div className="flex-row">
                        <LoadingIndicator color={'yellow'} size={'small'} />
                        <p>{this.props.contentReducer.translation.contact.posting.sending}</p>
                    </div>
                </div>
            );
        }
        if (this.props.asyncReducer.postingMessageResolved) {
            return (
                <div className="contact shadow success">
                    <h2>{this.props.contentReducer.translation.contact.heading}</h2>
                    <p>
                        {this.props.contentReducer.translation.contact.posting.success}
                    </p>
                </div>
            );
        }
        if (this.props.asyncReducer.postingMessageFailed) {
            return (
                <div className="contact shadow">
                    <h2>{this.props.contentReducer.translation.contact.heading}</h2>
                    <p>
                        {this.props.contentReducer.translation.contact.posting.fail}
                    </p>
                </div>
            );
        }
        return (
            <form className="contact shadow" onSubmit={this.handleSubmit}>
                <h2>{this.props.contentReducer.translation.contact.heading}</h2>
                <p>
                    {this.props.contentReducer.translation.contact.text}
                </p>

                <label htmlFor="name-field">
                    {this.props.contentReducer.translation.contact.form.name}
                </label>
                <input id="name-field" type={"text"} value={this.state.name} onChange={this.handleChangeOnName} required />
                <label htmlFor="message-field">
                    {this.props.contentReducer.translation.contact.form.message}
                </label>
                <textarea id="message-field" value={this.state.message} onChange={this.handleChangeOnMessage} required />
                <label htmlFor="email-field">
                    {this.props.contentReducer.translation.contact.form.email}
                </label>
                <input id="email-field" type={"email"} value={this.state.email} onChange={this.handleChangeOnEmail} required />


                <button type="submit">{this.props.contentReducer.translation.contact.form.submit}</button>
            </form>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    send: (message) => dispatch(postMessage(message))
})
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);