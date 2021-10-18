import React from 'react'
import './LastViewed.css'


export const LastViewed = () => {

    let lastViewedCoins = JSON.parse(localStorage.getItem("lastViewedCoins"));

    console.log(lastViewedCoins)


    return (
        <div className="last-viewed">
            <h3>Last Viewed</h3>
            {lastViewedCoins.slice(0).reverse().map((lastViewedCoin) => (
                <div>{lastViewedCoin}</div>
            ))}
        </div>
    )

}