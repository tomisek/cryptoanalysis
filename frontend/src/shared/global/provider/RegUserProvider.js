import React, {useState, createContext} from 'react'

export const RegUserContext = createContext()

export const RegUserProvider = (props)  => {
    const [registerError, setRegisterError]   = useState()

    return(
        <RegUserContext.Provider value = {[registerError, setRegisterError]}>
            {props.children}
        </RegUserContext.Provider>
    )
}