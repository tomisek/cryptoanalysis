import React, {useContext, useState} from 'react'
import "./Userpage.css"
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import { UserContext } from '../../shared/global/provider/UserProvider'

export const Userpage = (props) => {
 
    return (
        <div className="userPage">
            <h1>Welcome, {props.name}</h1>
            
        </div>
    )
}