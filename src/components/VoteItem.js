import React, {Component} from "react";
import {connect} from 'react-redux';

import CircleDiagram from "./CircleDiagram";

class VoteItem extends Component {

    render() {
        let source;
        let voteSign;

        voteSign = this.props.contentReducer.vote.yes > this.props.contentReducer.vote.no ? <span className="vote-sign yes">✓</span> : <span className="vote-sign no">✕</span>;

        source = this.props.contentReducer.policy.source ?
            <p>{this.props.contentReducer.translation.source + ": "}
                <a href={this.props.contentReducer.policy.source} target="_blank" rel="noopener noreferrer">{this.props.contentReducer.policy.source}</a></p>
            : "";
        return (
            <div className="vote-item content-item">
                <div className="item-header">
                    <h2>{this.props.contentReducer.policy.title}</h2>
                    <p className="sub-heading">{this.props.contentReducer.translation.policySubheading}</p>
                </div>
                <p>{this.props.contentReducer.policy.content}</p>
                { source }

                <div className="vote-result">
                    <div className="vote-sign-container">
                        { voteSign }
                    </div>
                    <div className="result-summary">
                        <p>{this.props.contentReducer.translation.yes}:</p><p>{this.props.contentReducer.vote.yes}</p>
                        <p>{this.props.contentReducer.translation.no}:</p><p>{this.props.contentReducer.vote.no}</p>
                        <p>{this.props.contentReducer.translation.abstain}:</p><p>{this.props.contentReducer.vote.abstain}</p>
                        <p className="cursive">{this.props.contentReducer.translation.absent}:</p><p>{this.props.contentReducer.vote.absent}</p>
                    </div>
                    <CircleDiagram />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
export default connect(mapStateToProps)(VoteItem);