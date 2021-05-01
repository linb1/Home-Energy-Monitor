# Greener Living

This is the Github Repository for Team 18: Greener Living of the Boston University 2020/2021 Senior Design Projects.
 
Goals
With the rise of many environmental issues in the 21st century, it is more important than ever to reduce our individual carbon footprint. By having access to one's utility usage at all times, it becomes easier to make energy- efficient decisions without relying solely on the monthly bill. This project consists of sensors that log relevant data about the user’s household, a database that stores the information collected, and a web application that visualizes the data using graphs and charts. Our approach is to install a monitor and sensors to measure the home’s electricity, temperature, and humidity at a constant rate throughout the day. Then, using the home’s local network, they will write the data to our database, which our web application and other tools will be able to access to provide an end-to-end product. The main feature of this project is the system's ability to update at a constant rate, providing accurate information whenever the user uses the web application. As a result, the user can see a detailed analysis of their energy usage than they would get from their monthly bill.

The goal of our project is to create a system of sensors that records various data in a house such temperature, humidity and the energy used by different appliances, then show this data in an easy-to-see, intuitive way on a local website.
 
Description
Greener Living is a web application with a hardware component that allows for monitoring energy usage in real-time. 

The hardware components consist of DHT sensors for measuring the temperature and humidity in a room, while the smart plugs allow for direct energy reading from any appliance with the help of the IoTaWatt. The IoTaWatt reads this data and sends it to the Raspberry which in turn, writes the data to our software components beginning with InfluxDB and Grafana. 

InfluxDB stores the data collected while Grafana uses it to form graphs. Using iframes in our web-application, we utilize the information to display it properly so that users can monitor their energy usage in real time and can view data as far as a year prior. Our notifications tell the user if there is any issue such as a spike or a drop in energy consumption which can help the user identify any issues with their appliances. Our weather API also allows for the user to see current temperatures in any city they search for. This can help users compare the indoor temperature monitored by the hardware with outside temperatures.

Design
Our website consists of a homepage in which the user can see visualizations of data such as yearly electricity rates and yearly dioxide emissions for Massachusetts. It contains a navigation bar that allows users to click on several options; Home, Appliances, Rooms, Costs, Notifications, and Weather.

Appliances displays energy consumption for several appliances selected from a dropdown menu and can show data in the form of hourly, daily, weekly, and monthly.

Rooms contains the data captured by the DHT sensors. This includes real time data of temperature and humidity within the room that the device is placed in.

Costs contains information about how much energy it is costing the user in several forms such as hourly, daily, weekly, and monthly.

Notifications displays alerts detected when querying.

Weather contains a searchable weather API for any city in which the user wants to search for. It will display the current weather conditions including temperature, sky conditions, and time and place as well.
 
## Repository TOC
Software
Images
node_modules
Reports
Website
README.md
README_Hardware.md
README_Software.md
Package-lock.json
 
## Visuals
![flowchart.jpg](https://github.com/BostonUniversitySeniorDesign/21-18-GreenerLiving/tree/master/images/flowchart.jp)
![plugsandiota.png](https://github.com/BostonUniversitySeniorDesign/21-18-GreenerLiving/tree/master/images/plugsandiota.png)
![sensor.png](https://github.com/BostonUniversitySeniorDesign/21-18-GreenerLiving/tree/master/images/sensor.png)
![tempschemtaic.png](https://github.com/BostonUniversitySeniorDesign/21-18-GreenerLiving/tree/master/images/tempschemtaic.png)
![appliancespage.png](https://github.com/BostonUniversitySeniorDesign/21-18-GreenerLiving/tree/master/images/appliancespage.png)


## Installation
To setup the hardware, checkout **README_Hardware.md.**

To setup the software, checkout **README_Software.md.**
 
Once set up, use the package manager [Node](https://nodejs.org/en/download/) to install Node JS.
 
Then use the command [npm](https://docs.npmjs.com/about-npm) to install packages needed to run React JS.
 
```bash
npm install
```
 
## Support
Please refer to README_Software and README_Hardware for technical specifications and details.
For other resources, please visit the following links for documentation:
 
[React JS](https://reactjs.org/)
[InfluxDB](https://docs.influxdata.com/influxdb/v1.8/introduction/get-started/)
[Grafana](https://grafana.com/docs/)
[IoTaWatt](https://docs.iotawatt.com/en/02_05_12/)
[Raspberry Pi](https://pimylifeup.com/raspberry-pi-humidity-sensor-dht22/#:~:text=The%20DHT22%20is%20a%20versatile,away%20from%20the%20Raspberry%20Pi.)
 
## Contributing
Pull requests are welcome. Pull the master repository and make any changes in a separate branch and commit to that branch until you are sure everything is working correctly. 
 
To get started, you must first make sure that you are in the website directory. From there, run “npm install.” Once all the packages are installed, you can run the web-application with “npm start.” A window should open up in your default web browser and will display the web-application and all its features. If the hardware is not installed and connected, it will not display any graphs but it will still show the structure of the website and the APIs. You do not need the hardware connected to make website changes. React allows for you to see changes in real-time.
 
Please make sure to update as appropriate.
 
 
## Authors and Acknowledgment
Thanks to everyone on the Greener Living Team for contributing in the completion of the project:
Jovany Vazquez
Brian Lin
Jason Hu
Ali Areiqat
Yang Hang Liu
 
## Project status
The project is complete and operating as required by the client
