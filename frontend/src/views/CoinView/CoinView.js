import React from 'react'
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { CoinInfoBox } from '../../components/CoinInfoBox/CoinInfoBox'
import Forecast from '../../components/Forecast/Forecast'
import SaveLastViewed from '../../components/SaveLastViewed/SaveLastViewed'


export const CoinView = () => {
    return (
        <div className="main">
            <div className="coin-view">
                <CoinInfoBox />
                <CoinHistoryGraph />
                <Forecast />
                <SaveLastViewed />
            </div>
        </div>
    )
}