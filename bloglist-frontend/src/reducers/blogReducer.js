import services from '../services/blogs'
import { createMessage } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      const id = action.data.id
      const newBlogList = state.filter(blog => blog.id !== id)
      return newBlogList
    case 'VOTE':
      const updatedBlog = action.data
      return state
        .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        .sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export const initilizeBlogs = () => {
  return async dispatch => {
    const blogs = await services.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.sort((a, b) => b.likes - a.likes)
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const returnedBlog = await services.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: returnedBlog
      })
          
    dispatch(createMessage(
      `"${blog.title}" by ${blog.author} is added to list`, 
      'success'
      ))

    } catch(e) {
      dispatch(createMessage('Title and url required', 'error'))
    }
    
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try{
      await services.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: { id }
      })
     
      dispatch(createMessage('Blog deleted', 'success'))
    } catch (error) {
      dispatch(createMessage('already deleted', 'error'))
    }
  }
}

export const voteForBlog = (id) => {
  return async dispatch => {
      const blogFromDB = await services.getById(id)

    const updatedBlog = {...blogFromDB, likes: blogFromDB.likes + 1}
    const returnedBlog = await services.update(id, updatedBlog)
    dispatch({ type: 'VOTE', data: returnedBlog })
  }
}
export default blogReducer