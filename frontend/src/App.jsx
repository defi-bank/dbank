import { useContext, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useBankContext } from './context/BankContext'

function App() {
  const { count, increment } = useBankContext()

  return (
    <div className="App">
        <p>
          <button type="button" onClick={increment}>
            count is: {count}
          </button>
        </p>
    </div>
  )
}

export default App
