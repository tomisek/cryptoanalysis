import React from 'react'
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

    const toggleDarkmode= () => {
        setFetchMethod(window.fetch)
        const isEnabled = isDarkReaderEnabled();

        if (!isEnabled) {
            enableDarkMode({
                brightness: 100,
                contrast: 90,
                sepia: 10,
            });
            followSystemColorScheme();
        } else {
            disableDarkMode();
        }
    }

    return (
        <div className="darkmode">
            <label class="switch">
                <input onClick={toggleDarkmode} type="checkbox"></input>
                <span class="slider round">
                    <FontAwesomeIcon className="sun" icon={faSun} />
                    <FontAwesomeIcon className="moon" icon={faMoon} />
                </span>
            </label>
        </div>
    )
}