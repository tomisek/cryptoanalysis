import React, {useContext}  from 'react'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'



export const Profile = () => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory()

    const logout = async () => {

        try{
            const userFromServer = await CryptoShuttleService.logoutUser()
            console.log(userFromServer)
            localStorage.removeItem('name')
            setAuthenticatedUser(false)
            history.push('/')

        }
        catch(error){
            console.log("funkar ej")
        }
        
    }

    return (
        <div>  
            <span>{authenticatedUser}</span>
            <hr/>
            <button onClick={() => logout()}> Logout</button>
        </div>
    )
}