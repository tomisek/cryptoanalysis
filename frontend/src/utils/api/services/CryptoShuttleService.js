import http from '../CryptoShuttleAPI'

const topChart = () => {
    return http.get("/rest/topchart?currency=usd")
}

const loginUser = (userLogin) => {
    
    return http.post("/user/login", userLogin,  {
        
    } );
}

const registerUser = (userObject) => {
    return http.post("/user/register", userObject)
}

export default {topChart, loginUser, registerUser}