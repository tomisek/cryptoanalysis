import React from 'react'
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { useParams } from 'react-router-dom'


export const CoinView = () => {
    let { slug } = useParams()
    return (
        <div className="main">
            <div className="coin-view">
                <h1>{slug}</h1>
                <CoinHistoryGraph />
            </div>
        </div>
    )
}