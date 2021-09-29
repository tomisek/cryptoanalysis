import React from 'react'
import CoinHistoryGraph from '../components/CoinHistoryGraph/CoinHistoryGraph'
import { useParams } from 'react-router-dom'


export const CoinView = () => {
    let { slug } = useParams()
    return (
        <div>
            <h1>{slug}</h1>
            <CoinHistoryGraph />
        </div>
    )
}