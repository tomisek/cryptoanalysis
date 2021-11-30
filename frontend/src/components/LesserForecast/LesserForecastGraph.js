import React from 'react'
import './LesserForecast.css'
import moment from 'moment'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import Logotype from '../../shared/images/rocket-space-x.jpg'
const LesserForecastGraph = (data) => {



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



    return (
        <div className="forecast-graph">
            <h3>15-days preditcion</h3>
            
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={Object.values(data.lesserForecastGraph)}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.8} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.2} />
                    </linearGradient>
                    </defs>
                    <Area dataKey="yhat" stroke="#2451B7" fill="url(#color)" />
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
                    <CartesianGrid opacity={0.4} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>

            <div className="graph-info">
                <article>
                    <div className="expl-text">
                        <h3>Prediction Graph</h3>
                        
                        <p>Our prediction model is created by using historical data and the FbProphet AI model with multiplicative seasonality. 
                        Why multiplicative instead of addiative? The choice came down to looking at the data and realizing that it is not linear at all, 
                        because it is a market it is a ever chaning curve. This graph shows a restricted amount of days in the future.
                        To be able to see the use of filtering methods that shows when to buy and sell, win/loss percentage etc. (create an account). 
                        </p>
                    </div>
                    <div className="expl-picture">
                        <img src={Logotype} alt="img"></img>
                    </div>
                </article>
            </div>
        </div>
    )

}




export default LesserForecastGraph