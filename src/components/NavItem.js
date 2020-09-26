import React, {Component} from "react";

export default class NavItem extends Component {
    render() {
        if (this.props.current) {
            return (
                <div id={this.props.id} className="active"><a href={this.props.navPath}>{this.props.text}</a></div>
            );
        } else {
            return (
                <div id={this.props.id} ><a href={this.props.navPath}>{this.props.text}</a></div>
            );
        }

    }
}