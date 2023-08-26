import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
      <nav className={classes.nav}>
      <ul>
        <li>
        <Link to='/' >
          Users
        </Link>
        </li>
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
