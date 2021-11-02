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
                </div>
            ))}
        </div>
    )
}

export default ForecastInfo