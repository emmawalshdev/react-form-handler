import React, {useState} from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {

    // useState
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();

        // don't save values if not validated
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name & age (non-empty values)',
            });
            return;
        }
        if (+enteredAge < 1){ //convert to num
            setError({
                title: 'Invalid age',
                message: 'Please enter a value age (>0).',
            });
            return;
        }
        setEnteredUsername('');
        setEnteredAge('');
        console.log(enteredUsername, enteredAge);

        props.updateUserList(enteredUsername, enteredAge);
    }

    const usernameChangeHandler = (event) => {
        if(event.target.value !== ''){
            setEnteredUsername(event.target.value);
        }
    }

    const ageChangeHandler = (event) => {
        if(event.target.value > 0){
            setEnteredAge(event.target.value);
        }
    }

    const errorHandler = () => {
        setError(null);
    }

    return ( 
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler}></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser;