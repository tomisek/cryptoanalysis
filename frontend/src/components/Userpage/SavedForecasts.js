import React, {useState, useEffect} from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import "./SavedForecasts.css"


export const SavedForecast = (props) => {
    const [data, setData] = useState([])
    const [sortedData, setSortedData] = useState([])
 
    const getSavedForecasts = async () => {
        try{
            const { data } = await CryptoShuttleService.getSavedForecasts(props.userId)
            setData(data)
            console.log("data",data);
            sortCoins(data)

        }
        catch(e) {
            console.log(e.message);
        }
    }

    const sortCoins = (data) => {
        // sort by coin name asc
        data.sort((a, b) =>  {
            if (a.coin > b.coin){
                return 1
            }
            if (a.coin < b.coin){
                return -1
            }
            return 0
        })
        

        
        console.log("sorted",data);
        setSortedData(data) 
    }
    useEffect(() => {
        getSavedForecasts()
    },[])

    return (
        <div className="savedForecast">
            <h3>Your saved forecasts</h3>
   
            {Object.keys(sortedData).map((key, index) => (
                <div key={index} className="savedForecastInfo">
                    <div className="coinName">{sortedData[key].coin.charAt(0).toUpperCase() + sortedData[key].coin.slice(1)}</div>
                    <div className="dateMade">Date made: {sortedData[key].date_made}</div>
                    <div className="buyDate">Buy date: {sortedData[key].buy_date}</div>
                    <div className="buyPrice">Buy price: {sortedData[key].buy_price}</div>
                    <div className="sellDate">Sell date: {sortedData[key].sell_date}</div>
                    <div className="sellPrice">Sell price: {sortedData[key].sell_price}</div>
                    <div className="maxGainPercent">Max gain: {sortedData[key].max_gain_procent}%</div>
                </div>
            ))}
        </div>
    )
}