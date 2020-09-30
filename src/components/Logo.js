import React, {Component} from 'react';
import logo from '../images/logo.svg';

export default class Logo extends Component {

    render() {
        return (
            <div id="logo">
                <a href="/">
                    <img id="logo-image" src={logo} alt="Logo for Hum, a bumblebee in flight" />
                    <div id="logo-text-container">
                        <p id="logo-text">Hum</p>
                        <p id="logo-description">Policies made easy</p>
                    </div>
                </a>
            </div>
        );
    }

}