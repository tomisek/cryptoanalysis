import React, {useState, createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = (props)  => {
    const [autheticatedUser, setAuthenticatedUser]   = useState()

    return(
        <UserContext.Provider value = {[autheticatedUser, setAuthenticatedUser]}>
            {props.children}
        </UserContext.Provider>
    )
}