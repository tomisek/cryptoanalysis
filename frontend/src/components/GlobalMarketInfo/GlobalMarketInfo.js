import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './GlobalMarketInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons'



    const GlobalMarketInfo = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [globalMarketInfo, setGlobalMarketInfo] = useState([]);
    const [capPercentage, setCapPercentage] = useState([]);
    const convertToDateTime = (dateString) => {
        dateString = new Date(dateString).toLocaleString()
        return dateString
    }

    const fetchData = async () => {
        try {
            const { data } = await CryptoShuttleService.globalMarketInfo()
            setIsLoaded(true);
            setGlobalMarketInfo(data);
            setCapPercentage(data.cap_percentage);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
        console.log(globalMarketInfo)
    }, [])
    
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
                        
            <div className="global-market-info">                                        
                <div className="market-info">   
                    <div>Active cryptos: {globalMarketInfo.active_cryptocurrencies}</div>
                    <div>Market Cap: ${globalMarketInfo.total_market_cap}</div>
                    <div className="cap-percentage"> Market Change: 
                        <div className={(globalMarketInfo.market_change_percentage < 0) ? 'negative' : 'positive'}>{globalMarketInfo.market_change_percentage}% <FontAwesomeIcon icon={(globalMarketInfo.market_change_percentage < 0) ? faLevelDownAlt : faLevelUpAlt}/></div>                                                                                                                 
                    </div>    
                    <div>Exchanges: {globalMarketInfo.total_markets}</div>
                    <div>24h-Volume: ${globalMarketInfo.total_volume}</div>
                    <div className="dominance"> 
                        {Object.keys(capPercentage).map((key, index) => {                                   
                            return <div key={index}>                                        
                                <span><img src={capPercentage[key].image} alt="logo" height="20"/></span>
                                <span>{capPercentage[key].market_cap_percentage}%</span>
                            </div>                                   
                        })                                                                   
                        }
                    </div>
                    <div>Updated at: {convertToDateTime(globalMarketInfo.updated_at)}</div>
                    
                </div>                
            </div>
        )
    }
}
export default GlobalMarketInfo