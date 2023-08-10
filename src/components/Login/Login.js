import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card';
import classes from './Login.module.css';
import Button from '../UI/Button';

const emailReducer = (state, action) => { // receives last state + action dispatched
  if(action.type === 'USER_INPUT') {
    console.log('user input');
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if(action.type === 'INPUT_BLUR'){
    console.log('input blur');
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false } // return new updated state
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    console.log('pr input');
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if(action.type === 'INPUT_BLUR') {
    console.log('pr blur');
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false } // return new updated state
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { // get state snapshot automatically + action dispatched
    value: '', 
    isValid: false // initial state as second arguement
  }); 

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('timeout');
  //     setFormIsValid(
  //       enteredEmail.isValid && enteredPassword.trim().length > 6
  //     );
  //   }, 500); // run only after timeout after final keystroke

  //   return () => {
  //     console.log('clean up');
  //     clearTimeout(identifier);
  //   }; // runs when component is rerenders + after first sideEffect
  // }, [ enteredEmail, enteredPassword]); // run only if one of these have changed 

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value }); // trigger reducer function, pass in action (USER INPUT) + value entered

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' }) // ommit val as input lost focus
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
