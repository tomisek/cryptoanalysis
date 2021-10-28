import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './Search.css'

export const Search = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await CryptoShuttleService.search()
            setIsLoaded(true);
            setSearch(data.names);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = search.filter((value) =>{
            return value.id.toLowerCase().startsWith(searchWord.toLowerCase())
            // return value.id.toLowerCase().includes(searchWord.toLowerCase())
        });
        if(searchWord === "") {
            setFilteredData([]);
        }else {
            setFilteredData(newFilter)
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <div className="search">
                <div className="searchInputs">
                    <input type="text" placeholder="Search..." onChange={handleFilter} />
                </div>
                {filteredData.length !== 0 && ( 
                    <div className="dataResult">
                        {filteredData.map((value, key) => {
                            return(
                            <a key={key} className="dataItem" href={`/coins/${value.id}`}>
                                <p>{value.id}</p>
                            </a>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}