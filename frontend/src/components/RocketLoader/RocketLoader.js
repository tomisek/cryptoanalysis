import React from "react";
import './RocketLoader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons'


const RocketLoader = () => {

   
        
    
    return (
            
            
        <div className="body">
            <div className="loader">
                <div className="rocket">
                    <FontAwesomeIcon icon={faRocket}/>
                </div>
                <div className="dot"></div>
            </div>
        </div>

            
            
    )

    

               
}
export default RocketLoader


