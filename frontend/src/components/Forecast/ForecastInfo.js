import React from 'react'
import './Forecast.css'

const ForecastInfo = (data) => {

    //Converts the timestamp to a readable string
    Object.values(data.forecastInfo).map((val) => {
        val.buy_date = (new Date(val.buy_date)).toISOString().substr(0, 10).valueOf();
        val.sell_date = (new Date(val.sell_date)).toISOString().substr(0, 10).valueOf();
        return val
    })

    return (
        <div className="forecast-info">
            {Object.keys(data.forecastInfo).map((key, index) => (
                <div key={index}>
                    <div>Max gain: {data.forecastInfo[key].max_gain_procent}%</div>
                    <div>buy date: {data.forecastInfo[key].buy_date}</div>
                    <div>buy price: ${data.forecastInfo[key].buy_price}</div>
                    <div>sell date: {data.forecastInfo[key].sell_date}</div>
                    <div>sell price: ${data.forecastInfo[key].sell_price}</div>
                </div>
            ))}
        </div>
    )

}

export default ForecastInfo