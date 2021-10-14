import React from "react";
import './CoinInfo.css'

export const CoinInfo = (props) => {
 
    const allinfo= props.coinInfo


    const convertToDateTime = (dateString) => {
        dateString = new Date(dateString).toLocaleString()
        return dateString
    }
    const convertToDate = (datestring)=> {
        datestring = new Date(datestring).toLocaleDateString()
        return datestring
    }
       
    return (
        
        <div className="coinInfo">
            {
              Object.keys(allinfo).map((coin, index) => {
                  return (
                      <div key={index}>
            
                        <div className="singleCoinTitle">
                            <img src={allinfo[coin].image} alt="logo"></img>
                            <h1>{allinfo[coin].name}</h1>
                            <h1>${allinfo[coin].current_price.toLocaleString()}</h1>
                            <div>{allinfo[coin].market_cap_change_percentage_24h}%</div>
                            <div>Rank #{allinfo[coin].market_cap_rank}</div>

                        </div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>High 24h</th>
                                    <th>Low 24h</th>
                                    <th>Market cap</th>
                                    <th>Circulating supply</th>
                                    <th>Max supply</th>
                                    <th>All time high</th>
                                    <th>All time low</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${allinfo[coin].high_24h.toLocaleString()}</td>
                                    <td>${allinfo[coin].low_24h.toLocaleString()}</td>
                                    <td>${allinfo[coin].market_cap.toLocaleString()}</td>
                                    <td>{allinfo[coin].circulating_supply.toLocaleString()}</td>
                                    <td>{allinfo[coin].max_supply.toLocaleString()}</td>
                                    <td>${allinfo[coin].ath.toLocaleString()}<br/>({convertToDate(allinfo[coin].ath_date)})</td>
                                    <td>${allinfo[coin].atl.toLocaleString()}<br/>({convertToDate(allinfo[coin].atl_date)})</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="lastUpdated">Last updated: {convertToDateTime(allinfo[coin].last_updated)}</div>
                          {/* <div className="currentPrice">Current Price: ${allinfo[coin].current_price}</div>
                          <div className="allTimeHigh">All time high: ${allinfo[coin].ath}</div>
                          <div className="allTimeHighDate">All time high date: {convertToDate(allinfo[coin].ath_date)}</div>
                          <div className="allTimeHighChangePercentage">All time high change percentage: {allinfo[coin].ath_change_percentage}%</div>
                          <div className="allTimeLow">All time low: ${allinfo[coin].atl}</div>
                          <div className="allTimeLowDate">All time low date: {convertToDate(allinfo[coin].atl_date)}</div>
                          <div className="allTimeLowChangePercentage">All time low change percentage: {allinfo[coin].atl_change_percentage}%</div> 
                          <div className="circulatingSupply">Circulating supply: {allinfo[coin].circulating_supply}</div>
                          <div className="fullyDilutedValuation">Fully diluted valuation: ${allinfo[coin].fully_diluted_valuation}</div>
                          <div className="high24h">High 24h: ${allinfo[coin].high_24h}</div>
                          <div className="low24h">Low 24h: ${allinfo[coin].low_24h}</div>
                          <div className="marketCap">Market cap: ${allinfo[coin].market_cap}</div>
                          <div className="marketCapChange24h">Market cap change 24h: {allinfo[coin].market_cap_change_24h}</div>
                          <div className="marketCapChangePercentage24h">Market cap change percentage 24h: {allinfo[coin].market_cap_change_percentage_24h}</div>
                          <div className="marketCapRank">Market cap rank: #{allinfo[coin].market_cap_rank}</div>
                          <div className="maxSupply">Max supply: ${allinfo[coin].max_supply}</div>
                          <div className="priceChange24h">Price change 24h: ${allinfo[coin].price_change_24h}</div>
                          <div className="priceChangePercentage24h">Price change percentage 24h: {allinfo[coin].price_change_percentage_24h}%</div>
                          <div className="roi">Return on investment: {allinfo[coin].roi}</div>
                          <div className="totalSupply">Total supply: {allinfo[coin].total_supply}</div>
                          <div className="totalVolume">Total volume: {allinfo[coin].total_volume}</div> */}
                          
                      </div>
                  )
              })
            }
            
        </div>
    )
}