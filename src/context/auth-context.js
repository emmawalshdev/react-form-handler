// stand alone file which handles login state

import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}

}); // object component

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        console.log('login use effect')
        const loggedInInfo = localStorage.getItem('isLoggedIn');

        if(loggedInInfo === '1'){
            setIsLoggedIn(true);
        }
    }, []); // run only when first rendered

    const logoutHandler = () => {
        console.log('loggedout')
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn,
                onLogout:logoutHandler,
                onLogin: loginHandler }}>
        {props.children}
    </AuthContext.Provider>

};

export default AuthContext;