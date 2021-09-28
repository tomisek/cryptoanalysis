import axios from 'axios';

const development = "http://127.0.0.1:5000"
const production = "tbd"

const CryptoShuttleAPI = axios.create({
    baseURL: development,
    headers: {'Content-Type': 'application/json'}
})

export default CryptoShuttleAPI