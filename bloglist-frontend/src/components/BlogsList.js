import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const blogStyle ={
    textDecoration: 'none'
  }

  return (
    <div>
      <Link style = {blogStyle} to = {`/blogs/${blog.id}`}>
        <ListGroup.Item variant = 'primary' action>
        {blog.title} by {blog.author}
        </ListGroup.Item>
        
      </Link>
    </div>
  )
}

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className = 'blogList'>
      <ListGroup>
        {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog}/>
        }
        )}
      </ListGroup>
      
    </div>
  )
}

export default BlogsList
