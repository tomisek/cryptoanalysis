import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService";
import { CoinInfo } from "./CoinInfo";

export const CoinInfoBox = () =>  {
    const [isLoading, setIsLoading] = useState(true)
    const [coinInfo, setCoinInfo] = useState()
    const [error, setError] = useState(null)
    let { slug } = useParams()

    const fetchCoinInfo = async (slug) => {
        try {
            const response = await CryptoShuttleService.coinInfo(slug)
            setIsLoading(false)
            setCoinInfo(response.data)
            // console.log("parent",coinInfo[0]);
        }
        catch (error){
            setIsLoading(false)
            setError(error)
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCoinInfo(slug)
    }, [slug])

    if (!coinInfo) return "Loading coin info..."
    else if (error) {
        return `Error: ${error.message}`
    }
    return (
        <CoinInfo coinInfo= {coinInfo}/>
        
    )
}