# Credit to Sam McGeown and his guide here(https://www.definit.co.uk/2018/07/monitoring-temperature-and-humidity-with-a-raspberry-pi-3-dht22-sensor-influxdb-and-grafana/)
# Credit to Blake Hartshorn and his article here (https://www.blakehartshorn.com/monitoring-and-graphing-with-etekcity-vesync/) for the base code to use


from pyvesync_v2.vesync import VeSync
import time
import sys
import datetime
import Adafruit_DHT
from influxdb import InfluxDBClient

time.sleep(35)
# Configure InfluxDB connection variables
host = "10.0.0.61" # My Ubuntu NUC
port = 8086 # default port
user = "rpi-4" # the user/password created for the pi, with write access
password = "rpi-4" 
dbname = "monitor" # the database we created earlier
interval = 15 # Sample period in seconds

# Create the InfluxDB client object
client = InfluxDBClient(host, port, user, password, dbname)


manager = VeSync("email","password")
manager.login()

# Get/Update Devices from server - populate device lists
manager.update()


switch0 = manager.devices[0]
switch1 = manager.devices[1]
switch2 = manager.devices[2]
switch3 = manager.devices[3]

# think of measurement as a SQL table, it's not...but...
measurement = "rpi-moni"
# location will be used as a grouping tag later
location = "office"
# Run until you get a ctrl^c

try:
    while True:
        # Read the sensor using the configured driver and gpio
        iso = time.ctime()
        ener0 = switch0.get_power()
	ener1 = switch1.get_power() 
	ener2 = switch2.get_power() 
	ener3 = switch3.get_power() 
        # Print for debugging, uncomment the below line
        # Create the JSON data structure
        data = [
        {
          "measurement": measurement,
              "tags": {
                  "location": location,
              },
              "time": iso,
              "fields": {
                  "energy0" : ener0,
		  "energy1" : ener1,
		  "energy2" : ener2,
		  "energy3" : ener3,
 }
          }
        ]
        # Send the JSON data to InfluxDB
	client.write_points(data)
        # Wait until it's time to query again...
        time.sleep(interval)

except KeyboardInterrupt:
    pass
