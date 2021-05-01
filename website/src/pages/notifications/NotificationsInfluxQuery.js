import { query } from 'influx-api';


const influx_url = 'http://10.0.0.61:8086';
var iota_valueMIN, humid_valueMIN;
var alerts_appliance = [];
var alerts_rooms = [];

var minuteago = new Date(new Date().getTime() - (60 * 1000));

const lastmin = minuteago.getUTCFullYear() + "-"
    + (minuteago.getUTCMonth() + 1) + "-"
    + minuteago.getUTCDate() + "T"
    + minuteago.getUTCHours() + ":"
    + minuteago.getUTCMinutes() + ":"
    + minuteago.getUTCSeconds() + "Z";


export const getData_influx = async (qtype, field, measurement, length, source, name, database) => {
    var period;
    if (length == 0) {
        period = '1970-01-01T00:00:00Z';
    }
    else if (length == 'minute') {
        period = lastmin;
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
    
    var iotarequest = 'SELECT ' + qtype + '('+ field +') FROM ' + '"' + measurement + '"' + ' WHERE time >= ' + "'" + period + "'" + ' and ' + source + ' = ' + "'" + name + "'";
    try {
        const result = await query({
            url: influx_url,
            q: iotarequest,
            db: database
        });
        if(result.data.results[0].series[0].values[0][1]<=15)
        {
            alerts_appliance.push(name + " does not seem to be working properly");
        }
        return result.data.results[0].series[0].values[0][1];
    } catch (error) {
        alerts_appliance.push(name + " does not seem to be working properly");
        return 'NA';
    }
}

export const getData_dht = async (qtype, field, measurement, length, database) => {
    var period;
    if (length == 0) {
        period = '1970-01-01T00:00:00Z';
    }
    else if (length == 'minute') {
        period = lastmin;
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
    
    var iotarequest = 'SELECT ' + qtype + '('+ field +') FROM ' + '"' + measurement + '"' + ' WHERE time >= ' + "'" + period + "'";
    try {
        const result = await query({
            url: influx_url,
            q: iotarequest,
            db: database
        });
        if(result.data.results[0].series[0].values[0][1]<=15)
        {
            alerts_rooms.push("DHT-22 Sensor does not seem to be working properly");
        }
        return result.data.results[0].series[0].values[0][1];
    } catch (error) {
        alerts_rooms.push("DHT-22 Sensor does not seem to be working properly");
        return 'NA';
    }
}

async function logData() {
    var gotData_minute = await getData_influx('sum', 'Watts', 'iotawatt', 'minute', 'ct', 'laptop', 'iota');
    var gotData_mean = await getData_influx('mean', 'Watts', 'iotawatt', 0 , 'ct', 'laptop', 'iota');
    var gotData_STD = await getData_influx('STDDEV', 'Watts', 'iotawatt', 0 , 'ct', 'laptop', 'iota');
    var gotData_humidity = await getData_dht('mean', 'humidity', 'rpi-dht22', 'minute', 'sensing');
    if(gotData_minute > (gotData_mean + (2*gotData_STD)))
    {
        alerts_appliance.push("Abnormal readings detected");
    }

    iota_valueMIN = gotData_minute;
    humid_valueMIN = gotData_humidity;
}



export { iota_valueMIN, humid_valueMIN, alerts_rooms, alerts_appliance };


logData();

