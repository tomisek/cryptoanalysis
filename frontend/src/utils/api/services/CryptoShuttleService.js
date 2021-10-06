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

export default {topChart, loginUser, registerUser, marketGraph}
