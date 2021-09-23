# Crypto Shuttle


An app for predicting future cryptocurrency prices. 

***

## Setup
Python 3.8.5 needed for this project.

Install required packages  
```pip install -r requirements.txt```  
```pip install -r more_requirements.txt```  
```pip install --upgrade fbprophet```  

***
## API Documentation

**GET** /rest/forecast/coins

| Name      | Type | example     |
| :---        |    :----:   |          ---: |
| coins      | array of strings       | ["bitcoin", "cardano"]   |
| days   |    int     | 365     |
| currency   |   string      | "usd"     |
| market_period   | string/int        | "max"     |

````json
{
    "bitcoin": {
        "max_gain_procent": 298,
        "buy_date": 1633478400000,
        "sell_date": 1648684800000,
        "buy_price": 25935.9102882872,
        "sell_price": 103131.1933383244
    },
    "cardano": {
        "max_gain_procent": 11243,
        "buy_date": 1635292800000,
        "sell_date": 1662163200000,
        "buy_price": 0.0570173994,
        "sell_price": 7.5466611519
    }
}
````

**GET** /rest/forecast/trending

| Name      | Type | example     |
| :---        |    :----:   |          ---: |
| days   |    int     | 365     |
| currency   |   string      | "usd"     |
| market_period   | string/int        | "max"     |

Get's top 5 by most trending.
````json
{
    "shiba-inu": {
        "max_gain_procent": 23,
        "buy_date": 1662768000000,
        "sell_date": 1632182400000,
        "buy_price": 0.0000067878,
        "sell_price": 0.000008348
    },
    "terra-luna": {
        "max_gain_procent": 14191,
        "buy_date": 1636070400000,
        "sell_date": 1663200000000,
        "buy_price": 0.5773979717,
        "sell_price": 82.5139569528
    },
    "gala": {
        "max_gain_procent": 445,
        "buy_date": 1631923200000,
        "sell_date": 1663286400000,
        "buy_price": 0.0325754057,
        "sell_price": 0.1774369992
    }
}
````

**GET** /rest/topchart  

| Name      | Type | example     |
| :---        |    :----:   |          ---: |
| currency   |   string      | "usd"     |

Gets top 100 by market cap.

````json
{
    "0": {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        "current_price": 47992,
        "market_cap": 902849273559,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 1007526476748,
        "total_volume": 30621775556,
        "high_24h": 48300,
        "low_24h": 47131,
        "price_change_24h": -198.7212061118,
        "price_change_percentage_24h": -0.41237,
        "market_cap_change_24h": -3199580325.7000732422,
        "market_cap_change_percentage_24h": -0.35314,
        "circulating_supply": 18818200,
        "total_supply": 21000000,
        "max_supply": 21000000,
        "ath": 64805,
        "ath_change_percentage": -25.79755,
        "ath_date": "2021-04-14T11:54:46.763Z",
        "atl": 67.81,
        "atl_change_percentage": 70814.90659,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2021-09-17T08:54:56.144Z"
    }
}
````