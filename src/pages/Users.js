import React, {useState} from 'react';
import AddUser from '../components/Users/AddUser';
import UserList from '../components/Users/UserList';
import MainHeader from '../components/MainHeader/MainHeader';

function Users() {

  const [userListItems, setUserListItems] = useState([]);

  const saveUserItems = (username, userAge) => {
    setUserListItems((prevUserList) => {
      return[...prevUserList, {name: username, age: userAge, key: Math.random().toString}];
    });
  }

  return (
    <React.Fragment>
      <MainHeader/>
      <AddUser updateUserList={saveUserItems}/>
      <UserList users={userListItems}/>
    </React.Fragment>
  );
}

export default Users;
