from flask import Flask , request, jsonify
from forecast import analyseChosenCoins, getTrending
from help_functions import missingvalues_tool
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'hello world'


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

@app.route('/rest/forecast/coins')
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
    app.run()


