#!/usr/bin/env python3
"""
simple flask app with basic babel set up
"""
from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


# create a custon config class
class Config:
    """
    configuration class
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


# use class as config for the flask app
app.config.from_object(Config)


@app.route("/")
def hello_world():
    """
    renders a html page
    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
