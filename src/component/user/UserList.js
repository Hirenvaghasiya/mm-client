import React, { Component } from 'react'
import userapis from '../api/userapis';
import User from './User';
import { Link } from "react-router-dom";

class UserList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         users : [],
      }
    }

    getAllUsers(){
        userapis.getAllUsers()
            .then((response) => {
                this.setState({
                    users : response.data,
                });
            }).catch((error) => {
                this.setState({
                    errorMessage: "Error while retriving data",
                });
            });
    }

   componentDidMount(){
    this.getAllUsers();
   } 
  render() {
    const {users} = this.state;
    let userList;
    if(users.length > 0){
        userList = users.map((user) => (
            <User key={user.username}
            user={user} />
        ));
    }
    return (
        <div className="col-md-11">
        <Link to={"/item/add"}>
          <i className="bi-file-plus-fill fs-1"></i>
        </Link>
        <div>
          <h2>Users</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">name</th>
                <th scope="col">Email</th>
                <th scope="col" colSpan="2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{userList}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default UserList