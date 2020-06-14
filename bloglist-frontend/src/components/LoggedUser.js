import React from 'react'

const LoggedUser = ({ name, handleLogout}) => (
  <div>
    <h2>Blogs</h2>
    {name} is logged in {' '} 
    <button id = 'logout-button' onClick = {handleLogout}>logout</button>
  </div>
)

export default LoggedUser