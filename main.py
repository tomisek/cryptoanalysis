from flask import Flask, request, jsonify, session, redirect
from forecast import analyseChosenCoins
from api_calls import getTopChart, getTrending, getSingleCoinHistory, getTrendingInfo
from help_functions import missingvalues_tool, numeric_evaluations
from flask_cors import CORS
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

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'hello world'

@app.route('/userpage')
@login_required
def userpage():
    return 'userpage'

@app.route('/rest/forecast/trending', methods=['GET'])
def trending_forecast():
    
    trending = getTrending()
    cryptos = trending
    days = 365
    currency = 'usd'
    coin_market_period = 'max'
    result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)
    result = numeric_evaluations(result)
    return jsonify(result)

@app.route('/rest/forecast/coins', methods=['GET'])
def user_option_forecast():
    cryptos = []
   
    resp = request.args.get('coin')
    cryptos.append(resp)
    days = 365
    currency = 'usd'
    coin_market_period = 'max'
    result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)
    result = numeric_evaluations(result)
    return jsonify(result)

@app.route('/rest/topchart', methods=['GET'])
def top_chart():
    currency = request.args.get('currency')
    result = getTopChart(currency)
    return result


@app.route('/rest/market/graph', methods=['GET'])
def market_single_coin():

    coin = request.args.get('coin')
    currency = 'usd'
    market_period = 'max'

    result = getSingleCoinHistory(coin, currency, market_period)

    return result



@app.route('/rest/trending/info',  methods=['GET'])
def trending_info():

    #currency = request.args.get('coin')

    result = getTrendingInfo(currency='usd')

    return result




if __name__ == '__main__':
    app.run(debug=True)


