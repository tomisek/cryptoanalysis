import React, { useState, useContext } from 'react'
import './Register.css'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import { UserContext } from '../../shared/global/provider/UserProvider'
import { useHistory } from 'react-router-dom'

export const Register = (props) => {

    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ name, setName ] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory()

    const logInUser = (userObject) => {

        setAuthenticatedUser(userObject['email'])
        localStorage.setItem("name", userObject['name'])
        console.log(authenticatedUser);
        history.push('/userpage')

    }
    const registerUser = async (event) =>{
        event.preventDefault()
        
        const userObject = {
            "email": email,
            "name": name,
            "password": password
        }
        
        try{
            const response = await CryptoShuttleService.registerUser(userObject)
            console.log(response);
            logInUser(userObject)
        }
        catch(error){
            if (error.response.data){
                // Show error message from server
                alert(error.response.data['error']);
            }

            console.error(error.message);
        }
    }

    return (
        <div className="registerPage">
            
            <div className="formWrapper">
                <h1 className="title">{props.title}</h1>
                <form onSubmit={registerUser}>
        
                    <label for="email">Email</label><input id="email" type="email" onChange={event => setEmail(event.target.value)} required></input>
                    <label for="name">Name</label><input id="name" onChange={event => setName(event.target.value)}></input>
                    <label for="password">Password</label><input id="password" type="password" onChange={event => setPassword(event.target.value)} required></input>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}