import loginService from '../services/login'
import blogService from '../services/blogs'
import { createMessage } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      window.localStorage.removeItem('loggedBlogListAppUser')
      return null
    default:
      return state
  }
}

export const loginUser = (newUser) => {
  return async dispatch => {
    try {
      const user = await loginService.login(newUser)

      dispatch({type: 'LOGIN', data: user})
      dispatch(createMessage(`${user.username} just logged in`, 'success'))

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      )
    } catch (error) {
      dispatch(createMessage('wrong username or password', 'error'))
    }
  }
}

export const logoutUser = () => ({type: 'LOGOUT'})

export const initilizeUser = () => {
  return dispatch => {
    const userJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  } 
}
export default userReducer