import React from 'react'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Notification, Login, LoggedUser } from '../components'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <Notification />
      {
        user
        ? <LoggedUser name = {user.username} handleLogout = {handleLogout}/>
        : <Login />
      }   
    </div>
  )
}

export default Header