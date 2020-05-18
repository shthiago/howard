import os

from flask import Flask, render_template
from flask_restx import Api
from flask_crontab import Crontab
from flask_cors import CORS
from loguru import logger

from src.core.connections import SpeedTestDAO
from src.core.speedtester import run_speed_test
from src.pages.index import home
from src.pages.speedtest_page import speedtest_page
from src.conf import LOGS_FILE, LOGS_FOLDER
from src.api.speedtest import api as speedtest_api


# Configure loggger
if not os.path.isdir(LOGS_FOLDER):
    os.mkdir(LOGS_FOLDER)

logger.add(os.path.join(LOGS_FOLDER, LOGS_FILE), rotation='500MB')

# Flask application
application = Flask(__name__)

# CORS setup
CORS(application)

# Crontab configurations
crontab = Crontab(application)
@crontab.job(minute='0,5,10,15,20,25,30,35,40,45,50,55')
def schedule_speed_test():
    dao = SpeedTestDAO()
    dao.save_test(run_speed_test())


# Add HTML endpoints

# Flask Rest_plus API
api = Api(app=application)

# Add API endpoints
api.add_namespace(speedtest_api, '/spdtest')


logger.info('Running.')

# Testing endpoint
if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')
