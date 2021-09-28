import React, {useContext}  from 'react'
import {UserContext} from '../../shared/global/provider/UserProvider'

export const Profile = () => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    return (
        <div>
            
            <span>{authenticatedUser.email}</span>
        </div>
    )
}