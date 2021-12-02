import React, { useEffect, useRef } from 'react'
import './Darkmode.css'
import {
    setFetchMethod,
    enable as enableDarkMode,
    disable as disableDarkMode,
    auto as followSystemColorScheme,
    isEnabled as isDarkReaderEnabled
} from 'darkreader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export const Darkmode = () => {

    // Sets darkmode
    const darkmode = () => {
        setFetchMethod(window.fetch)
        enableDarkMode({
            brightness: 100,
            contrast: 90,
            sepia: 10,
        });
        followSystemColorScheme();
    }

    // Toggle between normal and darkmode
    const toggleDarkmode = () => {
        const isEnabled = isDarkReaderEnabled();

        if (!isEnabled) {
            darkmode()
            localStorage.setItem("darkmode", true);
        } else {
            disableDarkMode();
            localStorage.setItem("darkmode", false);
        }
    }

    // Calls darkmode function if saved in localstorage
    if (localStorage.getItem("darkmode") === "true") {
        darkmode()
    } else {
        disableDarkMode();
    }

    // Checks darkmode button if saved in localstorage
    useEffect(() => {
        if (localStorage.getItem("darkmode") === "true") {
            document.getElementById("darkmode-button").checked = true;
        } else {
            document.getElementById("darkmode-button").checked = false;
        }
    });

    return (
        <div className="darkmode">
            <label className="switch">
                <input id="darkmode-button" onClick={toggleDarkmode} type="checkbox"></input>
                <span className="slider round">
                    <FontAwesomeIcon className="sun" icon={faSun} />
                    <FontAwesomeIcon className="moon" icon={faMoon} />
                </span>
            </label>
        </div>
    )
}