import React from 'react'
import CommentForm from './CommentForm'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, voteForBlog } from '../reducers/blogReducer'
import { Button, ListGroup } from 'react-bootstrap'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const currUser = useSelector(state => state.user)
  const blog = blogs.find(b => b.id === id)

  let removeStyle = { display: 'none' }
  const padding = {paddingTop: 5}
  const opacity = {opacity: 0.5}

  if(!blog)
  {
    return null
  }

  if(blog.user && blog.user.username === currUser.username )
  {
    removeStyle = { display: '' }
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)){
      dispatch(deleteBlog(id))
      history.push('/')
    }
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
        <Button size = 'sm' variant ='light' type = 'button' className = 'like-button' onClick={updateBlog}>like</Button>
      </p>
      { blog.user && <p style = {opacity}>added by {blog.user.username}</p> } 
      <Button size = 'sm' variant = 'danger' className = 'delete-button' style = {removeStyle} onClick = {handleDelete}>remove</Button>
      <h3>Comments</h3>
      <CommentForm id = {blog.id} />
      <ListGroup style = {padding} variant = 'flush'>
        {
          ! blog.comments || blog.comments.length === 0
          ? <ListGroup.Item key = '0' disabled = 'true' >no comments yet</ListGroup.Item>
          : blog.comments.map((c, index) => <ListGroup.Item key = {index} variant = 'dark'>{c}</ListGroup.Item>)
        }
      </ListGroup>
    </div>
  )
}

export default BlogInfo