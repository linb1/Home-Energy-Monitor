Note: This guide assumes you have a raspberry pi setup and ready to work. There are many far better guides that would explain better than we could such as out there such as (**https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up**)


## Installation Process For the Temperature and Humidity Sensor, and Energy Plugs:

1 - Download the code in the software branch into the home directory of your raspberry pi.

2 - Follow this guide **https://www.definit.co.uk/2018/07/monitoring-temperature-and-humidity-with-a-raspberry-pi-3-dht22-sensor-influxdb-and-grafana/** to setup the software for the temperature and humidity sensor. It is easy to follow and it will run you through how to download the AdaFruit_Python_DHT repository, how to download and enable influxdb and how to create a database for the temperature and humidity data, and how to install and connect your databases to a grafana server which displays the data.

3 - Create a second database for the energy plug data the same way you did in step 2.

4 - Edit the variables **user, password and dbname** in tempsensor.py and energyplug.py to match what you set your databases to. Additionally, in these two scripts, change **host** to the IP address of your Raspberry Pi which can be found by running **ifconfig** in the command line.

5 - For the energy plugs, use **pip install pyvesync_v2** in the command line to download the Vesync devices repository, which will help you collect data from the plugs.

6 - In energyplug.py, change line 26 (*manager = VeSync("email","password")*) which has the username and password to log into your Vesync account, to match the account you created while setting up the energyplug (check README_Hardware.md for information on this).

7 - Finally, you need to setup the services. You need to do this for both launchtemp.sh and launchplug.sh. 

First, run this for each service: 

> sudo systemctl edit --force --full launchtemp.service
> 
> sudo systemctl edit --force --full launchplug.service

And edit the content to match launchtemp.service and launchplug.service in this repository.
Finally, you need to start and enable the services using this for each service:

> sudo systemctl enable launchtemp.service
> 
> sudo systemctl start launchtemp.service
> 
> sudo systemctl enable launchplug.service
> 
> sudo systemctl start launchplug.service

With this the services and your data collection codes are ready. If your hardware is setup properly, these scripts should run immediately on startup.
