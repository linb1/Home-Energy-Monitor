import React, { Component } from 'react';
import CustomSelect from '../dropdowncomponent/CustomSelect';
import ButtonGroup from '../buttongroupcomponent/ButtonGroup';
import { ApplianceSelectData } from './ApplianceSelectData'
import './Appliances.css';

class Appliances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appliancevalue: 'laptop',
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
            case 'laptophour':
                return <iframe src="http://localhost:8989/d-solo/r3TMSO_Gk/hour?orgId=1&refresh=5s&panelId=4" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptopday':
                return <iframe src="http://localhost:8989/d-solo/e6XqSdlGk/day?orgId=1&refresh=5s&panelId=2" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptopweek':
                return <iframe src="http://localhost:8989/d-solo/bVhWNd_Mk/week?orgId=1&refresh=5s&panelId=2" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptopmonth':
                return <iframe src="http://localhost:8989/d-solo/T1XNNdlMz/month?orgId=1&refresh=5s&panelId=2" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptoptwohour':
                return <iframe src="http://localhost:8989/d-solo/r3TMSO_Gk/hour?orgId=1&refresh=5s&panelId=8" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptoptwoday':
                return <iframe src="http://localhost:8989/d-solo/e6XqSdlGk/day?orgId=1&refresh=5s&panelId=6" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptoptwoweek':
                return <iframe src="http://localhost:8989/d-solo/bVhWNd_Mk/week?orgId=1&refresh=5s&panelId=6" width="1000" height="600" frameborder="1"></iframe>;
            case 'laptoptwomonth':
                return <iframe src="http://localhost:8989/d-solo/T1XNNdlMz/month?orgId=1&refresh=5s&panelId=6" width="1000" height="600" frameborder="1"></iframe>;
            case 'heaterhour':
                return <iframe src="http://localhost:8989/d-solo/r3TMSO_Gk/hour?orgId=1&refresh=5s&panelId=6" width="1000" height="600" frameborder="1"></iframe>;
            case 'heaterday':
                return <iframe src="http://localhost:8989/d-solo/e6XqSdlGk/day?orgId=1&refresh=5s&panelId=4" width="1000" height="600" frameborder="1"></iframe>;
            case 'heaterweek':
                return <iframe src="http://localhost:8989/d-solo/bVhWNd_Mk/week?orgId=1&refresh=5s&panelId=4" width="1000" height="600" frameborder="1"></iframe>;
            case 'heatermonth':
                return <iframe src="http://localhost:8989/d-solo/T1XNNdlMz/month?orgId=1&refresh=5s&panelId=4" width="1000" height="600" frameborder="1"></iframe>;
            default:
                return <iframe src="http://localhost:8989/d-solo/r3TMSO_Gk/hour?orgId=1&refresh=5s&panelId=4" width="1000" height="600" frameborder="1"></iframe>;
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
