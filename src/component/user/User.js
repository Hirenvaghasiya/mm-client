import React, { Component } from 'react'

class User extends Component {
  render() {
    const {user} = this.props;
    return (
      <tr>
        <th scope='row'>{user.username}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    )
  }
}

export default User