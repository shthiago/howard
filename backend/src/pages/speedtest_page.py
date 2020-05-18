from flask import render_template

from src.core.connections import SpeedTestDAO


def speedtest_page():
    dao = SpeedTestDAO()

    return render_template('speedtest/dashboard.html')
