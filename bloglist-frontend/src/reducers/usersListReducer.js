import service from '../services/users'

const usersListReducer = (state = null, action) => {
  switch(action.type){
    case 'INIT_USERS_LIST':
      return action.data
    default:
      return state
  }
}

export const initilizeUsersList = () => {
  return async dispatch => {
    const usersArr = await service.getAll()
    dispatch({ type: 'INIT_USERS_LIST', data: usersArr})
  }
}

export default usersListReducer