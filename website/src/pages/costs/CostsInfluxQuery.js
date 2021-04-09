import axios from 'axios';
import { query } from 'influx-api';


const influx_url = 'http://10.0.0.61:8086';
const eia_url = 'http://api.eia.gov/series/?api_key=f9cade4e03536c5e212cc61313cfb4ac&series_id=ELEC.PRICE.MA-ALL.A';
var DB_valueHR , DB_valueDAY , DB_valueWEEK , DB_valueMONTH, cost_HR, cost_DAY, cost_WEEK, cost_MONTH, rate;
var alerts_costs = [];

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


export const getData_eia = async () => {
    try {
        const data = await axios.get(eia_url);
        return data.data.series[0].data[0][1];
    } catch (error) {
        return error;
    }
}


export const getData_influx = async (qtype, field, measurement, length, source, name, database) => {
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

    if (period[12] == ':') {
        period = period.substring(0, 11) + '0' + period.substring(11, period.length);
    }

    if (period[15] == ':') {
        period = period.substring(0, 14) + '0' + period.substring(14, period.length);
    }
    
    var request = 'SELECT ' + qtype + '('+ field +') FROM ' + '"' + measurement + '"' + ' WHERE time >= ' + "'" + period + "'" + ' and ' + source + ' = ' + "'" + name + "'";
    try {
        const result = await query({
            url: influx_url,
            q: request,
            db: database
        });
        if(result.data.results[0].series[0].values[0][1]==0)
        {
            alerts_costs.push( name + " does not seem to be running after running " + qtype + ' query for ' + length);
        }
        return result.data.results[0].series[0].values[0][1];
    } catch (error) {
        alerts_costs.push( name + " does not seem to be connected after running " + qtype + ' query for ' + length);
        return 'NA';
    }
}

async function logData() {
    var gotData_hr = await getData_influx('sum', 'Watts', 'iotawatt', 'hour', 'ct', 'laptop', 'iota');
    var gotData_day = await getData_influx('sum', 'Watts', 'iotawatt','day', 'ct', 'laptop','iota');
    var gotData_week = await getData_influx('sum', 'Watts', 'iotawatt','week', 'ct', 'laptop','iota');
    var gotData_month = await getData_influx('sum', 'Watts', 'iotawatt','month', 'ct', 'laptop','iota');

    DB_valueHR = gotData_hr;
    DB_valueDAY = gotData_day;
    DB_valueWEEK = gotData_week;
    DB_valueMONTH = gotData_month;
    cost_HR = (gotData_hr/1000) * rate;
    cost_DAY = (gotData_day/1000) * rate;
    cost_WEEK = (gotData_week/1000) * rate;
    cost_MONTH = (gotData_month/1000) * rate;

}

async function logData_eia() {
    const gotData = await getData_eia();
    rate = gotData;
}

export { DB_valueHR, DB_valueDAY, DB_valueWEEK, DB_valueMONTH, cost_HR, cost_DAY, cost_WEEK, cost_MONTH, alerts_costs};


// DB_value = await logData();
logData();
logData_eia();
