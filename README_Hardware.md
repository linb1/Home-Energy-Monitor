## Setting up the Temperature and Humidity Sensor:
This process is really simple:

You simply need a Raspberry Pi with pinouts, the DHT22 temperature and humidity sensor and female to female jumper wires.

Using the wires, connect the DHT22's (+) pin to the Pi's Pin 1, the DHT22's (out) pin to the Pi's Pin 7, and the DHT22's (-) pin to the Pi's Pin 6. 

That's it! The software will do the rest of the work.

## Setting up the Etekcity ESW15 Energy plugs:

You need the plugs and a 2.4 GHz wifi connection. Then can be made using a WiFi hotspot using your phone or laptop.
Again setting this up is very simple:

1 - Download the Vesync app, and create an account to use. 

2 - Place the energy plug into power and press on the power button for 10 seconds or till it blinks rapidly. 

3 - While connected to the 2.4 GHz connection, use the app to go through the steps of adding a new device. 

At the end, you should be able to see that it's on and you should be able to use the app to turn the plug's night light on and off. If that works, then you are set. The software will take care of everything else but you need to enter the information of the account you created into the data collection script (**check out README_Software.md for more information about this**).
