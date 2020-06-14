import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ name, id, blogsNumber }) => (
  <tr>
    <th>
      <Link to={`/users/${id}`}>{name}</Link>
    </th>
    <td>
      {blogsNumber}
    </td>
  </tr>
)

const UsersList = () => {
  const usersArr = useSelector(state => state.usersList)

  if(!usersArr) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersArr.map(user => {
            return <User key = {user.id} id = {user.id} name = {user.name} blogsNumber ={user.blogs.length} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList