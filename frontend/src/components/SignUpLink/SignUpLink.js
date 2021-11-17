import React from 'react'
import { useHistory } from 'react-router-dom';
import { LoginButton } from '../LoginButton/LoginButton';
import "./SignUpLink.css"


export const SignUpLink = () => {
    const history = useHistory();
    
    
    

    return (

        <div className="sign-up-link">
            
                
                <p>New to Crypto Shuttle? </p>
                <p onClick={() => history.push('/userregister')} className="register"> Register</p>

                
            


        </div>


    )


}