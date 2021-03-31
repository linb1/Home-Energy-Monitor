#credit to a response on stackoverflow for helping me figuring out this method
#The stackoverflow thread is here: https://stackoverflow.com/questions/63021166/how-to-restart-a-python-program-after-it-crashes

from subprocess import run
from time import sleep

# The assumption here is that these programs are in the home directory, otherwise, I need to include their location.
file_path1 = "temp.py"
file_path2 = "energy.py"

restart_timer = 30
def start_script():
    try:
        run("python "+file_path1, check=True)
        run("python "+file_path2, check=True) 
    except:
        handle_crash()

def handle_crash():
    sleep(restart_timer)
    start_script()

start_script()
