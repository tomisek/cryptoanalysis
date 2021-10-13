import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './Forecast.css'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    Brush,
    Legend,
    Line,
    Label,
} from "recharts";

const Forecast = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecastInfo, setForecastInfo] = useState([]);
    const [forecastGraph, setForecastGraph] = useState([]);
    let { slug } = useParams();

    const fetchData = async (slug) => {
        try {
            const { data } = await CryptoShuttleService.forecastInfo(slug)
            setIsLoaded(true);
            setForecastInfo(data.coin);
            setForecastGraph(data.graph);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(slug)
    }, [slug])

    //Converts the timestamp to a readable string
    Object.values(forecastInfo).map((val) => {
        val.buy_date = (new Date(val.buy_date)).toISOString().substr(0, 10).valueOf();
        val.sell_date = (new Date(val.sell_date)).toISOString().substr(0, 10).valueOf();
        return val
    })

    var total = Object.keys(forecastGraph).length;
    const percentage = 100 - ((365 / total) * 100) 
    

    
    
    
    
    
        
        
    
    // Customises the graphs ticks on the X-axis
    const CustomizedAxisTick = ({ x, y, payload }) => {
        const dateTip = moment(payload.value)
            .format("YYYY-MM-DD")
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
                    {dateTip}</text>
            </g>
        );
    }
    
    // Customises the graphs tooltips box
    const CustomTooltip = ({ active, payload, label }) => {
        const dateTip = moment(label)
            .format("ll")
            .slice(0, 12);
        const formattedDate = dateTip
        if (payload === null) return
        if (active)
            return (
                <div className="custom-tooltip">
                    <p className="label-tooltip">{`${formattedDate}`}</p>
                    <p className="desc-tooltip">
                        <span className="value-tooltip">Price: {payload[0].value.toLocaleString()}</span>
                    </p>
                </div>
            );
        return null;
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="forecast">
                <div className="forecast-info">
                    <h2>forecast info</h2>
                    {Object.keys(forecastInfo).map((key, index) => (
                        <div key={index}>
                            <div>Max gain: {forecastInfo[key].max_gain_procent}%</div>
                            <div>buy date: {forecastInfo[key].buy_date}</div>
                            <div>buy price: ${forecastInfo[key].buy_price}</div>
                            <div>sell date: {forecastInfo[key].sell_date}</div>
                            <div>sell price: ${forecastInfo[key].sell_price}</div>
                        </div>

                    ))}
                </div>
                <div className="forecast-graph">
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={Object.values(forecastGraph)}>
                            <defs>

                                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                                    <stop offset="0%" stopColor="blue"/>
                                    <stop offset={`${percentage}%`} stopColor="blue"/>
                                    <stop offset={`${percentage}%`} stopColor="red"/>
                                    <stop offset="100%" stopColor="red"/>
                                </linearGradient>
                                
                            </defs>
                                                      
                            <Area dataKey="yhat" stroke="url(#gradient)" fill="url(#gradient)" fillOpacity={0.4}/>
                            <XAxis
                                dataKey="ds"
                                tick={CustomizedAxisTick}
                            />
                            <YAxis 
                                dataKey="yhat"
                                axisLine={false}
                                tickLine={false}
                                tickCount={8}
                                tickFormatter={(number) => `$${number}`}

                            />
                            
                            <Tooltip content={<CustomTooltip />} animationDuration={0} />
                            <CartesianGrid  opacity={0.4} vertical={false}/>
                            <Brush dataKey="ds" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}

export default Forecast