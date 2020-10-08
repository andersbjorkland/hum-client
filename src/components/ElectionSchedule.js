import React, {Component} from "react";
import {connect} from "react-redux";
import euFlag from '../images/eu.svg';
import seFlag from '../images/se.svg';

class ElectionSchedule extends Component {


    render() {
        return (
            <div id={"election-schedule"} className={"side-content"}>
                <h2>{this.props.contentReducer.translation.election.header}</h2>
                <h3 className={"thin"}>{this.props.contentReducer.translation.election.subtitle}</h3>
                <div className={"flex-row"}>
                    <div className={"info-container"}>
                        <img src={seFlag} alt={this.props.contentReducer.translation.election.imgAlt.SE} />
                        <p>11 {this.props.contentReducer.translation.month.sep} 2022</p>
                    </div>
                    <div className={"info-container"}>
                        <img src={euFlag} alt={this.props.contentReducer.translation.election.imgAlt.EU} />
                        <p>6 {this.props.contentReducer.translation.month.jun} 2024</p>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ElectionSchedule);