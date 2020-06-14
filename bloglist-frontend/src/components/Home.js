import React from 'react'
import { Togglable, BlogForm, BlogsList } from '../components'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const Home = () => {
  const dispatch = useDispatch()
  
  const blogFormRef = React.createRef()

  const createNewBlog = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisible()
  }

  return (
    <div>
      <Togglable buttonUp = {false} firstButtonLabel = 'new blog' secondButtonLabel = "cancel" ref = {blogFormRef}>
        <BlogForm createBlog = {createNewBlog} />
      </Togglable>     
      <BlogsList />
    </div>
  )
}

export default Home