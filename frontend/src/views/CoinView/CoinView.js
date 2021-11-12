import React,{useState, useContext, useRef} from "react";
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { CoinInfoBox } from '../../components/CoinInfoBox/CoinInfoBox'
import Forecast from '../../components/Forecast/Forecast'
import SaveLastViewed from '../../components/SaveLastViewed/SaveLastViewed'
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService";
import { UserContext } from '../../shared/global/provider/UserProvider'





export const CoinView = () => {
    let btnRef = useRef();
    const [showResults, setShowResults] = React.useState(false)
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    let  [user, setUser] = useState()
    const onClick = () => {setShowResults(true)
        
        if(btnRef.current){
            btnRef.current.setAttribute("hidden", "hidden");
        }
        userAuthBackend()
        
    }
        
            
       
   
    
    
    const userAuthBackend = async () => {
        
        setAuthenticatedUser(localStorage.getItem('token'))
        console.log(authenticatedUser)

        if(authenticatedUser == null){
            console.log('login to use')
        }else if(authenticatedUser != null) {
                console.log(authenticatedUser)
            try{
                const getUserWithToken = await CryptoShuttleService.getLoggedInUser(localStorage.getItem('token'))
                setUser(getUserWithToken.data.logged_in_as)
                
            }
            catch(e){
                console.log(e.message);
            }
        }
        
    }
    
   
    



    
    return (
        <div className="main">
            <div className="coin-view">
                <CoinInfoBox />
                <CoinHistoryGraph />
                <SaveLastViewed />
                
                <input ref={btnRef} type="submit" value="Run Forecast" onClick={onClick} />
                { showResults && user ? <Forecast user={user} /> : null }
                
                  
                
                    

                
            </div>
        </div>
    )
}