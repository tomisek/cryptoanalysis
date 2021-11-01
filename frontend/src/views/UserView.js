import React,{useState, useEffect} from "react";
import { Userpage } from "../components/Userpage/Userpage";
import CryptoShuttleService from "../utils/api/services/CryptoShuttleService";

export const UserView = () => {

    let  [user, setUser] = useState()
    
    const userAuthBackend = async () => {
        try{
            const getUserWithToken = await CryptoShuttleService.getLoggedInUser(localStorage.getItem('token'))
            setUser(getUserWithToken.data.logged_in_as)
        }
        catch(e){
            console.log(e.message);
        }
    }

    useEffect(() => {
        userAuthBackend()
    })
    return(
        <>
             {user ? <Userpage /> : "You need to log in first" }
        </>
    )
}