import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './ForecastInfo.css'
import { useParams } from 'react-router-dom'

const ForecastInfo = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecastInfo, setForecastInfo] = useState([]);
    let { slug } = useParams();

    const fetchData = async (slug) => {
        try {
            const { data } = await CryptoShuttleService.forecastInfo(slug)
            setIsLoaded(true);
            setForecastInfo(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(slug)
    }, [slug])

    console.log(forecastInfo)

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="forecast-info">
                <h2>forecast info</h2>
                {Object.keys(forecastInfo).map((key, index) => (
                    <div key={index}>
                        <div>Max gain: {forecastInfo[key].max_gain_procent}%</div>
                        <div>buy date: {forecastInfo[key].buy_date.slice(0, -13)}</div>
                        <div>buy price: ${forecastInfo[key].buy_price}</div>
                        <div>sell date: {forecastInfo[key].sell_date.slice(0, -13)}</div>
                        <div>sell price: ${forecastInfo[key].sell_price}</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ForecastInfo