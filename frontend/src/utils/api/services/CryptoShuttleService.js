import http from '../CryptoShuttleAPI'

const topChart = () => {
    return http.get("/rest/topchart?currency=usd")
}

const marketGraph = (slug) => {
    return http.get(`/rest/market/graph?coin=${slug}`)
}

const loginUser = (userLogin) => {
    
    return http.post("/user/login", userLogin,  {
        
    } );
}


const logoutUser = () => {

    return http.get("/user/logout")
}


const trendingInfo = () => {
    return http.get("/rest/trending/info")
}


const registerUser = (userObject) => {
    return http.post("/user/register", userObject)
}

const coinInfo = (slug) => {
    return http.get(`/rest/market/info?coin=${slug}`)
}

export default {topChart, loginUser, logoutUser, registerUser, marketGraph, trendingInfo, coinInfo}

