from datetime import datetime

from flask_restx import Namespace, Resource, abort
from loguru import logger

from src.core.connections import SpeedTestDAO

api = Namespace('speedtest',
                description='Namespace for operations over speedtest data')


@api.route('/<mode>/<int:year>/<int:month>/<int:day>')
class SpeedTestInteractor(Resource):
    def get(self, mode, year, month, day):
        """
            Parameters
            ----------
            mode: str
                download, upload ow both

            year: int
            month: int
            day: int

            Return
            ----------
            dict
            {
                date: str, Y-M-D
                download and or upload: dict
            }
        """
        logger.info(f'Fetching data for `{year}-{month}-{day}` (y-m-d)')
        dao = SpeedTestDAO()
        day_data = dao.get_day_data(year, month, day)

        day_data.sort(key=lambda k: k['_id'])
        if mode != 'both':
            try:
                ret = {
                    'title': mode.title(),
                    'date': f'{year}-{month}-{day}',
                    'y': {
                        'unit': 'MBps',
                        'values': [round(d[mode.lower()]/1e6, 2) for d in day_data]
                    },
                    'x': {
                        'unit': 'h',
                        'values': [d['_id'] for d in day_data]
                    }
                }
            except KeyError:
                logger.error(f'Failed to get data for mode `{mode}`')
                abort()

            return ret
        else:
            ret = {
                'date': f'{year}-{month}-{day}',
            }
            for m in ['download', 'upload']:
                ret[m] = {
                    'title': m.title(),
                    'y': {
                        'unit': 'MBps',
                        'values': [round(d[m.lower()]/1e6, 2) for d in day_data]
                    },
                    'x': {
                        'unit': 'h',
                        'values': [d['_id'] for d in day_data]
                    }
                }

            return ret
