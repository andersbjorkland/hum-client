import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import {connect} from "react-redux";

class CircleDiagram extends Component {
    render() {
        let yes = this.props.contentReducer.vote.yes;
        let no = this.props.contentReducer.vote.no;
        let abstain = this.props.contentReducer.vote.abstain;
        let total = yes + no + abstain;
        total = total === 0 ? 1 : total;
        const percentage = Math.round(yes / total * 100);
        const data = {
            labels: ['Yes', 'No', 'Abstain' ],
            datasets: [
                {
                    label: 'Voting',
                    backgroundColor: [
                        '#5eb5e0',
                        '#e0695e',
                        '#e0e0e0'
                    ],
                    hoverBackgroundColor: [
                        '#2e596e',
                        '#602d28',
                        '#5a5a5a'
                    ],
                    data: [yes, no, abstain]
                }
            ]
        };
        return (
            <div className="diagram-container">
                <div className="center-artefact">
                    {percentage + "%"}
                </div>
                <Doughnut
                    data={ data }
                    options={{
                        legend:{
                            display:false,
                        },
                        responsive : true,
                        maintainAspectRatio: true,
                        cutoutPercentage: 75
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
export default connect(mapStateToProps)(CircleDiagram);