import React from 'react'
import { useHistory } from 'react-router-dom';
import { LoginButton } from '../LoginButton/LoginButton';



export const SignUpLink = () => {
    const history = useHistory();
    

    


    return (

        <div className="sign-up-link">
            <div>
                <LoginButton/>
            </div>
            <span>New to Crypto Shuttle?</span>
            <span onClick={() => history.push('/userregister')} className="register" > Register</span>


        </div>


    )


}