import React from 'react'
import Topcoins from '../components/topcoins/Topcoins'
import GlobalMarketInfo  from '../components/GlobalMarketInfo/GlobalMarketInfo'

export const HomeView = () => {
    return(
        <div className="main">
            <GlobalMarketInfo />
            <h1>This is home</h1>
            <Topcoins />
        </div>
    )
}