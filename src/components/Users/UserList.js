import React from "react";
import classes from './UserList.module.css';
import Card from "../UI/Card";

const UserList = (props) => {
    console.log(props.users);
    return <Card className={classes.users}>
        {props.users.length >0 &&  <ul>
            {props.users.map((user)=> (
                <li key={user.key}>
                    {user.name} ({user.age} years old)
                </li>
            ))}
        </ul>
        }
    </Card>
}

export default UserList;