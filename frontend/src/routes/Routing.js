import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { HomeView } from '../views/HomeView'
import { UserContext } from '../shared/global/provider/UserProvider'
import { UserView } from '../views/UserView'
import { CoinView } from '../views/CoinView/CoinView'



export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const checkIfUserIsAuthenticatedInBrowser = () => {
        setAuthenticatedUser(localStorage.getItem("token"))
    }

    useEffect(() => {

        checkIfUserIsAuthenticatedInBrowser()
    })

    return (

        <Router>
            {props.children}
            <Switch>
                <Route exact path="/userpage" component={UserView} />
                <Route path="/coins/:slug" component={CoinView} />
                <Route component={HomeView} />

            </Switch>
        </Router>
    )
}
