import React, {Component} from "react";
import {connect} from 'react-redux';
import {updatePage} from "../redux/actions";
import ContactForm from "./ContactForm";


class About extends Component {
    constructor(props) {
        super(props);
        this.props.updatePage("about");
    }

    render() {
        return (
            <div id="about" className="content">
                <h1>About</h1>
                <h2>The purpose of Hum</h2>
                <p>
                    <em>Hum</em> is a place to get the gist of policies and political processes.
                    You may think politics is really interesting or you might not think about it at all.
                    But no matter your level of interest, politics still affects your life.
                </p>
                <p>
                    Here at <em>Hum</em> the goal is to get everyone invested in their own political well-being.
                    Our democracy depends on us to invest in it, but if we feel left out or have no insight then it
                    gets hard for us to do so.
                </p>
                <p>
                    By focusing on a single topic at a time we hope to expand the knowledge about the political life
                    here in Sweden. We introduce a theme that the content is geared towards, as well as questions
                    for self-reflection.
                </p>

                <ContactForm />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    updatePage: page => dispatch(updatePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);