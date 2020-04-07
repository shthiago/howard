from pymongo import MongoClient

from src.conf import DB_SETTINGS


class SpeedTestDAO:
    def __init__(self):
        self.client = MongoClient(host=DB_SETTINGS['DB_HOST'],
                                  username=DB_SETTINGS['DB_USER'],
                                  password=DB_SETTINGS['DB_PASSWORD'],
                                  authSource=DB_SETTINGS['AUTH_SOURCE'])
        self.db_name = 'howard'

    def save_test(self, values):
        '''Save a single test result to collection'''
        db = self.client.get_database(self.db_name)
        collection = db.speedtest
        collection.insert_one(values)
