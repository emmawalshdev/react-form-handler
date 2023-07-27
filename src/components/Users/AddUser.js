import React, {useState} from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {

    // useState
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();

        // don't save values if not validated
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            return;
        }
        if (+enteredAge < 1){ //convert to num
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

    return ( 
        <div>
            <ErrorModal title="helo title" message="message title"/>
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler}></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;