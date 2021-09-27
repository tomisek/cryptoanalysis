import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { HomeView } from '../views/HomeView'
import { UserContext } from '../shared/global/provider/UserProvider'


export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const checkIfUserIsAuthenticatedInBrowser = () => {
        setAuthenticatedUser(localStorage.getItem("email"))
    }

    useEffect(() => {
            
        checkIfUserIsAuthenticatedInBrowser()
    },)

    return (

        <Router>
            {props.children}
           <Switch>
               <Route component={HomeView}/>
               
            </Switch> 
        </Router>
    )
}
