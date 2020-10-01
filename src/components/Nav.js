import React, {Component} from "react";
import {connect} from 'react-redux';
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";
import NavItem from "./NavItem";

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            headerClass: "",
            headerHeight: "",
            scrollBelowTrigger: false
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.headerRef = React.createRef();
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({headerHeight: this.headerRef.current.offsetHeight});
    }

    handleScroll(event) {
        const FUDGE_FACTOR = 50;

        if (window.scrollY > (this.state.headerHeight + FUDGE_FACTOR) && this.headerRef.current.className !== "small") {
            this.setState({headerClass: "small"});
        } else if (window.scrollY <= this.state.headerHeight - FUDGE_FACTOR && this.headerRef.current.className === "small"){
            this.setState({headerClass: ""});
        }
    }

    render() {
        return (
            <div className="header-container">
                <header className={this.state.headerClass} ref={this.headerRef}>
                    <div id="header-image-bg"></div>
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
                <LanguageToggle className={this.state.headerClass} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Nav);