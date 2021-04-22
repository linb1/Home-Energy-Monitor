import React, { Component } from 'react';
import CustomSelect from '../dropdowncomponent/CustomSelect';
import ButtonGroup from '../buttongroupcomponent/ButtonGroup';
import './Rooms.css'
import { RoomSelectData } from './RoomSelectData'
import { currenthumidity, currenttemperature } from './RoomInfluxQuery'

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomvalue: 'office',
            timevalue: 'hour',
            roomName: 'Office'
        }
    }
    

    roomCallbackFunction = (roomval) => {
        this.setState({roomvalue: roomval});
    }

    timeCallbackFunction = (timeval) => {
        this.setState({timevalue: timeval});
    }   

    renderSwitchGrafana(timeandapp) {
        switch(timeandapp) {
            case 'officehour':
                this.state.roomName = 'Office';
                return <iframe src="http://localhost:8989/d-solo/r3TMSO_Gk/hour?orgId=1&refresh=5s&panelId=2" width="800" height="500" frameborder="1"></iframe>;
            case 'officeday':
                this.state.roomName = 'Office';
                return <iframe src="http://localhost:8989/d-solo/e6XqSdlGk/day?orgId=1&refresh=5s&panelId=8" width="800" height="500" frameborder="1"></iframe>;
            case 'officeweek':
                this.state.roomName = 'Office';
                return <iframe src="http://localhost:8989/d-solo/bVhWNd_Mk/week?orgId=1&refresh=5s&panelId=8" width="800" height="500" frameborder="1"></iframe>;
            case 'officemonth':
                this.state.roomName = 'Office';
                return <iframe src="http://localhost:8989/d-solo/T1XNNdlMz/month?orgId=1&refresh=5s&panelId=8" width="800" height="500" frameborder="1"></iframe>;
            default:
                return <iframe src="http://localhost:8989/d-solo/r3TMSO_Gk/hour?orgId=1&refresh=5s&panelId=2" width="800" height="500" frameborder="1"></iframe>;
        }
    }

    render(){
        let timeandroom = this.state.roomvalue+this.state.timevalue;
        let temperature = parseInt(currenttemperature, 10);
        let humidity = parseInt(currenthumidity, 10);

        return (
            <div className='rooms'>

                <div className='rooms-controls'>
                    <CustomSelect sendData={this.roomCallbackFunction} data={RoomSelectData} name='Rooms'/>
                    <ButtonGroup timeCallback={this.timeCallbackFunction}/>
                </div>

                {this.renderSwitchGrafana(timeandroom)}

                <div className='readings'>
                    <div className='readings-wrapper'>
                        Current temperature is 
                        <div className='readings-text'>
                        {temperature}
                        </div>
                        °C in {this.state.roomName}
                    </div>

                    <div className='readings-wrapper'>
                        Current humidity is 
                        <div className='readings-text'>
                        {humidity}%
                        </div>
                        in {this.state.roomName}
                    </div>
                </div>

            </div>
        )


    }
}

export default Rooms;

