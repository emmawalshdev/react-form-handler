import React, { useState, useRef, useContext, useEffect, useReducer } from 'react';

import Card from '../UI/Card';
import classes from './Login.module.css';
import Button from '../UI/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/input/input';

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

  // pull out values for isValid
  const { isValid: emailIsValid } = emailState; // use object destructuring to extract isvalid from email state, store as emailIsValid (alias)
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('timeout - checking form validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500); // run only after timeout after final keystroke

    return () => {
      console.log('clean up');
      clearTimeout(identifier);
    }; // runs when component is rerenders + after first sideEffect
  }, [ emailIsValid, passwordIsValid ]); // run only if one of these have changed 


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value }); // trigger reducer function, pass in action (USER INPUT) + value entered

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' }) // ommit val as input lost focus
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid){
      emailInputRef.current.focus(); // use external name from input.js
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <h2>User Login</h2>
        <p>Login to begin using Teamwork</p>
        <Input 
          ref={emailInputRef}
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          ref={passwordInputRef}
          id="password" 
          label="Password" 
          type="password" 
          isValid={passwordIsValid} 
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
