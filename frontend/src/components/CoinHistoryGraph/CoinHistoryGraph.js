import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './CoinHistoryGraph.css'
import { useParams } from 'react-router-dom'

const CoinHistoryGraph = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [coinHistoryGraph, setCoinHistoryGraph] = useState([]);
    let { slug } = useParams()

    const fetchData = async () => {
        try {
            const { data } = await CryptoShuttleService.marketGraph(slug)
            setIsLoaded(true);
            setCoinHistoryGraph(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(coinHistoryGraph)

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="coin-history-graph">
                <h2>{slug} graph</h2>

                {Object.keys(coinHistoryGraph).map((key, index) => (
                    <div key={index}>
                        <div>{coinHistoryGraph[key].timestamp} - {coinHistoryGraph[key].price}</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default CoinHistoryGraph