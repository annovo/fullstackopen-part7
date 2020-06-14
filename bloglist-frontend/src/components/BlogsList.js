import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, voteForBlog } from '../reducers/blogReducer'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.user ? state.user.username : state.user)
  const dispatch = useDispatch()

  const handleDelete = ({ title, author, id }) => {
    if(window.confirm(`Remove blog "${title}" by ${author} ?`)){
      dispatch(deleteBlog(id))
    }
  }
  const updateBlog = (id) => {
    dispatch(voteForBlog(id))
  }

  return (
    <div className = 'blogList'>
      {blogs.map(blog => {
        const removeBlog = blog.user && blog.user.username === username 
        ? () => handleDelete({...blog}) 
        : null
        return <Blog key={blog.id} blog={blog} removeBlog = {removeBlog} updateBlog = {() => updateBlog(blog.id)} />
      }
      )}
    </div>
  )
}

export default BlogsList
