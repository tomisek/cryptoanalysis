import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './TrendingInfo.css'

export const TrendingInfo = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trendingInfo, setTrendingInfo] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await CryptoShuttleService.trendingInfo()
            setIsLoaded(true);
            setTrendingInfo(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(trendingInfo)


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="trending-info">
                {Object.keys(trendingInfo).map((key, index) => (
                    <div key={index}>
                        <h4>{key}</h4>
                        <div>{trendingInfo[key].usd}</div>
                        <div>{trendingInfo[key].usd_24h_change}</div>
                    </div>
                ))}
            </div>
        )
    }
}