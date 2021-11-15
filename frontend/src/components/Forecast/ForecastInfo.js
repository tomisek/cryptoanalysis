import { useState } from 'react'
import './Forecast.css'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'

const ForecastInfo = (data) => {

    const [showSaveInfo, setShowSaveInfo] = useState(false)
    //Converts the timestamp to a readable string
    Object.values(data.forecastInfo).map((val) => {
        val.buy_date = (new Date(val.buy_date)).toISOString().substr(0, 10).valueOf();
        val.sell_date = (new Date(val.sell_date)).toISOString().substr(0, 10).valueOf();
        return val
    })

    const handleClick = () => {
        
        Object.keys(data.forecastInfo).map((key, index) => {
 
            const info = {
                "user" : data.user.id,
                "date_made": Date.now(),
                "coin": Object.keys(data.forecastInfo)[index],
                "buy_date": data.forecastInfo[key].buy_date,
                "buy_price": data.forecastInfo[key].buy_price,
                "max_gain_procent": data.forecastInfo[key].max_gain_procent,
                "sell_date": data.forecastInfo[key].sell_date,
                "sell_price": data.forecastInfo[key].sell_price
            }
            try{
                CryptoShuttleService.saveForecast(info)
                console.log("Saved forecast")
                setShowSaveInfo(true)
                return 200
            }
            catch (e) {
                console.log(e.message);
                return 400
            }   
        })
    }

    return (
        <div className="forecast-info">
            {Object.keys(data.forecastInfo).map((key, index) => (
                <div key={index}>
                    <table>
                        <thead>
                            <tr>
                                <th>Max Gain</th>
                                <th>Buy Date</th>
                                <th>Buy Price</th>
                                <th>Sell Date</th>
                                <th>Sell Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.forecastInfo[key].max_gain_procent}%</td>
                                <td>{data.forecastInfo[key].buy_date}</td>
                                <td>${data.forecastInfo[key].buy_price}</td>
                                <td>{data.forecastInfo[key].sell_date}</td>
                                <td>${data.forecastInfo[key].sell_price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button">
                        <button onClick={handleClick}>Save forecast suggestions</button>
                    </div>
                    <div className="save-info">{showSaveInfo ? "Saved forecast." : null}</div>
                </div>
            ))}
        </div>
    )
}

export default ForecastInfo