import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './Topcoins.css'
import { useHistory } from 'react-router-dom';

function Topcoins() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [topcoins, setTopcoins] = useState([]);
    const history = useHistory()
    
    const fetchData = async () => {
        try {
            const {data} = await CryptoShuttleService.topChart()
            setIsLoaded(true);
            setTopcoins(data);
        } catch(error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    const handleClick = (row) => {
        history.push(`/coins/${row}`)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <div className="topcoins">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h %</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(topcoins).map((key, index) => (
                            <tr onClick={() =>handleClick(topcoins[key].id)} key={index}>
                                <td>{topcoins[key].market_cap_rank}</td>
                                <td><img src={topcoins[key].image} alt="logo" height="30" /></td>
                                <td>{topcoins[key].name}</td>
                                <td>${topcoins[key].current_price}</td>
                                <td className={(topcoins[key].price_change_percentage_24h < 0) ? 'negative' : 'positive'}>
                                    {topcoins[key].price_change_percentage_24h ? topcoins[key].price_change_percentage_24h.toLocaleString() +'%' : 'N/A'}
                                </td>
                                <td>${topcoins[key].market_cap.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default Topcoins