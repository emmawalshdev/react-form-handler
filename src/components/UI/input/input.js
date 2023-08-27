import React, { useRef, useImperativeHandle } from "react"; // imperative handler = rarely used hook 
import classes from './input.module.css'

// a react component which is capable of being bound to a ref
const Input = React.forwardRef((props, ref) => {

  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref,() => {
    return {
      focus: activate,
      // all data that can be used from outside
    }
  });

  return <div
    className={`${classes.control} ${
      props.isValid === false ? classes.invalid : ''
    }`}
  >
    <label htmlFor={props.id}>{props.label}</label>
    <input
      ref={inputRef}
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div>
});

export default Input;