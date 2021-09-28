from flask import Flask , request, jsonify
from forecast import analyseChosenCoins
from api_calls import getTopChart, getTrending, getSingleCoinHistory, getTrendingInfo
from help_functions import missingvalues_tool, numeric_evaluations



app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'hello world'

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
    app.run()


