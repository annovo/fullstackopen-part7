import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, voteForBlog } from '../reducers/blogReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const currUser = useSelector(state => state.user)
  const blog = blogs.find(b => b.id === id)
  let removeStyle = { display: 'none' }

  if(blog.user && blog.user.username === currUser.username )
  {
    removeStyle = { display: '' }
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)){
      dispatch(deleteBlog(id))
    }
    history.push('/')
  }

  const updateBlog = () => {
    dispatch(voteForBlog(id))
  }

  
 
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href = {blog.url}>{blog.url}</a>
      <p className = 'like-container'>
        {blog.likes} likes
        <button type = 'button' className = 'like-button' onClick={updateBlog}>like</button>
      </p>
      { blog.user && <p>added by {blog.user.username}</p> } 
      <button className = 'delete-button' style = {removeStyle} onClick = {handleDelete}>remove</button>
    </div>
  )
}

export default BlogInfo