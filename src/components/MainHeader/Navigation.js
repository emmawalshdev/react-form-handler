import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
      <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <Link to='/users' >
              Users
            </Link>
          </li>
        )}

        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
        {!ctx.isLoggedIn && (
          <li>
            <Link to='/login' >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
