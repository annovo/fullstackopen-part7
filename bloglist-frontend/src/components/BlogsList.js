import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const blogStyle ={
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 5,
    marginBottom: 5
  }

  return (
    <div style = {blogStyle}>
      <Link to = {`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
    </div>
  )
}

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className = 'blogList'>
      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} />
      }
      )}
    </div>
  )
}

export default BlogsList
