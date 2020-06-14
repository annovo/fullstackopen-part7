import React from 'react'
import { Link } from 'react-router-dom'

const LoggedUser = ({ name, handleLogout}) => {
  
  const styledDiv = {
    background: 'lightgray'
  }

  const styledLink = {
    padding: 5
  }

  return(  
    <div>
      <div style ={styledDiv}>
        <Link style = {styledLink} to ='/'>blogs</Link>
        <Link style = {styledLink} to ='/users'>users</Link>
        {name} is logged in {' '} 
        <button id = 'logout-button' onClick = {handleLogout}>logout</button>
      </div>
      <h2>Blogs</h2>
    </div>
  )
}

export default LoggedUser