import { useContext, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useBankContext } from './context/BankContext'

function App() {
  const { count, increment } = useBankContext()

  return (
    <div className="App">
        <h1>Bank</h1><br/>
        <p>Takes ETH as the currency.</p><br/>
        <input/>
    </div>
  )
}

export default App
