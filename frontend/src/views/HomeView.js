import React from 'react'
import Topcoins from '../components/topcoins/Topcoins'
import GlobalMarketInfo  from '../components/GlobalMarketInfo/GlobalMarketInfo'

export const HomeView = () => {
    return(
        <div className="main">
            <GlobalMarketInfo />
            <Topcoins />
        </div>
    )
}