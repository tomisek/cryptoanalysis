import React from 'react'
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { useParams } from 'react-router-dom'
import ForecastInfo from '../../components/ForecastInfo/ForecastInfo'


export const CoinView = () => {
    let { slug } = useParams()
    return (
        <div className="main">
            <h1>{slug}</h1>
            <div className="coin-view">
                <CoinHistoryGraph />
                <div className="info-box">(Info Box component)</div>
                <div className="prediction-graph">(Prediction Graph componet)</div>
                <ForecastInfo />
            </div>
        </div>
    )
}