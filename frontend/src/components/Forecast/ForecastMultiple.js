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
        <div className="forecast-mulitple">
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
                    <Line dataKey="yhat_upper" stroke="#82ca9d" dot={false} strokeWidth={1} />
                    <Line dataKey="yhat" stroke="#ffc658" dot={false} strokeWidth={1} />
                    <Line dataKey="yhat_lower" stroke="#8884d8" dot={false} strokeWidth={1} />
                    <Tooltip content={<CustomTooltip />} animationDuration={0} />
                    <Legend />
                    <CartesianGrid opacity={0.4} vertical={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ForecastMultiple