import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import { useParams } from 'react-router-dom'
import RocketLoader from '../RocketLoader/RocketLoader';
import LesserForecastGraph from './LesserForecastGraph';

const LesserForecast = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lesserForecastGraph, setLesserForecastGraph] = useState([]);
    let { slug } = useParams();
    

    const fetchData = async (slug) => {
        try {
            const { data } = await CryptoShuttleService.lesserForecastInfo(slug)
            setIsLoaded(true);
            setLesserForecastGraph(data.multiple)
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(slug)
    }, [slug])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <RocketLoader/>;
    } else {
        return (
            <div className="lesser-forecast">
               <LesserForecastGraph lesserForecastGraph={lesserForecastGraph} />
            </div>
        )
    }
}

export default LesserForecast