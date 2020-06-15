import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ id }) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleOnCLick = () => {
    if(value && value !== ''){
      dispatch(addComment(id, value))
      setValue('')
    }
  }

  return(
    <div>
      <input 
        type = 'text'
        name = 'comment' 
        value ={ value } 
        onChange = {(e) => setValue(e.target.value)}
      />
      <button type ='button' onClick = {handleOnCLick}>add comment</button>
    </div>
  )
}

export default CommentForm