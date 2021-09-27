import React, { useEffect, useState } from 'react'

function Topcoins() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [topcoins, setTopcoins] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/rest/topchart?currency=usd")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTopcoins(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h %</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(topcoins).map((key, index) => (
                            <tr key={index}>
                                <td><img src={topcoins[key].image} alt="logo" height="30" /></td>
                                <td>{topcoins[key].market_cap_rank}</td>
                                <td>{topcoins[key].name}</td>
                                <td>{topcoins[key].current_price}</td>
                                <td>{topcoins[key].price_change_percentage_24h}%</td>
                                <td>{topcoins[key].market_cap}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </>
        );
    }
}

export default Topcoins