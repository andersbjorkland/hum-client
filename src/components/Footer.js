import React, {Component} from "react";
import {connect} from 'react-redux';


class Footer extends Component {

    render() {
        if (this.props.contentReducer.language === 'english') {
            return (
                <footer>
                    <p>hum.nu 2020</p>
                    <a href={"https://andersbjorkland.online"} rel="noopener noreferrer" target="_blank">Created by Anders Björkland</a>
                </footer>
            );
        } else {
            return (
                <footer>
                    <p>hum.nu 2020</p>
                    <a href={"https://andersbjorkland.online"} rel="noopener noreferrer" target="_blank">Skapad av Anders Björkland</a>
                </footer>
            );
        }

    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Footer);