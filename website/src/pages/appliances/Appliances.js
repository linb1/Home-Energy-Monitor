import React, { Component } from 'react';
import CustomSelect from '../dropdowncomponent/CustomSelect';
import ButtonGroup from '../buttongroupcomponent/ButtonGroup';
import { ApplianceSelectData } from './ApplianceSelectData'
import './Appliances.css';
import axios from 'axios';
import { query } from 'influx-api';

const influx_url = 'http://localhost:8086';
const eia_url = 'http://api.eia.gov/series/?api_key=f9cade4e03536c5e212cc61313cfb4ac&series_id=ELEC.PRICE.MA-ALL.A';
var DB_valueHR , DB_valueDAY , DB_valueWEEK , DB_valueMONTH ;

const divStyle = {
    background: '#141619',
    color: 'white',
    fontSize: '25px',
    //border: '2px solid white',
    width: '300px',
    height: '150px',
    position: 'absolute',
    bottom: '600px',
    left: '1500px',
    paddingLeft: '20px',
    display: 'inline',
};

const divStyle2 = {

    fontSize: '50px',

};

var currentdate = new Date();
var monthago = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
var weekago = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
var dayago = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
var hourago = new Date(new Date().getTime() - (60 * 60 * 1000));


const now = currentdate.getUTCFullYear() + "-"
    + (currentdate.getUTCMonth() + 1) + "-"
    + currentdate.getUTCDate() + "T"
    + currentdate.getUTCHours() + ":"
    + currentdate.getUTCMinutes() + ":"
    + currentdate.getUTCSeconds() + "Z";

const lastmonth = monthago.getUTCFullYear() + "-"
    + (monthago.getUTCMonth() + 1) + "-"
    + monthago.getUTCDate() + "T"
    + monthago.getUTCHours() + ":"
    + monthago.getUTCMinutes() + ":"
    + monthago.getUTCSeconds() + "Z";

const lastweek = weekago.getUTCFullYear() + "-"
    + (weekago.getUTCMonth() + 1) + "-"
    + weekago.getUTCDate() + "T"
    + weekago.getUTCHours() + ":"
    + weekago.getUTCMinutes() + ":"
    + weekago.getUTCSeconds() + "Z";

const lastday = dayago.getUTCFullYear() + "-"
    + (dayago.getUTCMonth() + 1) + "-"
    + dayago.getUTCDate() + "T"
    + dayago.getUTCHours() + ":"
    + dayago.getUTCMinutes() + ":"
    + dayago.getUTCSeconds() + "Z";

const lasthr = hourago.getUTCFullYear() + "-"
    + (hourago.getUTCMonth() + 1) + "-"
    + hourago.getUTCDate() + "T"
    + hourago.getUTCHours() + ":"
    + hourago.getUTCMinutes() + ":"
    + hourago.getUTCSeconds() + "Z";

console.log(now);
console.log(lastmonth);
console.log(lastweek);
console.log(lastday);
console.log(lasthr);

export const getData_eia = async () => {
    try {
        const data = await axios.get(eia_url);
        //const data_edge = await axios.get(url_edge);
        //edge_value = data_edge.timeFrameEnergy.Energy;
        //console.log(JSON.stringify(data, null, 2));
        //console.log(dataS.data.series[0].data[0]);
        //console.log(data.indexOf('2019'));
        //console.log(data);
        return data.data.series[0].data[0][1];
    } catch (error) {
        return error;
    }
}


export const getData_influx = async (qtype, measurement, length, database) => {
    var period;
    if (length == 0) {
        period = '1970-01-01T00:00:00Z';
    }
    else if (length == 'month') {
        period = lastmonth;
    }
    else if (length == 'week') {
        period = lastweek;
    }
    else if (length == 'day') {
        period = lastday;
    }
    else if (length == 'hour') {
        period = lasthr;
    }

    if (period[6] == '-') {
        period = period.substring(0, 5) + '0' + period.substring(5, period.length);
    }

    if (period[9] == 'T') {
        period = period.substring(0, 8) + '0' + period.substring(8, period.length);
    }
    //console.log(period);
    var request = 'SELECT ' + qtype + '(*) FROM ' + '"' + measurement + '"' + ' WHERE time >= ' + "'" + period + "'";
    //console.log(request);
    try {
        const result = await query({
            url: influx_url,
            q: request,
            db: database
        });
        console.log(result.data.results[0].series[0].values[0][1]);
        return result.data.results[0].series[0].values[0][1];
    } catch (error) {
        return 'NA';
    }
}

async function logData() {
    var gotData_hr = await getData_influx('mean', 'electricity_usage', 'hour', 'test_data');
    var gotData_day = await getData_influx('mean', 'electricity_usage', 'day', 'test_data');
    var gotData_week = await getData_influx('mean', 'electricity_usage', 'week', 'test_data');
    var gotData_month = await getData_influx('mean', 'electricity_usage', 'month', 'test_data');

    DB_valueHR = gotData_hr;
    DB_valueDAY = gotData_day;
    DB_valueWEEK = gotData_week;
    DB_valueMONTH = gotData_month;
}

async function logData_eia() {
    const gotData = await getData_eia();
    console.log(gotData);
    return gotData;
}

// DB_value = await logData();
logData();
logData_eia();



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
