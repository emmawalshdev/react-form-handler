import React, { useState, useEffect } from 'react';

import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import MainHeader from '../components/MainHeader/MainHeader';
import AuthContext from '../context/auth-context';

const LoginUser = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      console.log('login use effect')
      const loggedInInfo = localStorage.getItem('isLoggedIn');

      if(loggedInInfo === '1'){
        setIsLoggedIn(true);
      }
    }, []); // run only when first rendered

    const loginHandler = (email, password) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', '1');
    };
  
    const logoutHandler = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    };
  
    return (
        <React.Fragment>
          {/* make available to all children */}
          <AuthContext.Provider
            // if value changes then update is passed down
            value={{
              isLoggedIn: isLoggedIn,
            }}
          >
          <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
          <main>
            {!isLoggedIn && <Login onLogin={loginHandler} />}
            {isLoggedIn && <Home onLogout={logoutHandler} />}
          </main>
          </AuthContext.Provider> 
      </React.Fragment>
    );
}

export default LoginUser;
