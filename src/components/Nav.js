import React, {Component} from "react";
import {connect} from 'react-redux';
import Logo from "./Logo";
import NavItem from "./NavItem";

class Nav extends Component {
    render() {
        return (
            <header>
                <Logo />
                <nav>
                    <div>
                        <div id="main-nav">
                            <NavItem id={"home"} current={this.props.page === "home"} navPath={"/"}
                                     text={this.props.contentReducer.translation.home} />
                            <NavItem id={"library"} current={this.props.page === "library"} navPath={"#"}
                                     text={this.props.contentReducer.translation.library} />
                            <NavItem id={"about"} current={this.props.page === "about"} navPath={"#"}
                                     text={this.props.contentReducer.translation.about} />
                            <NavItem id={"contact"} current={this.props.page === "contact"} navPath={"#"}
                                     text={this.props.contentReducer.translation.contact} />
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Nav);