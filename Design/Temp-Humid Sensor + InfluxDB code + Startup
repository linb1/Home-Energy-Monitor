# Credit to Sam McGeown and his guide here(https://www.definit.co.uk/2018/07/monitoring-temperature-and-humidity-with-a-raspberry-pi-3-dht22-sensor-influxdb-and-grafana/)
#It helped me a lot setting this sensor up

# To enable the program on startup I used sudo nano /etc/rc.local to open rc.local and modified it by adding a line python /home/pi/energy.py &
# Modifying rc.local will ensure that the program runs on start up 

import time
import sys
import datetime
import Adafruit_DHT
from influxdb import InfluxDBClient

host = "169.254.244.215" # host ip address
port = 8086 # default port
user = "pepe1" # the user/password created for the pi
password = "kek" 
dbname = "sensor_data" # created database
interval = 3 # Sample period in seconds

client = InfluxDBClient(host, port, user, password, dbname)

sensor = Adafruit_DHT.DHT22
sensor_gpio = 4

measurement = "rpi-dht22"
location = "office"
try:
    while True:
        humidity, temperature = Adafruit_DHT.read_retry(sensor, sensor_gpio)
        iso = time.ctime()
        data = [
        {
          "measurement": measurement,
              "tags": {
                  "location": location,
              },
              "time": iso,
              "fields": {
                  "temperature" : temperature,
                  "humidity": humidity
              }
          }
        ]   
	client.write_points(data)
        time.sleep(interval)


except KeyboardInterrupt:
    pass
