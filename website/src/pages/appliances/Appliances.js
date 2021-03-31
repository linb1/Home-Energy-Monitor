import React, { Component } from 'react';
import CustomSelect from '../dropdowncomponent/CustomSelect';
import ButtonGroup from '../buttongroupcomponent/ButtonGroup';
import { ApplianceSelectData } from './ApplianceSelectData'
import './Appliances.css';

class Appliances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appliancevalue: 'refrigerator',
            timevalue: 'hour'
        }
    }
    

    applianceCallbackFunction = (applianceval) => {
        this.setState({appliancevalue: applianceval});
    }

    timeCallbackFunction = (timeval) => {
        this.setState({timevalue: timeval});
    }   

    renderSwitchGrafana(timeandapp) {
        switch(timeandapp) {
            case 'refrigeratorhour':
                return <iframe src="http://localhost:8989/d-solo/TajguHyMk/python-generated-data-5-minutes?orgId=1&refresh=5s&panelId=4" width="700" height="400" frameborder="0"></iframe>;
            case 'refrigeratorday':
                return <iframe src="http://localhost:8989/d-solo/o76zFDsMk/python-generated-data-15-minutes?orgId=1&refresh=5s&panelId=2" width="700" height="400" frameborder="0"></iframe>;
            case 'refrigeratorweek':
                return <iframe src="http://localhost:8989/d-solo/ofXpKDsGk/python-generated-data-30-minutes?orgId=1&refresh=5s&panelId=2" width="700" height="400" frameborder="0"></iframe>;
            default:
                return <iframe src="http://localhost:8989/d-solo/TajguHyMk/python-generated-data-5-minutes?orgId=1&refresh=5s&panelId=4" width="700" height="400" frameborder="0"></iframe>;
        }
    }

    render(){
        let timeandapp = this.state.appliancevalue+this.state.timevalue;


        return (
            <div className='appliances'>
                <div className='appliances-controls'>
                    <CustomSelect sendData={this.applianceCallbackFunction} data={ApplianceSelectData} name='Appliances'/>
                    <ButtonGroup timeCallback={this.timeCallbackFunction}/>
                </div>
                {this.renderSwitchGrafana(timeandapp)}
            </div>
        )


    }
}

export default Appliances;
