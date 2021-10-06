import React from 'react'
import './Sidebar.css'
import { TrendingInfo } from '../TrendingInfo/TrendingInfo'
export const Sidebar = () => {
    return (
        <div className="sidebar">
            This is sidebar

            <TrendingInfo />
        </div>
    )
}