import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const UserInfo = () => {
  const id = useParams().id
  const usersArr = useSelector(state => state.usersList)

  if(!usersArr){
    return null
  }

  const userInfo = usersArr.find(u => u.id === id)

  return(
    <div>
      <h3>Added blogs:</h3>
      <ListGroup variant = 'flush'>
        {userInfo.blogs.map(blog => <ListGroup.Item key = {blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default UserInfo