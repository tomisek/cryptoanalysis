import React from "react";

export const CoinInfo = (props) => {
    // console.log("child",props.coinInfo[0])
    // const allInfo = props.coinInfo[0]

    // return (
    //     <div>
    //         <div>Current price: ${allInfo.current_price}</div>
    //     </div>   
    // )
 
    const allinfo= props.coinInfo
    console.log(props.coinInfo[0]);

    const convertToDate = (val) => {
        val = new Date(val).toLocaleString()
        return val
    }
       
    return (
        
        <div>
            {
              Object.keys(allinfo).map((coin, index) => {
                  return (
                      <div key={index}>
                          {console.log(Object.keys(allinfo[coin]))}
                          {console.log(Object.values(allinfo[coin]))}
                        {/* <table>
                            <th>Current Price:</th>
                            <th>All time high:</th>
                            <tr>
                            <td> ${allinfo[coin].current_price}</td>
                            <td> ${allinfo[coin].ath} ({allinfo[coin].ath_date})</td>
                            </tr>
                        </table> */}
                          <div className="currentPrice">Current Price: ${allinfo[coin].current_price}</div>
                          <div className="allTimeHigh">All time high: ${allinfo[coin].ath}</div>
                          <div className="allTimeHighDate">All time high date: {convertToDate(allinfo[coin].ath_date)}</div>
                          <div className="allTimeHighChangePercentage">All time high change percentage: {allinfo[coin].ath_change_percentage}</div>
                          <div className="allTimeLow">All time low: ${allinfo[coin].atl}</div>
                          <div className="allTimeLowDate">All time low date: {convertToDate(allinfo[coin].atl_date)}</div>
                          <div className="allTimeLowChangePercentage">All time low change percentage: {allinfo[coin].atl_change_percentage}</div>
                          <div className="circulatingSupply">Circulating supply: ${allinfo[coin].circulating_supply}</div>
                          <div className="fullyDilutedValuation">Fully diluted valuation: ${allinfo[coin].fully_diluted_valuation}</div>
                          <div className="high24h">High 24h: ${allinfo[coin].high_24h}</div>
                          <div className="low24h">Low 24h: ${allinfo[coin].low_24h}</div>
                          <div className="marketCap">Market cap: ${allinfo[coin].market_cap}</div>
                          <div className="marketCapChange24h">Market cap change 24h: {allinfo[coin].market_cap_change_24h}</div>
                          <div className="marketCapChangePercentage24h">Market cap change percentage 24h: ${allinfo[coin].market_cap_change_percentage_24h}</div>
                          <div className="marketCapRank">Market cap rank: #{allinfo[coin].market_cap_rank}</div>
                          <div className="maxSupply">Max supply: ${allinfo[coin].max_supply}</div>
                          <div className="priceChange24h">Price change 24h: ${allinfo[coin].price_change_24h}</div>
                          <div className="priceChangePercentage24h">Price change percentage 24h: {allinfo[coin].price_change_percentage_24h}</div>
                          <div className="roi">Return on investment: {allinfo[coin].roi}</div>
                          <div className="totalSupply">Total supply: ${allinfo[coin].total_supply}</div>
                          <div className="totalVolume">Total volume: ${allinfo[coin].total_volume}</div>
                          <div></div>


                          <div className="lastUpdated">Last updated: {convertToDate(allinfo[coin].last_updated)}</div>
                          {/* 
                            ​
                            id: "bitcoin"
                            ​
                            image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                          
                            name: "Bitcoin"
                            ​
                            symbol: "btc"
                            ​ */}
                      </div>
                  )
              })
            }
            
        </div>
    )
}