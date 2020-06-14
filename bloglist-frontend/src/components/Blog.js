import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle ={
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 5,
    marginBottom: 5
  }

  const removeStyle = { display: removeBlog ? '' : 'none' }
 
  const blogSpec = () => (
    <div>
      <p>url: {blog.url}</p>
      <p className = 'like-container'>
        likes: {blog.likes}
        <button type = 'button' className = 'like-button' onClick={updateBlog}>like</button>
      </p>
      { blog.user && <p>user: {blog.user.username}</p> } 
      <button className = 'delete-button' style = {removeStyle} onClick = {removeBlog}>remove</button>
    </div>
  )

  return (
    <div style = {blogStyle}>
      &quot;{blog.title}&quot; - {blog.author}
      <Togglable buttonUp = {true} firstButtonLabel="view" secondButtonLabel="hide">
        {blogSpec()}
      </Togglable>
    </div>
  )
}
export default Blog
