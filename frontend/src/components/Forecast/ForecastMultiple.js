import React from 'react'
import './Forecast.css'
import moment from 'moment'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
    Legend,
} from "recharts";
import Logotype from '../../shared/images/graph-line.jpg'

const ForecastMultiple = (data) => {

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
        <div className="forecast-multiple">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={Object.values(data.forecastMultiple)}>
                    <XAxis
                        dataKey="ds"
                        tick={CustomizedAxisTick}
                    />
                    <YAxis
                        tickCount={8}
                        tickFormatter={(number) => `$${number}`}
                    />
                    <Line name="Predicted Upper" dataKey="yhat_upper" stroke="#82ca9d" dot={false} strokeWidth={1} />
                    <Line name="Predicted" dataKey="yhat" stroke="#ffc658" dot={false} strokeWidth={1} />
                    <Line name="Predicted Lower" dataKey="yhat_lower" stroke="#8884d8" dot={false} strokeWidth={1} />
                    <Tooltip content={<CustomTooltip />} animationDuration={0} />
                    <Legend verticalAlign="top" height={36} />
                    <CartesianGrid opacity={0.4} />
                </LineChart>
            </ResponsiveContainer>
            <div className="graph-info">
                <article>
                    <div className="expl-text">
                        <h3>explanatory text</h3>
                        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. </p>
                    </div>
                    <div className="expl-picture">
                        <img src={Logotype} alt="img"></img>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default ForecastMultiple