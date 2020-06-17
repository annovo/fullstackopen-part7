import React, { useEffect } from 'react'
import {
  Home,
  Header,
  UsersList,
  UserInfo,
  BlogInfo
} from './components'
import { Route, Switch } from 'react-router-dom'
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
 
  const mainPage = () => {
    if(currUser){
      return(
        <Switch>
        <Route path = '/users/:id'>
          <UserInfo />
        </Route>
        <Route path ='/users'>
          <UsersList/>
        </Route>
        <Route path ='/blogs/:id'>
          <BlogInfo/>
        </Route>
        <Route path ='/'>
          {
            currUser
            ? <Home />
            : null 
          }
        </Route>
      </Switch>
      )
    } else {
      return null
    }
  }
  
  return (
    <div className = 'container'>
      <Header />
      {mainPage()}
    </div>
  )
}

export default App
