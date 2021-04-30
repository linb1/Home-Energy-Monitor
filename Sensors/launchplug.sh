# This is a file that runs for startup by a custom service that needs to be coded and implemented
# Credit to this github thread for the help: https://raspberrypi.stackexchange.com/questions/78991/running-a-script-after-an-internet-connection-is-established/79033

#!/bin/sh
# launchplug.sh

cd /
cd home/pi
sudo python energyplug.py
cd /
