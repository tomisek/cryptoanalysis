import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './Forecast.css'
import ForecastInfo from './ForecastInfo.js'
import ForecastGraph from './ForecastGraph.js'
import ForecastMultiple from './ForecastMultiple.js'
import { useParams } from 'react-router-dom'
import CustomLoading from '../CustomLoading/CustomLoading';

const Forecast = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecastInfo, setForecastInfo] = useState([]);
    const [forecastGraph, setForecastGraph] = useState([]);
    const [forecastMultiple, setForecastMultiple] = useState([]);
    let { slug } = useParams();
    let token = localStorage.getItem('token')

    const fetchData = async (slug, token) => {
        try {
            const { data } = await CryptoShuttleService.forecastInfo(slug, token)
            setIsLoaded(true);
            setForecastInfo(data.coin);
            setForecastGraph(data.graph);
            setForecastMultiple(data.multiple);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(slug, token)
    }, [slug, token])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <CustomLoading/>;
    } else {
        return (
            <div className="forecast">
                <ForecastInfo forecastInfo={forecastInfo}/>
                <ForecastGraph forecastGraph={forecastGraph} />
                <ForecastMultiple forecastMultiple={forecastMultiple} />
            </div>
        )
    }
}

export default Forecast