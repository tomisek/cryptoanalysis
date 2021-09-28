import React, { useContext, useState, useEffect } from "react"
import './LoginButton.css'
import Popup from "reactjs-popup"
import { UserContext } from "../../shared/global/provider/UserProvider"
import { Profile } from "../Profile/Profile"


export const LoginButton = () => {
 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useState()
    

    /* useEffect(() => {
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(authenticatedUser),
        })
        .then(response => response.json())
        .then(authenticatedUser => {
            console.log('Succes:', authenticatedUser);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }) */

    const displayUserIfAuthenticated = () => {
        return (authenticatedUser) ? <Profile/>
        : <Popup/>
    }

    const handleSubmit = (event)   => {
        event.preventDefault()
        /* setAuthenticatedUser({email, password}) */
        console.log(authenticatedUser)
        console.log(authenticatedUser.email)
        console.log(authenticatedUser.password)
    }

    const login = () => {
       
        localStorage.setItem("email", email) 
        setAuthenticatedUser({email, password})
            
    }

    return (
        <>
            <Popup trigger={<button> Login</button>} position="right center">
                <div>
                    <form onSubmit={handleSubmit}>
                        <label ><b>Email</b></label>
                        <input onChange={event => setEmail(event.target.value)} type="text" placeholder="Enter Email" name="email" required></input>

                        <label><b>Password</b></label>
                        <input onChange={event => setPassword(event.target.value)} type="password" placeholder="Enter Password" name="psw" required></input>

                        <button onClick={() => login()}>Submit</button>      

                    </form>
                </div>
            </Popup>
            {displayUserIfAuthenticated()}
            
        </>
    )
}