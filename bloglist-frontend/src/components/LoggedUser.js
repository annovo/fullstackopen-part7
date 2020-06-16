import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, Navbar } from 'react-bootstrap'

const LoggedUser = ({ name, handleLogout}) => {
  
  
  const styledDiv = {
    //background: 'none'
  }

  const styledLink = {
    padding: 5,
    textDecoration: 'none',
    color: 'white'
  }

  return(
    <>  
    <Navbar bg = 'dark' variaant = 'dark'>
        <Nav variant = 'pills' defaultActiveKey='link-1' fill>
        <Nav.Item>
          <Nav.Link style = {styledDiv} eventKey = 'link-1' as = 'span'>
            <Link style = {styledLink} to ='/'>blogs</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" style = {styledDiv} as = 'span'>
            <Link style = {styledLink} to ='/users'>users</Link>
          </Nav.Link>
        </Nav.Item>

      </Nav>
      <div style = {{position: 'absolute', right: 5, color: 'lightgray'}}>
        {name} is logged in {' '} 
        <Button variant = 'secondary' size ='sm' id = 'logout-button' onClick = {handleLogout}>logout</Button>
      </div>
      </Navbar>
      <h2 className = 'text-center'>Blog App</h2>
    </>
  )
}

export default LoggedUser