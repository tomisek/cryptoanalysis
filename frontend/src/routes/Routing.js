import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomeView } from '../views/HomeView'
import { UserContext } from '../shared/global/provider/UserProvider'
import { RegisterView } from '../views/RegisterView'
import { UserView } from '../views/UserView'


export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const checkIfUserIsAuthenticatedInBrowser = () => {
        setAuthenticatedUser(localStorage.getItem("name"))
        console.log(authenticatedUser)
    }

    useEffect(() => {

        checkIfUserIsAuthenticatedInBrowser()
    })

    return (

        <Router>
            {props.children}
            <Switch>
                <Route exact path="/userregister" component={RegisterView} />
                <Route exact path="/userpage" component={UserView} />
                <Route component={HomeView} />

            </Switch>
        </Router>
    )
}
