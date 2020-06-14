import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const id = useParams().id
  const usersArr = useSelector(state => state.usersList)

  if(!usersArr){
    return null
  }

  const userInfo = usersArr.find(u => u.id === id)

  return(
    <div>
      <h3>added blogs</h3>
      <ul>
        {userInfo.blogs.map(blog => <li key = {blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserInfo