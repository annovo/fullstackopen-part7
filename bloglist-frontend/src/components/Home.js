import React, { useState } from 'react'
import {  BlogForm, BlogsList } from '../components'
import { Collapse, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const Home = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  //const blogFormRef = React.createRef()

  const createNewBlog = (blog) => {
    dispatch(createBlog(blog))
    setOpen(!open)
    //blogFormRef.current.toggleVisible()
  }
  const margin = {marginBottom: 5}

  return (
    <div>
      {/* <Togglable buttonUp = {false} firstButtonLabel = 'new blog' secondButtonLabel = "cancel" ref = {blogFormRef}>
        <BlogForm createBlog = {createNewBlog} />
      </Togglable>      */}
      <Button 
        style = {margin}

        variant = 'info'
        onClick = {() => setOpen(!open)}
        aria-controls = 'collapse-form'
        aria-expanded = {open}
        block
      >
        {open ? 'Cancel' : 'Add Blog'}
      </Button>
      <Collapse in = {open}>
        <div id = 'collapse-form'>
          <BlogForm createBlog = {createNewBlog} />
        </div>
      </Collapse>
      <BlogsList />
    </div>
  )
}

export default Home