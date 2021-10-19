import React from 'react'
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { useParams } from 'react-router-dom'
import { CoinInfoBox } from '../../components/CoinInfoBox/CoinInfoBox'
import Forecast from '../../components/Forecast/Forecast'


export const CoinView = () => {
    let { slug } = useParams()
    return (
        <div className="main">
            {/* <h1>{slug}</h1> */}
            <div className="coin-view">
                <CoinInfoBox />
                <CoinHistoryGraph />
                {/* <div className="info-box">(Info Box component)</div> */}
                <Forecast />
            </div>
        </div>
    )
}