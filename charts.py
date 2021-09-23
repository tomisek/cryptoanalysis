import pandas as pd
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

# Gets the 100 biggest coin in order of market cap
def getTopChart(currency):
    market_chart = cg.get_coins_markets(vs_currency=currency)
    df = pd.DataFrame(market_chart)
    return df.to_json(orient='index')