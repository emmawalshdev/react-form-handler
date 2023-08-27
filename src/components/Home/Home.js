import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Home.module.css';
import AuthContext from '../../context/auth-context';

const Home = () => {

  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <p>
        Click <Link to='/users' >here</Link> to begin adding users.
      </p>
      <Button onClick={authCtx.onLogout}>Logout</Button>

    </Card>
  );
};

export default Home;
