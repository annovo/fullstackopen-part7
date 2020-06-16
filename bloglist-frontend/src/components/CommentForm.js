import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

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
      <InputGroup>
        <FormControl  
          type = 'text'
          name = 'comment' 
          value ={ value } 
          onChange = {(e) => setValue(e.target.value)}
        />
        <InputGroup.Append>
          <Button onClick = {handleOnCLick}>add comment</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export default CommentForm