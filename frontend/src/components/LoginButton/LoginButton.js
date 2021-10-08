import React, { useContext, useState } from "react"
import './LoginButton.css'
import Popup from "reactjs-popup"
import { UserContext } from "../../shared/global/provider/UserProvider"
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService"
import {useHistory} from "react-router-dom"


export const LoginButton = () => {
 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory();

    
    

    const handleSubmit = async (event)   => {
        event.preventDefault()

       try{
        const userFromServer = await CryptoShuttleService.loginUser({email, password})
        console.log(userFromServer.data)
        console.log(authenticatedUser)
        setAuthenticatedUser(userFromServer.data.name)
        localStorage.setItem("name", userFromServer.data.name)
        /* document.getElementsById('noMatch').style.visibility = "hidden" */
        }
        catch(error){
            document.getElementById("noMatch").style.visibility = "visible"
        }        
    }
    
    return (
        <div >
            <Popup  trigger={<button className="triggerButton"> Login</button>} modal >
                {close => (
                    <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div>Log In</div><br/>
                        <div>
                            New to Crypto Shuttle?
                            <span className="create-account" onClick={() => {close(); history.push('/userregister')}}>Create an account</span>
                        </div><br/>
                        <div>
                        <label ><b>Email</b></label><br/>
                        <input onChange={event => setEmail(event.target.value)} type="email" className="email" placeholder="Enter Email" name="email" required></input>
                        </div><br/>
                        <div>
                        <label><b>Password</b></label><br/>
                        <input onChange={event => setPassword(event.target.value)} type="password" className="password" placeholder="Enter Password" name="psw" required></input>
                        
                        <div id="noMatch">Your email and password doesnt match. Please try again</div>
                        </div><br/>
                        <div>
                        <button type="submit" className="submit">Submit</button> 
                        </div>
                    </form>
                </div>
                )}
                
            </Popup>        
        </div>
    )
}