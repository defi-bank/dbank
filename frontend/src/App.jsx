import { useContext, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useBankContext } from './context/BankContext'

function App() {
  const {
    connectWallet,
    currentAccount,
    isLoading,
    handleChange
  } = useBankContext()

  return (
    <div className="App">
      <h1>Bank</h1><br />
      <p>Takes ETH as the currency.</p><br />
      <input />
      {!currentAccount && (
        <button
          type="button"
          onClick={connectWallet}
          className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default App
