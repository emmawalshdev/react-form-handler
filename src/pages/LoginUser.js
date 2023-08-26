import React, { useContext } from 'react';

import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import MainHeader from '../components/MainHeader/MainHeader';

import AuthContext from '../context/auth-context';

const LoginUser = () => {
  const ctx = useContext(AuthContext);
  
  return (
      <React.Fragment>
        {/* make available to all children */}
        <MainHeader isAuthenticated={ctx.isLoggedIn} onLogout={ctx.logoutHandler} />
        <main>
          {!ctx.isLoggedIn && <Login/>}
          {ctx.isLoggedIn && <Home/>}
        </main>
    </React.Fragment>
  );
}

export default LoginUser;
