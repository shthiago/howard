import os

# Database Settings
# DB_SETTINGS = {
#     'DB_HOST': os.environ['DB_HOST'],
#     'DB_PORT': os.environ['DB_PORT'],
#     'DB_NAME': os.environ['DB_NAME'],
#     'DB_USER': os.environ['DB_USER'],
#     'DB_PASSWORD': os.environ['DB_PASSWORD'],
#     'AUTH_SOURCE': os.environ['AUTH_SOURCE']
# }

DB_SETTINGS = {
    'DB_HOST': 'localhost',
    'DB_PORT': '27017',
    'DB_NAME': 'howard',
    'DB_USER': 'admin',
    'DB_PASSWORD': 'Passw0rd!',
    'AUTH_SOURCE': 'admin'
}

LOGS_FOLDER = 'logs'
LOGS_FILE = 'howard.log'
