import React from 'react'
import './Sidebar.css'
import { TrendingInfo } from '../TrendingInfo/TrendingInfo'
import { LastViewed } from '../LastViewed/LastViewed'
export const Sidebar = () => {
    return (
        <div className="sidebar">
            <LastViewed />
            <TrendingInfo />
        </div>
    )
}