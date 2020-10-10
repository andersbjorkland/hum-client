import React, {Component} from "react";
import {connect} from 'react-redux';
import {updatePage} from "../redux/actions";
import ContactForm from "./ContactForm";
import About from "./About";


class Om extends Component {
    constructor(props) {
        super(props);
        this.props.updatePage("about");
    }

    render() {
        if (this.props.contentReducer.language === "english") {
            return <About />;
        }
        return (
            <div id="about" className="content">
                <h1>Om</h1>
                <h2>Målet med Hum</h2>
                <p>
                    <em>Hum</em> är en hemsida där vem som helst ska kunna få ett hum om politiken
                    och de politiska processerna. Du kanske redan är insatt i hur ett förslag blir till en lag. Eller så
                    är detta med politiska processer något alldeles främmande. Oavsett vilket, så påverkar politken
                    ditt liv.
                </p>
                <p>
                    Här på <em>Hum</em> är målet att alla ska blanda sig i sitt egna politiska välmående. Vår
                    demokrati är beroende av att vi deltar. Om någon känner sig utanför och utan inflytande så är det
                    något som påverkar oss alla.
                </p>
                <p>
                    Genom att fokusera på ett tema i taget så hoppas vi utvidga kunskapen om de politiska processerna.
                    Vi hoppas också att du som besökare ska känna att din roll som väljare är betydelsefull, för det
                    är den!
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

export default connect(mapStateToProps, mapDispatchToProps)(Om);