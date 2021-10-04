import React, { useState, useContext } from 'react'
import './Register.css'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import { UserContext } from '../../shared/global/provider/UserProvider'

export const Register = (props) => {

    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ name, setName ] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)


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
            setAuthenticatedUser(userObject)

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

            <h1 className="title">{props.title}</h1>
            
            <div className="formWrapper">
                <form onSubmit={registerUser}>
        
                    <span>Email</span><input type="email" onChange={event => setEmail(event.target.value)} required></input> <br/>
                    <span>Name</span><input onChange={event => setName(event.target.value)}></input> <br/>
                    <span>Password</span><input type="password" onChange={event => setPassword(event.target.value)} required></input> <br/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}