import React, {useContext}  from 'react'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'



export const Profile = () => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('name')
        setAuthenticatedUser(false)
        history.push('/')
    }

    return (
        <div>  
            <span>{authenticatedUser}</span>
            <hr/>
            <button onClick={() => logout()}> Logout</button>
        </div>
    )
}