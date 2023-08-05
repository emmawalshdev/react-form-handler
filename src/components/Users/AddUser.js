import React, {useState, Fragment, useRef} from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // useState
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;

        // don't save values if not validated
        if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name & age (non-empty values)',
            });
            return;
        }
        if (+enteredUserAge < 1){ //convert to num
            setError({
                title: 'Invalid age',
                message: 'Please enter a value age (>0).',
            });
            return;
        }

        props.updateUserList(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    const errorHandler = () => {
        setError(null);
    }

    return ( 
        <Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" 
                      type="text" 
                      ref={nameInputRef}></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" 
                      ref={ageInputRef}></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Fragment>
    );
};

export default AddUser;