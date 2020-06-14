const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {message: action.message} 
    case 'SET_SUCCESS_MESSAGE':
      return {message: action.message, styleType: 'success'}
    case 'SET_ERROR_MESSAGE':
      return {message: action.message, styleType: 'error'}    
    case 'REMOVE': 
      return null
    default:
      return state
  }
}

let timerId = null

const removeMessage = time => {
  return dispatch => {
    clearTimeout(timerId)
    timerId = setTimeout(() => 
      dispatch(({
        type: 'REMOVE'
      })
    ), time*1000)
  }
}

const successMessage = message => ({
  type: 'SET_SUCCESS_MESSAGE',
  message
})

const errorMessage = message => ({
  type: 'SET_ERROR_MESSAGE',
  message
})

export const createMessage = (message, style, time = 5) => {
  return dispatch => {
    switch(style){
      case 'success':
        dispatch(successMessage(message))
        break
      case 'error':
        dispatch(errorMessage(message))
        break
      default:
        dispatch({
          type: 'SET_MESSAGE',
          message
        })
    }

    dispatch(removeMessage(time))    
  }
}

export default notificationReducer