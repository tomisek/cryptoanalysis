import React, {useState, useEffect} from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService'

export const SavedForecast = (props) => {
    const [data, setData] = useState([])

    const handleClick = () =>{
        console.log("clicked coin");
    }

    const getSavedForecasts = async () => {
        try{
            const { data } = await CryptoShuttleService.getSavedForecasts(props.userId)
            setData(data)
            console.log("data",data);

        }
        catch(e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        getSavedForecasts()
    },[])

    return (
        <div className="savedForecast">
            <h3>Your saved forecasts</h3>
            {Object.keys(data).map((key, index) => (
                <div key={index}>
                    <span onClick={handleClick}>{data[key].coin}</span>
                </div>
            ))}

        </div>
    )
}