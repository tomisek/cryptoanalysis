from flask import Flask , request, jsonify
from forecast import analyseChosenCoins, getTrending
from charts import getTopChart
from help_functions import missingvalues_tool, numeric_evaluations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    currency = request.args.get('currency')
    result = getTopChart(currency)
    return result




if __name__ == '__main__':
    app.run()


