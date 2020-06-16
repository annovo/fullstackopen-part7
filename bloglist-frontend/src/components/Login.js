import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }
  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser({username, password}))
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>Login to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            username
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="username"
            onChange={usernameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="password"
            onChange={passwordChange}
          />
        </Form.Group>
        <Button id = 'login-button' type="submit">login</Button>
      </Form>
    </div>
  )
}
export default Login
