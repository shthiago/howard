import datetime

import speedtest
from loguru import logger


def run_speed_test():
    '''Run speed test and return formatted document to insert into mongo'''

    logger.info(f'Running speed test')
    s = speedtest.Speedtest()

    try:
        s.get_best_server()
        s.download()
        s.upload()
        data = s.results.__dict__
    except Exception as e:
        logger.error(f'Failed to speedtest')
        return {
            'done': False,
            'log': str(e)
        }

    # Pop elements
    data.pop('_opener')
    data.pop('_secure')
    data.pop('_share')
    data.pop('timestamp')

    # Add unit to upload, download and ping
    data['upload'] = {
        'value': data['upload'],
        'unit': 'bit/s'
    }

    data['download'] = {
        'value': data['download'],
        'unit': 'bit/s'
    }

    data['ping'] = {
        'value': data['ping'],
        'unit': 'ms'
    }

    data['time'] = datetime.datetime.now()
    data['done'] = True

    logger.info('Speedtest finished')

    return data
