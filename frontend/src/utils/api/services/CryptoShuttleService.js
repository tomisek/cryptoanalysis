import http from '../CryptoShuttleAPI'

const topChart = () => {
    return http.get("/rest/topchart?currency=usd")
}

const loginUser = (userLogin) => {
    
    return http.post("/user/login", userLogin,  {
        
    } );
}

const trendingInfo = () => {
    return http.get("/rest/trending/info")
}

export default {topChart, loginUser, trendingInfo}