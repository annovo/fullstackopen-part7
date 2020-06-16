import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const buttonStyle = {marginBottom: 5, float: 'right'}
  const zeroMargin = {marginBottom: 0}
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <h2>Create New</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Title </Form.Label> 
          <Form.Control size = 'sm' id = 'title' value={title} onChange={handleTitleChange} />
          <Form.Text className = 'text-muted text-right' style = {zeroMargin}>
            *this field is required
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> Author </Form.Label>
           <Form.Control size = 'sm' id = 'author' value={author} onChange={handleAuthorChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control size = 'sm' id = 'url' value={url} onChange={handleUrlChange} />
          <Form.Text className = 'text-muted text-right' style = {zeroMargin}>
            *this field is required
          </Form.Text>
        </Form.Group>
        <div style = {{overflow: 'hidden'}}>
        <Button size = 'sm' type="submit" style = {buttonStyle}>create</Button>  
        </div>
        
      </Form>
    </>
  )
}
export default BlogForm
