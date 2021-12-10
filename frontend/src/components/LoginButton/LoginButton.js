import React, { useContext, useState } from "react"
import './LoginButton.css'
import Popup from "reactjs-popup"
import { UserContext } from "../../shared/global/provider/UserProvider"
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService"
import { PopupsContext } from "../../shared/global/provider/PopupsProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import useForm from "./UseForm"
import validate from "./LoginFormValidationRules"


export const LoginButton = () => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const [open, setOpen] = useContext(PopupsContext)
    const [passwordShown, setPasswordShown] = useState(false)
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);



    async function login(e) {
        if (e) e.preventDefault()

        try {
            const email = values.email
            const password = values.password
            const userFromServer = await CryptoShuttleService.loginUser({ email, password })
            setAuthenticatedUser(userFromServer.data.access_token)
            localStorage.setItem("token", userFromServer.data.access_token)
            let btn = document.getElementById('forecastBtn')
            if (btn) {

                btn.removeAttribute("hidden")
            }

        }
        catch (error) {
            document.getElementById("noMatch").style.visibility = "visible"
        }
    }

    return (
        <div >
            <Popup trigger={<button className="triggerButton"> Login</button>} modal >
                {close => (
                    <div className="wrapper">

                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <h4>Log In</h4>
                        <div>
                            New to Crypto Shuttle?
                            <span className="create-account" onClick={() => { close(); setOpen(true) }}> Create an account.</span>
                        </div><br />

                        <form onSubmit={handleSubmit} noValidate>
                            <div>
                                <label htmlFor="email">Email</label><input autoComplete="off" className={`input  ${errors.email}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                                {errors.email && (
                                    <p className="help">{errors.email}</p>
                                )}
                            </div><br />
                            <div className="login-password-icon">
                                <label htmlFor="password">Password</label>
                                <input onChange={handleChange} name="password" type={passwordShown ? "text" : "password"} className={`input ${errors.password}`} placeholder="Enter Password" value={values.password || ''} required></input>
                                {errors.password && (
                                    <p className="help">{errors.password}</p>
                                )}
                                <i className="eye-icon-login" onClick={togglePasswordVisiblity}>{passwordShown ? eyeSlash : eye}</i>
                            </div><br />
                            <div id="noMatch">Your email and password doesnt match. Please try again</div>
                            <button type="submit" className="submit">Submit</button>
                        </form>
                    </div>
                )}
            </Popup>
        </div>
    )
}