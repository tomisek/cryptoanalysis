import React, {useContext} from 'react'
import { LoginButton } from '../LoginButton/LoginButton'
import { Search } from '../Search/Search'
import './NavigationBar.css'
import Logotype from '../../shared/images/logotype.svg'
import { useHistory } from 'react-router-dom'
import { Profile } from '../Profile/Profile'
import { UserContext} from '../../shared/global/provider/UserProvider'
import { Register } from '../register/Register'

export const NavigationBar = () => {
    const history = useHistory();
    const [authenticatedUser, setAuthenticatedUser] = useContext (UserContext)

    
    const displayUserIfAuthenticated = () => {
        return (authenticatedUser) ? <Profile/>
        : <div>
            <span className="logButton">
            <LoginButton/>
            </span>
            <span className="regButton">
                <Register/>
            </span>
            
        </div>
    }


    return (
        <div className="navBar">
            <img onClick={() => history.push('/')} className="logotype"
                src={Logotype} alt="Error..." />
            {/* <span onClick={() => history.push('/userregister')} className="register" >Register</span> */}
            <div >
                {displayUserIfAuthenticated()}
            </div>
            <Search />
        </div>
    )
}