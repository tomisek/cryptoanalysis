from flask import Flask, request, jsonify, session, redirect
from forecast import analyseChosenCoins, getTrending
from charts import getTopChart
from help_functions import missingvalues_tool, numeric_evaluations
from functools import wraps
import pymongo

app = Flask(__name__, instance_relative_config=True)
# Need to add a 'instance'-folder with config.py-file containing secret key!
app.config.from_pyfile('config.py')


#Database
client = pymongo.MongoClient('localhost', 27017)
db = client.user_login

# Decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            # If user is logged in, continue to userpage(requested function)
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap

# User routes
from user import routes


@app.route('/')
def hello_world():
    return 'hello world'

@app.route('/userpage')
@login_required
def userpage():
    return 'userpage'

@app.route('/rest/forecast/trending', methods=['GET'])
def trending_forecast():
    data = request.json
    data = missingvalues_tool(data)
    trending = getTrending()
    cryptos = trending
    days = data['days']
    currency = data['currency']
    coin_market_period = data['market_period']
    result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)
    result = numeric_evaluations(result)
    return jsonify(result)

@app.route('/rest/forecast/coins', methods=['GET'])
def user_option_forecast():
    data = request.json
    data = missingvalues_tool(data)
    
    cryptos = data['coins']
    days = data['days']
    currency = data['currency']
    coin_market_period = data['market_period']
    result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)
    result = numeric_evaluations(result)
    return jsonify(result)

@app.route('/rest/topchart', methods=['GET'])
def top_chart():
    data = request.json
    currency = data['currency']
    result = getTopChart(currency)
    return result


if __name__ == '__main__':
    app.run(debug=True)


