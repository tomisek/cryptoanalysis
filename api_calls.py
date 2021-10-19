import pandas as pd
from pycoingecko import CoinGeckoAPI
from werkzeug import datastructures
import json

cg = CoinGeckoAPI()

# Gets the 100 biggest coin in order of market cap
def getTopChart(currency):
    market_chart = cg.get_coins_markets(vs_currency=currency)
    df = pd.DataFrame(market_chart)
    return df.to_json(orient='index')


# Gets the trending coins
def getTrending():
  trending = cg.get_search_trending()

  df = pd.DataFrame(trending['coins'])
  df['item']
  ids = []

  for id in df['item']:
    ids.append(id['id'])

  return ids

# fetching a signele coins history
def getSingleCoinHistory(coin ,currency, days):
    
    market_chart = cg.get_coin_market_chart_by_id(id=coin,vs_currency=currency,days=days)

    dataset = pd.DataFrame(market_chart['prices'])
    df = pd.DataFrame(dataset)

    df.rename(columns={0: 'timestamp', 1: 'price'}, inplace=True, errors='raise')

    return df.to_json(orient='index')


#Gets top trending coins and there market info , price 24hr change etc.
def getTrendingInfo(currency):
  
  trending = getTrending()

  info = cg.get_price(ids=trending, vs_currencies=currency, include_market_cap=True, include_24hr_vol=True, include_24hr_change=True, include_last_updated_at=True)

  return info

#single coin market info
def getSingleCoinInfo(coin,currency):

  result = cg.get_coins_markets(vs_currency=currency, ids=coin)

  return result


def getGlobalCryptoMarket():

  #dict for all the values that will be sent through the API
  data = {}
  #list that collect the symbol names for the top 2 coins with biggest cap percentage for example.. "btc"
  symbols = []

  # API calls from coingecko API
  market = cg.get_global()

  coin_list = cg.get_coins_markets(vs_currency='usd')
  # Creating dataframe and creating variables for each value that we want to use.
  df = pd.DataFrame(market)

  cap_percentage = df['market_cap_percentage'].nlargest(2)
  cap_percentage = pd.DataFrame(cap_percentage, dtype='int').to_dict(orient="index")
  active_cryptocurrencies = df['active_cryptocurrencies']['usd']
  total_markets = df['markets']['usd']
  total_market_cap = df['total_market_cap']['usd']
  total_volume = df['total_volume']['usd']
  market_change_percentage = df['market_cap_change_percentage_24h_usd']['usd']
  updated_at = df['updated_at']['usd']

  # Cathing the keys from cap percantage to be able to match symbols against the second api call.
  for key in cap_percentage:
    symbols.append(key)
  #Creating a dataframe from selected values image and symbol
  df1 = pd.DataFrame(coin_list)
  df2 = df1[['symbol', 'image']]
  first = symbols[0]
  second = symbols[1]

  # comparing the symbol from first call , and taking info from second call when they match
  first1 = df2.loc[df2['symbol'] == first]  
  second1 = df2.loc[df2['symbol'] == second]
  # setting both dataframes to dicts with the orient records , that creates a list of objects
  first1 = first1.to_dict(orient="records")
  second1 = second1.to_dict(orient="records")
  
  # Taking out desired image tags from both of the created dicts 
  img1 = first1[0]['image']
  img2 = second1[0]['image']

  # Adding image tags to the cap percentage object, to easier be able to handle the information in frontend
  cap_percentage[first]['image'] = img1
  cap_percentage[second]['image'] = img2

  # Adding key value pairs to the data object , parsing decimal values to int , and casting 10 digit unix to 13 digit.
  data['cap_percentage'] = cap_percentage
  data['active_cryptocurrencies'] = int(active_cryptocurrencies)
  data['total_markets'] = int(total_markets)
  data['total_market_cap'] = int(total_market_cap)
  data['total_volume'] = int(total_volume)
  data['market_change_percentage'] = int(market_change_percentage)
  data['updated_at'] = int(updated_at)*1000
   

  
  return data



# Fetching all ids from Coingecko API
def getAllCoinNames():
  
  data = {}
  coin_list = cg.get_coins_list(include_platform=False)

  df = pd.DataFrame(coin_list)
  
  names = df['id']
  #remaking the pandas series object to dict orient records and then adding it to the data object as follows {"names": [{"id": "bitcoin"}, {"id": "ethereum"},....]}
  names = pd.DataFrame(names).to_dict(orient="records")
  data['names'] = names
  
  return data