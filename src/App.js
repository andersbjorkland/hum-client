import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Content from "./components/Content";
import LoadingIndicator from "./components/utility/LoadingIndicator";
import Logo from "./components/Logo";
import LanguageToggle from "./components/LanguageToggle";
import About from "./components/About";


class App extends Component {
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

    handleScroll() {
        const FUDGE_FACTOR = 50;

        if (window.scrollY > (this.state.headerHeight + FUDGE_FACTOR) && this.headerRef.current.className !== "small") {
            this.setState({headerClass: "small"});
        } else if (window.scrollY <= this.state.headerHeight - FUDGE_FACTOR && this.headerRef.current.className === "small"){
            this.setState({headerClass: ""});
        }
    }

    render() {
        const page = this.props.contentReducer.page;
        const translation = this.props.contentReducer.translation;

        return (
        <div>
            <Router>
                <div className="header-container">
                    <header className={this.state.headerClass} ref={this.headerRef}>
                        <div id="header-image-bg"></div>
                        <Logo />

                        <nav>
                            <div>
                                <div id="main-nav">
                                    <Link to="/">
                                        <span className={ page === "/" ? "active" : ""}>{translation.home}</span>
                                    </Link>
                                    <Link to="/about">
                                        <span className={ page === "library" ? "active" : ""}>{translation.library}</span>
                                    </Link>
                                    <Link to="/about">
                                        <span className={ page === "about" ? "active" : ""}>{translation.about}</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>

                    </header>
                    <LanguageToggle className={this.state.headerClass} />
                </div>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        {this.props.asyncReducer.isFetching ? <LoadingIndicator /> : <Content />}
                    </Route>

                </Switch>
            </Router>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);