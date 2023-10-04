import React, { createContext, useContext, useState} from 'react';

const StateContext = createContext();
const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children}) =>{
    const [activeMenu, setActiveMenu] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isClicked, setisClicked] = useState(initialState);

    const [screenSize, setScreenSize] = useState(undefined);

    const [currentColor, setCurrentColor] = useState('#FFCC00');

    const [currentMode, setCurrentMode] = useState('Dark');

    const [themeSettings, setThemeSettings] = useState(false);

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value)
        setThemeSettings(false);    
    }

    const setColor = (mode) => {
        setCurrentColor(mode);
        localStorage.setItem('themeColor', mode)
        setThemeSettings(false);        
    }

    const handleClick = (clicked) =>{
        setisClicked({ ...initialState, [clicked]: true});
    }

    return (<StateContext.Provider
    value={{ activeMenu,
        setActiveMenu,
        isClicked,
        setisClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        isLoggedIn,
        setIsLoggedIn,
    }}
    >
         {children}
    </StateContext.Provider>

)}

export const useStateContext = ()=> useContext(StateContext);