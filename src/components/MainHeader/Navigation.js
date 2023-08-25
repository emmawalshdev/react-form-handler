import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
          <ul>
            <li>
            <Link to='/users' >
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
        )
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
