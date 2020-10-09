import React, {Component} from "react";
import {connect} from "react-redux";

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
        console.log(this.state);
    }

    render() {
       return (
            <form className="contact shadow" onSubmit={this.handleSubmit}>
                <h2>Contact</h2>
                <p>
                    If you like to a subject or have any suggestions for improvements, get in touch!
                </p>

                <label htmlFor="name-field">
                    Name
                </label>
                <input id="name-field" type={"text"} value={this.state.name} onChange={this.handleChangeOnName} required />
                <label htmlFor="message-field">
                    Message
                </label>
                <textarea id="message-field" value={this.state.message} onChange={this.handleChangeOnMessage} required />
                <label htmlFor="email-field">
                    Email
                </label>
                <input id="email-field" type={"email"} value={this.state.email} onChange={this.handleChangeOnEmail} required />


                <button type="submit">Submit</button>
            </form>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ContactForm);