import React, {useState} from 'react';
import AddUser from '../components/Users/AddUser';
import UserList from '../components/Users/UserList';
import classes from './Users.module.css';

function Users() {

  const [userListItems, setUserListItems] = useState([]);

  const saveUserItems = (username, userAge) => {
    setUserListItems((prevUserList) => {
      return[...prevUserList, {name: username, age: userAge, key: Math.random().toString}];
    });
  }

  return (
    <div>
      <AddUser updateUserList={saveUserItems}/>
      <UserList users={userListItems}/>
    </div>
  );
}

export default Users;
