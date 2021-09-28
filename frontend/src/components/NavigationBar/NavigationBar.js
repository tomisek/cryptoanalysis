import React from 'react'
import { LoginButton } from '../LoginButton/LoginButton'
import './NavigationBar.css'

export const NavigationBar = () => {
    return(
        <div className="navBar">
            <div className="loginButton">
                <LoginButton />
            </div>
            
        </div>
    )
}