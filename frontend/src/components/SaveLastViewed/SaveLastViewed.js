import React from 'react'
import { useParams } from 'react-router-dom'


const SaveLastViewed = () => {
    let { slug } = useParams()


    const saveLastViewed = () => {
        let lastViewedCoins = []
        lastViewedCoins = JSON.parse(localStorage.getItem("lastViewedCoins"));

        if (lastViewedCoins.length > 5) {
            lastViewedCoins.shift()
        }

        lastViewedCoins.indexOf(slug) === -1 ? lastViewedCoins.push(slug) : console.log("This item already exists");

        localStorage.setItem("lastViewedCoins", JSON.stringify(lastViewedCoins));
    }

    saveLastViewed()

    return false;
}

export default SaveLastViewed