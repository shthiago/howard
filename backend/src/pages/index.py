from flask import render_template

from src.core.connections import SpeedTestDAO


def home():
    dao = SpeedTestDAO()
    content = {'text': 'Howard\'s homepage',
               'last_values': [1, 2, 3, 4, 5, 6]}
    return render_template('home.html', **content)
