import os

# Database Settings
DB_SETTINGS = {
    'DB_HOST': os.environ['DB_HOST'],
    'DB_PORT': os.environ['DB_PORT'],
    'DB_NAME': os.environ['DB_NAME'],
    'DB_USER': os.environ['DB_USER'],
    'DB_PASSWORD': os.environ['DB_PASSWORD'],
    'AUTH_SOURCE': os.environ['AUTH_SOURCE'],
    'URL_CONNECT': os.environ['URL_CONNECT']
}

LOGS_FOLDER = 'logs'
LOGS_FILE = 'howard.log'
