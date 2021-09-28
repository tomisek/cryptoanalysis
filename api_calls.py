import pandas as pd
from pycoingecko import CoinGeckoAPI
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


def getSingleCoinHistory(coin ,currency, days):
    
    market_chart = cg.get_coin_market_chart_by_id(id=coin,vs_currency=currency,days=days)

    dataset = pd.DataFrame(market_chart['prices'])
    df = pd.DataFrame(dataset)

    df.rename(columns={0: 'timestamp', 1: 'price'}, inplace=True, errors='raise')

    return df.to_json(orient='index')



def getTrendingInfo(currency):
  
  trending = getTrending()

  info = cg.get_price(ids=trending, vs_currencies=currency, include_market_cap=True, include_24hr_vol=True, include_24hr_change=True, include_last_updated_at=True)

  return info
