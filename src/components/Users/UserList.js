import React, { Fragment, useContext } from "react";
import classes from './UserList.module.css';
import Card from "../UI/Card";
import AuthContext from "../../context/auth-context";


const UserList = (props) => {

    const ctx = useContext(AuthContext);

    return <Fragment>
        {ctx.isLoggedIn && (
            <Card className={classes.users}>
                {props.users.length >0 &&  <ul>
                    {props.users.map((user)=> (
                        <li key={user.key}>
                            {user.name} ({user.age} years old)
                        </li>
                    ))}
                </ul>
                }
            </Card>
        )}
    </Fragment>
}

export default UserList;