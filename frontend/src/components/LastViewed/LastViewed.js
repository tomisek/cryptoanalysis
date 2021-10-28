import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './LastViewed.css'
import { Link } from 'react-router-dom';


export const LastViewed = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lastViewed, setLastViewed] = useState([]);
    const lastViewedCoins = JSON.parse(localStorage.getItem("lastViewedCoins"));
    
    const fetchData = async () => {
        try {
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

    const mapOrder = (array, order, key) => {
        array.sort(function (a, b) {
            var A = a[key], B = b[key];
            if (order.indexOf(A) > order.indexOf(B)) {
                return -1;
            } else {
                return 1;
            }
        });
        return array;
    };
    mapOrder(lastViewed, lastViewedCoins, 'id')


    if (error) {
        return <div></div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <div className="last-viewed">
                <h3>Last Viewed</h3>
                {Object.keys(lastViewed).map((key, index) => {
                    return (
                        <div key={lastViewed[key].id}>
                            <Link to={`/coins/${lastViewed[key].id}`} className="last-viewed-links"><h4>{lastViewed[key].id}</h4></Link>
                            <div>${lastViewed[key].current_price}</div>
                            <div className={(lastViewed[key].price_change_percentage_24h < 0) ? 'negative' : 'positive'}>
                                <div>{lastViewed[key].price_change_percentage_24h ? lastViewed[key].price_change_percentage_24h.toLocaleString() + ' %' : 'N/A'}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}