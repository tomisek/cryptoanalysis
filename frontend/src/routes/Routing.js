import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomeView } from '../views/HomeView'
import { UserContext } from '../shared/global/provider/UserProvider'
import { RegisterView } from '../views/RegisterView'
import { UserView } from '../views/UserView'
import { CoinView } from '../views/CoinView/CoinView'


export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const blockIfAuthenticated = (viewRoute) => {
        return authenticatedUser ? HomeView : viewRoute
    }
    const blockIfNotAuthenticated = (viewRoute) => {
        return !authenticatedUser ? HomeView : viewRoute
    }

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
                <Route exact path="/userregister" component={blockIfAuthenticated(RegisterView)} />
                <Route exact path="/userpage" component={blockIfNotAuthenticated(UserView)} />
                <Route path="/coins/:slug" component={CoinView} />
                <Route component={HomeView} />

            </Switch>
        </Router>
    )
}
