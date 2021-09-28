# Libraries
import warnings; 
warnings.simplefilter('ignore')
import pandas as pd
from fbprophet import Prophet
from fbprophet.plot import plot_plotly, plot_components_plotly
import plotly.graph_objects as go
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()


# Get coin market by id and create dataframe
def getCoinMarket(cryptos, currency, coin_market_period):
  df = {}
  for x in cryptos:
    market_chart = cg.get_coin_market_chart_by_id(id=x, vs_currency=currency, days=coin_market_period)
    df[x] = pd.DataFrame(market_chart['prices'])
    df[x].rename(columns={0: 'ds', 1: 'y'}, inplace=True, errors='raise')
    df[x]['ds'] = pd.to_datetime(df[x]['ds'],unit='ms').dt.normalize()
  return df

# Uses Prophet to run a fit on the crypto data
def fitProphet(cryptos, df):
  m = {}
  for x in cryptos:
    m[x] = Prophet(
      changepoint_range=0.8, # percentage of dataset to train on
      yearly_seasonality='auto', # taking yearly seasonality into account
      weekly_seasonality='auto', # taking weekly seasonality into account
      daily_seasonality='auto', # taking daily seasonality into account
      seasonality_mode='multiplicative', # additive (for more linear data) or multiplicative seasonality (for more non-linear data)
      changepoint_prior_scale=0.05, # determines the flexibility of the trend (how mutch the trend changes at the changepoints) 0.05 = Default
    )
    m[x].fit(df[x])
  return m

# Makes forecast for crypto prices for the length of the variable days
def makeForecast(cryptos, m, days):
  forecast = {}
  for x in cryptos:
    future = m[x].make_future_dataframe(periods=days)
    forecast[x] = m[x].predict(future)
  return forecast

# Gets the day that are in the future
def getFutureVal(cryptos, forecast, days):
  future = {}
  for x in cryptos:
    future[x] = forecast[x].iloc[-days:-1] 
  return future

# Creates a json with information on when to buy sell
def futureRecommendation(cryptos, future):
  recs = {}
  for x in cryptos:
      
        
      my_indexed_list_min = zip(future[x]['yhat'], range(len(future[x]['yhat'])))
      my_indexed_list_max = zip(future[x]['yhat'], range(len(future[x]['yhat'])))
      min_value, min_index = min(my_indexed_list_min)
      max_value, max_index = max(my_indexed_list_max)

      # calculate percentage difference
      change = max(future[x]['yhat']) - min(future[x]['yhat'])
      change_procent = round(change / min(future[x]['yhat']) * 100)

      recs[x] = {
          'max_gain_procent' : change_procent,
          'buy_date': future[x]['ds'].iloc[min_index],
          'sell_date': future[x]['ds'].iloc[max_index],
          'buy_price': min_value,
          'sell_price': max_value
      }

  recs_df = pd.DataFrame(recs).transpose()
  return recs_df.to_dict(orient="index")


# Main function to run the forecast
def analyseChosenCoins(cryptos, days, currency, coin_market_period):
  df = getCoinMarket(cryptos, currency, coin_market_period)
  m = fitProphet(cryptos, df)
  forecast = makeForecast(cryptos, m, days)
  future = getFutureVal(cryptos, forecast, days)
  rec = futureRecommendation(cryptos, future)
  return rec


days = 365
currency = 'usd'
coin_market_period = 'max'

#cryptos = ['bitcoin']
#result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)

#print(result)

