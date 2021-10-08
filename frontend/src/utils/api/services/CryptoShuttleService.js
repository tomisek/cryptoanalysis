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

const registerUser = (userObject) => {
    return http.post("/user/register", userObject)
}

const forecastInfo = (slug) => {
    return http.get(`/rest/forecast/coins?coin=${slug}`)
}

export default { topChart, loginUser, registerUser, marketGraph, forecastInfo}
