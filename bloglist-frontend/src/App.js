import React, { useEffect } from 'react'
import {
  Home,
  Header,
  UsersList,
  UserInfo
} from './components'
import { Route, Link, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initilizeBlogs } from './reducers/blogReducer'
import { initilizeUser } from './reducers/userReducer'
import  { initilizeUsersList } from './reducers/usersListReducer'

const App = () => {
  const dispatch = useDispatch()
  const currUser = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initilizeUsersList())
  }, [dispatch])

  useEffect(() => {
    dispatch(initilizeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [dispatch])
 

  return (
    <div>
      <Header />
      <Switch>
        <Route path = '/users/:id'>
          <UserInfo />
        </Route>
        <Route path ='/users'>
          <UsersList/>
        </Route>
        <Route path ='/'>
          {
            currUser
            ? <Home />
            : null 
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App
