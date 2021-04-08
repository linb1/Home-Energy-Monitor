import React, { Component } from 'react';
import ButtonGroup from '../buttongroupcomponent/ButtonGroup';
import './Costs.css'
import { DB_valueHR, DB_valueDAY, DB_valueWEEK, DB_valueMONTH, cost_HR, cost_DAY, cost_WEEK, cost_MONTH } from './CostsInfluxQuery'

class Costs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timevalue: 'hour'
        }
    }


    timeCallbackFunction = (timeval) => {
        this.setState({timevalue: timeval});
    }   
    /*

    renderSwitchGrafana(timeandapp) {
        switch(timeandapp) {
            case 'hour':
                return <iframe src="http://localhost:8989/d-solo/TajguHyMk/python-generated-data-5-minutes?orgId=1&refresh=5s&panelId=4" width="700" height="400" frameborder="0"></iframe>;
            case 'day':
                return <iframe src="http://localhost:8989/d-solo/o76zFDsMk/python-generated-data-15-minutes?orgId=1&refresh=5s&panelId=2" width="700" height="400" frameborder="0"></iframe>;
            case 'week':
                return <iframe src="http://localhost:8989/d-solo/ofXpKDsGk/python-generated-data-30-minutes?orgId=1&refresh=5s&panelId=2" width="700" height="400" frameborder="0"></iframe>;
            default:
                return <iframe src="http://localhost:8989/d-solo/J2EclS_Mk/iotawatt-test?orgId=1&panelId=2" width="450" height="200" frameborder="0"></iframe>
        }
    }
    */

    render(){
        let time = this.state.timevalue;
        let estimatedhour = parseFloat(cost_HR, 10).toFixed(2);
        let estimatedday = parseFloat(cost_DAY, 10).toFixed(2);
        let estimatedweek = parseFloat(cost_WEEK, 10).toFixed(2);
        let estimatedmonth = parseFloat(cost_MONTH, 10).toFixed(2);

        return (
            <div className='costs'>
                <div className='costs-controls'>
                   {/*<ButtonGroup timeCallback={this.timeCallbackFunction}/>*/} 
                   <div className='stat-wrapper'>
                        You have spent an estimated cost of
                        <div className='stat-text'>
                        ${estimatedhour}
                        </div>
                        in the last hour
                    </div>

                    <div className='stat-wrapper'>
                        You have spent an estimated cost of
                        <div className='stat-text'>
                        ${estimatedday}
                        </div>
                        in the last day
                    </div>

                    <div className='stat-wrapper'>
                        You have spent an estimated cost of
                        <div className='stat-text'>
                        ${estimatedweek}
                        </div>
                        in the last week
                    </div>

                    <div className='stat-wrapper'>
                        You have spent an estimated cost of
                        <div className='stat-text'>
                        ${estimatedmonth}
                        </div>
                        in the last month
                    </div>
                </div>
                {/*{this.renderSwitchGrafana(time)}*/}
            </div>
        )


    }
}

export default Costs;