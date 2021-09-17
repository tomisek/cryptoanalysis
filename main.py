from flask import Flask, request, jsonify, session, redirect
from forecast import analyseChosenCoins, getTrending
from help_functions import missingvalues_tool
from functools import wraps
import pymongo
app = Flask(__name__)



#Database
client = pymongo.MongoClient('localhost', 27017)
db = client.user_login

# Decorator
def login_required(f):
    @wraps(f)
    def wrap(*arg, **kwargs):
        if 'logged_in' in session:
            # If user is logged in, continue to userpage
            return f(*args, **kwargs)
        else:
            return redirect('/')

# User routes
from user import routes


@app.route('/')
def hello_world():
    return 'hello world'

@app.route('/userpage')
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
    
    return result

@app.route('/rest/forecast/coins', methods=['GET'])
def user_option_forecast():
    data = request.json
    data = missingvalues_tool(data)
    
    cryptos = ['coins']
    days = data['days']
    currency = data['currency']
    coin_market_period = data['market_period']
    

    result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)

    return result




if __name__ == '__main__':
    app.run(debug=True)


