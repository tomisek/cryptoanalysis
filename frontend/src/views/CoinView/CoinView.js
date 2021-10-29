import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { CoinInfoBox } from '../../components/CoinInfoBox/CoinInfoBox'
import Forecast from '../../components/Forecast/Forecast'
import SaveLastViewed from '../../components/SaveLastViewed/SaveLastViewed'





export const CoinView = () => {
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    
    return (
        <div className="main">
            <div className="coin-view">
                <CoinInfoBox />
                <CoinHistoryGraph />
                <SaveLastViewed />
                    
                <input type="submit" value="Show Forecast" onClick={onClick} />
                { showResults ? <Forecast /> : null }
                
                    

                
            </div>
        </div>
    )
}