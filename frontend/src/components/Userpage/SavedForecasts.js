import React, {useState, useEffect} from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import "./SavedForecasts.css"


export const SavedForecast = (props) => {
    const [data, setData] = useState([])
    const [sortedData, setSortedData] = useState([])
    
    Object.values(sortedData).map((val) => {
        val.date_made = (new Date(val.date_made)).toISOString().substr(0, 10).valueOf();
        return val
    })

    const getSavedForecasts = async () => {
        try{
            const { data } = await CryptoShuttleService.getSavedForecasts(props.userId)
            setData(data)
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
     
        setSortedData(data) 
    }

    const handleClick = (forecastId) =>{
    
        try {
            CryptoShuttleService.deleteSavedForecast(forecastId)
            console.log("deleted forecast");
        }
        catch (e) {
            console.log(e.message);
        }
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
                    <div className="buyPrice">Buy price: ${sortedData[key].buy_price}</div>
                    <div className="sellDate">Sell date: {sortedData[key].sell_date}</div>
                    <div className="sellPrice">Sell price: ${sortedData[key].sell_price}</div>
                    <div className="maxGainPercent">Max gain: {sortedData[key].max_gain_procent}%</div>
                    <button onClick={() =>handleClick(sortedData[key]._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}