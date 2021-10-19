import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './LastViewed.css'
import { Link } from 'react-router-dom';


export const LastViewed = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lastViewed, setLastViewed] = useState([]);
    
    const fetchData = async () => {
        try {
            const lastViewedCoins = JSON.parse(localStorage.getItem("lastViewedCoins"));
            const { data } = await CryptoShuttleService.lastViewed(lastViewedCoins)
            setIsLoaded(true);
            setLastViewed(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    if (error) {
        return <div></div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="last-viewed">
                <h3>Last Viewed</h3>
                {Object.keys(lastViewed).map((key, index) => (
                    <div key={lastViewed[key].id}>
                        <Link to={`/coins/${lastViewed[key].id}`} className="last-viewed-links"><h4>{lastViewed[key].id}</h4></Link>
                        <div>${lastViewed[key].current_price}</div>
                        <div className={(lastViewed[key].price_change_24h < 0) ? 'negative' : 'positive'}>
                            <div>{lastViewed[key].price_change_24h.toLocaleString()} %</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}