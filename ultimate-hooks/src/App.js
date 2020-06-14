  
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/react'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => setValue('')

  return {
    input: {
      type,
      value,
      onChange
    },
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(() => {
    axios.get(baseUrl)
    .then(res => setResources(res.data))
  }, [baseUrl])

  const create = async (resource) => {
    const data = {...resource, id: Math.floor((Math.random()*1000))}
    await axios.post(baseUrl, data)
    setResources(resources.concat(data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    await noteService.create({ content: content.input.value })
    content.reset()
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    await personService.create({ name: name.input.value, number: number.input.value})
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br/>
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App