import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './Search.css'

export const Search = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await CryptoShuttleService.search()
            setIsLoaded(true);
            setSearch(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(search)

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <form action="/" method="get">
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Search"
                        name="s"
                    />
                </form>
            </div>
        )
    }
}