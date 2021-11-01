import React, {useContext, useState} from 'react'
import "./Userpage.css"
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import { UserContext } from '../../shared/global/provider/UserProvider'

export const Userpage = () => {
 
    return (
        <div className="userPage">
            <h1>Welcome, {localStorage.getItem('token')}</h1>
            
        </div>
    )
}