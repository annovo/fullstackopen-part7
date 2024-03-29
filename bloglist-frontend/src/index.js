import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider }from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import './custom.scss'

ReactDOM.render(
<Provider store ={store}>
  <Router>
    <App />
  </Router>
</Provider>, 
document.getElementById('root'))