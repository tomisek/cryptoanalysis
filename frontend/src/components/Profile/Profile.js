import React, { useEffect, useContext, useState}  from 'react'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'
import { LoginButton } from '../LoginButton/LoginButton'
import { Register } from '../register/Register'

export const Profile = () => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    

    const fetchData = async (authenticatedUser) => {
        try {
            const { data } = await CryptoShuttleService.getLoggedInUser(authenticatedUser)
            setIsLoaded(true);
            setUser(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }
    const handleUserPage = () =>{
        history.push('/userpage')
    }

    useEffect(() => {
        fetchData(authenticatedUser)
    }, [authenticatedUser])

   

    const logout = async () => {

        try{
            const userFromServer = await CryptoShuttleService.logoutUser()
            console.log(userFromServer)
            localStorage.removeItem('token')
            setAuthenticatedUser(false)
            history.push('/')

        }
        catch(error){
            console.log("funkar ej")
        }
        
    }

    if (isLoaded && user.logged_in_as) {
        return (
            <div className="profileWrapper">  
                <button className="myPageButton" onClick={handleUserPage}>My Page</button>
                <button className="logOutButton"  onClick={() => logout()}> Logout</button>
                <span className="userLoggedIn">{user.logged_in_as.name}</span>
            </div>
        )
    }
    else if (!isLoaded || !user.logged_in_as) {
        return   (
            <div className="logField">
                <div className="item">
                    <Register/>
                </div>
                <div className="item">
                    <LoginButton/>
                </div>
            </div>
        )}
    else if (error) {
        return <div>Error: {error.message}</div>;
    } 
     
}