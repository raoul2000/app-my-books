import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>My Books</h2>
        <p>
          <button type="button" onClick={() => setCount((cnt) => cnt + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
