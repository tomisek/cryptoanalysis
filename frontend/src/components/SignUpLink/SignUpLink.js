import React, {useContext} from 'react'
import { LoginButton } from '../LoginButton/LoginButton';
import "./SignUpLink.css"
import { PopupsContext } from "../../shared/global/provider/PopupsProvider"


export const SignUpLink = () => {
    const [open, setOpen] = useContext(PopupsContext)
    
    
    

    return (

        <div className="sign-up-link">
            
                
                <p>New to Crypto Shuttle? </p>
                <p onClick={() => {setOpen(true)}} className="register"> Register</p>

                
            


        </div>


    )


}