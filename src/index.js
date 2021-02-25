import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore ,combineReducers } from 'redux'
import { Provider } from 'react-redux'

import reducer from './store/reducers/reducer'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'

/* Memisah-misah itu dilakuin kalo state kita ada banyak banget aja
const rootReducer = combineReducers({
  burger: burgerReducer
}) */
const rootReducer = reducer 

const store = createStore( rootReducer )

const app = (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<React.StrictMode>{ app }</React.StrictMode>, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
