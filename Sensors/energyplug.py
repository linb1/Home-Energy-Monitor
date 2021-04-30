# Credit to Sam McGeown and his guide here(https://www.definit.co.uk/2018/07/monitoring-temperature-and-humidity-with-a-raspberry-pi-3-dht22-sensor-influxdb-and-grafana/)
# Credit to Blake Hartshorn and his article here (https://www.blakehartshorn.com/monitoring-and-graphing-with-etekcity-vesync/) for the base code to use


# To enable the program on startup I used sudo nano /etc/rc.local to open rc.local and modified it by adding a line python /home/pi/energy.py &
# Modifying rc.local will ensure that the program runs on start up 

from pyvesync_v2.vesync import VeSync
import time
import sys
import datetime
import Adafruit_DHT
from influxdb import InfluxDBClient

# Configure InfluxDB connection variables
host = "169.254.196.152" # My Ubuntu NUC
port = 8086 # default port
user = "rpi-4" # the user/password created for the pi, with write access
password = "rpi-4" 
dbname = "monitor" # the database we created earlier
interval = 3 # Sample period in seconds

# Create the InfluxDB client object
client = InfluxDBClient(host, port, user, password, dbname)


manager = VeSync("alikat@bu.edu","12345678")
manager.login()

# Get/Update Devices from server - populate device lists
manager.update()


switch = manager.devices[0]

# think of measurement as a SQL table, it's not...but...
measurement = "rpi-moni"
# location will be used as a grouping tag later
location = "office"
# Run until you get a ctrl^c

try:
    while True:
        # Read the sensor using the configured driver and gpio
        iso = time.ctime()
        ener = switch.get_power() 
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
                  "energy" : ener,             
 }
          }
        ]
        # Send the JSON data to InfluxDB
	client.write_points(data)
        # Wait until it's time to query again...
	print(ener)
        time.sleep(interval)

except KeyboardInterrupt:
    pass