from pymongo import MongoClient

from src.conf import DB_SETTINGS

from datetime import datetime


class SpeedTestDAO:
    def __init__(self):
        if not 'URL_CONNECT' in DB_SETTINGS:
            self.client = MongoClient(host=DB_SETTINGS['DB_HOST'],
                                      username=DB_SETTINGS['DB_USER'],
                                      password=DB_SETTINGS['DB_PASSWORD'],
                                      authSource=DB_SETTINGS['AUTH_SOURCE'])
        else:
            self.client = MongoClient(DB_SETTINGS['URL_CONNECT'])
        self.db_name = 'howard'

    def save_test(self, values):
        '''Save a single test result to collection'''
        db = self.client.get_database(self.db_name)
        collection = db.speedtest
        collection.insert_one(values)

    def get_day_data(self, year, month, day):
        '''Get data to plot from today'''
        db = self.client.get_database(self.db_name)
        collection = db.speedtest

        get_today_data_pipeline = [
            {
                '$addFields': {
                    'day': {'$dayOfMonth': '$time'},
                    'month': {'$month': '$time'},
                    'year': {'$year': '$time'},
                }
            },
            {
                '$match': {
                    'year': year
                }
            },
            {
                '$match': {
                    'month': month
                }
            },
            {
                '$match': {
                    'day': day
                }
            },
            {
                '$addFields': {
                    'download': '$download.value',
                    'upload': '$upload.value',
                }
            },
            {
                '$addFields': {
                    'hour': {'$hour': '$time'}
                },
            },
            {
                '$group': {
                    '_id': '$hour',
                    'download': {'$avg': '$download'},
                    'upload': {'$avg': '$upload'},
                }
            }
        ]
        r = collection.aggregate(get_today_data_pipeline)

        return list(r)


# PIPELINES
