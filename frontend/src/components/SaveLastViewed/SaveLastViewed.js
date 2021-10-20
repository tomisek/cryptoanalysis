import { useParams } from 'react-router-dom'

const SaveLastViewed = () => {
    let { slug } = useParams()


    const saveLastViewed = () => {
        let lastViewedCoins = JSON.parse(localStorage.getItem("lastViewedCoins"));

        if (lastViewedCoins) {
            if (lastViewedCoins.length > 5) {
                lastViewedCoins.shift()
            }
            if (lastViewedCoins.indexOf(slug) === -1) { 
                lastViewedCoins.push(slug)
            }
        }else {
            lastViewedCoins = []
        }

        localStorage.setItem("lastViewedCoins", JSON.stringify(lastViewedCoins));
    }

    saveLastViewed()

    return false;
}

export default SaveLastViewed