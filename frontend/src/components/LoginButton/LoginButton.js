import React, { useContext, useState } from "react"
import './LoginButton.css'
import Popup from "reactjs-popup"
import { UserContext } from "../../shared/global/provider/UserProvider"
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService"


export const LoginButton = () => {
 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    

    const handleSubmit = async (event)   => {
        event.preventDefault()

       try{
        const userFromServer = await CryptoShuttleService.loginUser({email, password})
        
        console.log(userFromServer.data)
        setAuthenticatedUser(userFromServer.data.name)
        localStorage.setItem("name", userFromServer.data.name)
        }
        catch(error){
            console.log("funkar ej")
        }        
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

                        <button type="submit" >Submit</button> 

                    </form>
                </div>
            </Popup>
            {/* {displayUserIfAuthenticated()} */}
            
        </>
    )
}