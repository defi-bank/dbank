import { useContext, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useBankContext } from './context/BankContext'

function App() {
  const {
    connectWallet,
    currentAccount,
    isLoading,
    formData,
    handleChange,
    deposit,
    withdraw
  } = useBankContext()


  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={(e) => handleChange(e, name)}
    />
  );

  const handleDeposit = (e) => {
    const { depositAmount } = formData;
    e.preventDefault();
    if (!depositAmount) return;
    deposit();
  };

  const handleWithdraw = (e) => {
    const { withdrawAmount } = formData;
    e.preventDefault();
    if (!withdrawAmount) return;
    withdraw();
  };

  return (
    <div className="App">
      <h1>Bank</h1><br />
      <p>Takes ETH as the currency.</p><br />
      <hr />
      Deposit: <Input type="text" name="depositAmount" handleChange={handleChange} />
      <button onClick={handleDeposit}>Deposit</button><br />
      <hr />
      Withdraw: <Input type="text" name="withdrawAmount" handleChange={handleChange} />
      <button onClick={handleWithdraw}>Withdraw</button><br />
      <hr />

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
