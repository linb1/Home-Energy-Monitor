import axios from 'axios';
import { query } from 'influx-api';

const influx_url = 'http://10.0.0.61:8086';
const eia_url = 'http://api.eia.gov/series/?api_key=f9cade4e03536c5e212cc61313cfb4ac&series_id=ELEC.PRICE.MA-ALL.A'; //rate data
const eia_url2 = 'http://api.eia.gov/series/?api_key=f9cade4e03536c5e212cc61313cfb4ac&series_id=ELEC.SALES.MA-RES.A'; //total sales data residential
const eia_url3 = 'http://api.eia.gov/series/?api_key=f9cade4e03536c5e212cc61313cfb4ac&series_id=EMISS.CO2-TOTV-TT-TO-MA.A'; //total MA carbon emissions

var rate, total, year;
var years = [];
var years_carbon = [];
var rates = [];
var emissions = [];
var currentdate = new Date();

year = currentdate.getUTCFullYear();


export const getData_eia = async () => {
    try {
        const data = await axios.get(eia_url);
        const data2 = await axios.get(eia_url2);
        const data3 = await axios.get(eia_url3);
        console.log(data);
        for (var i = 0; i < 10; i++) {
            rates[i] = data.data.series[0].data[i][1];
            years[i] = data.data.series[0].data[i][0];
            emissions[i] = data3.data.series[0].data[i][1];
            years_carbon[i] = data3.data.series[0].data[i][0];
          } 
        return [data.data.series[0].data[0][1],data2.data.series[0].data[0][1]];
    } catch (error) {
        return error;
    }
}

async function logData_eia() {
    const gotData = await getData_eia();
    rate = gotData[0].toFixed(2);
    total = gotData[1].toFixed(2);
}

export {rate, rates, year, total, years, years_carbon, emissions};

logData_eia();
