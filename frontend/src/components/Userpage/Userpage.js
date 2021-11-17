import React, {useContext, useState} from 'react'
import "./Userpage.css"
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import { UserContext } from '../../shared/global/provider/UserProvider'
import { SavedForecast } from './SavedForecasts'

export const Userpage = (props) => {
 
    return (
        <div className="userPage">
            <h1>Welcome, {props.user.name}</h1>
            <SavedForecast userId={props.user.id} />
            
        </div>
    )
}