# Libraries
import warnings

from pandas.core.arrays.integer import Int64Dtype; 
warnings.simplefilter('ignore')
import pandas as pd
from fbprophet import Prophet
from fbprophet.plot import plot_plotly, plot_components_plotly
import plotly.graph_objects as go
from datetime import datetime
from pycoingecko import CoinGeckoAPI
from help_functions import check_history
import numpy as np
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
      
      # Selects min predicted price from dataset and grabs the date at the same index. 
      my_indexed_list_min = zip(future[x]['yhat'], range(len(future[x]['yhat'])))
      min_value, min_index = min(my_indexed_list_min)
      buy_date = future[x]['ds'].iloc[min_index]
  
      # Creating new dataframe, slicing dataframe from buy_date to prevent sell_date occuring before buy_date.
      new_future = future[x].iloc[min_index:]
      my_indexed_list_max = zip(new_future['yhat'], range(len(new_future['yhat'])))
      max_value, max_index = max(my_indexed_list_max) 
      sell_date = new_future['ds'].iloc[max_index]
      

     
      # calculate percentage difference
      change = max_value - min_value
      change_procent = round(change / min_value * 100)



      recs[x] = {
          'max_gain_procent' : change_procent,
          'buy_date': buy_date,
          'sell_date': sell_date,
          'buy_price': min_value,
          'sell_price': max_value
      }
      

  recs_df = pd.DataFrame(recs).transpose()
  recs_df['buy_date'] = recs_df[['buy_date']].apply(lambda x: x[0].timestamp(), axis=1).astype(int)
  recs_df['sell_date'] = recs_df[['sell_date']].apply(lambda x: x[0].timestamp(), axis=1).astype(int)
  recs_df['buy_date'] = recs_df['buy_date'].apply(lambda x: x*1000)
  recs_df['sell_date'] = recs_df['sell_date'].apply(lambda x: x*1000)
  return recs_df.to_dict(orient="index")


# Main function to run the forecast
def analyseChosenCoins(cryptos, days, currency, coin_market_period):
  df = getCoinMarket(cryptos, currency, coin_market_period)
  df, cryptos = check_history(df, cryptos)
  m = fitProphet(cryptos, df)
  forecast = makeForecast(cryptos, m, days)
  future = getFutureVal(cryptos, forecast, days)
  rec = futureRecommendation(cryptos, future)
  
  
  for x in cryptos:
    
    forecast_df = pd.DataFrame(forecast[x], columns=['ds', 'yhat'])
    forecast_df[['ds', 'yhat']].set_index('ds').to_dict()['yhat']
    

    forecast_df['ds'] = forecast_df[['ds']].apply(lambda x: x[0].timestamp(), axis=1).astype(int)
    forecast_df['ds'] = forecast_df['ds'].apply(lambda x: x*1000)
    
  return rec, forecast_df.to_dict(orient="index")
 
 
    
days = 365
currency = 'usd'
coin_market_period = 'max'

#cryptos = ['bitcoin']
#result = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)

#print(result)

