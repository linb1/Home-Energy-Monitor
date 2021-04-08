import axios from 'axios';
import { query } from 'influx-api';

const influx_url = 'http://10.0.0.61:8086';
const eia_url = 'http://api.eia.gov/series/?api_key=f9cade4e03536c5e212cc61313cfb4ac&series_id=ELEC.PRICE.MA-ALL.A';
var currenttemperature, currenthumidity;

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


export const getTempData_influx = async (database) => {
    var temprequest = 'SELECT temperature FROM "rpi-dht22" GROUP BY * ORDER BY DESC LIMIT 1'
    console.log(temprequest)
    try {
        const result = await query({
            url: influx_url,
            q: temprequest,
            db: database
        });
        return result.data.results[0].series[0].values[0][1];
    } catch (error) {
        return 'NA';
    }
}

export const getHumidData_influx = async (database) => {
    var humidrequest = 'SELECT humidity FROM "rpi-dht22" GROUP BY * ORDER BY DESC LIMIT 1'
    console.log(humidrequest)
    try {
        const result = await query({
            url: influx_url,
            q: humidrequest,
            db: database
        });
        return result.data.results[0].series[0].values[0][1];
    } catch (error) {
        return 'NA';
    }
}

async function logData() {
    var gotData_temp = await getTempData_influx('sensing');
    var gotData_humid = await getHumidData_influx('sensing');
    currenttemperature = gotData_temp;
    currenthumidity = gotData_humid;
}

export { currenthumidity, currenttemperature };


// DB_value = await logData();
logData();
