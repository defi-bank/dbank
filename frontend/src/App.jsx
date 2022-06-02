import { useContext, useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useBankContext } from './context/BankContext'

import { v4 as uuid } from 'uuid';

function App() {
  const {
    connectWallet,
    currentAccount,
    isLoading,
    formData,
    balance,
    handleChange,
    deposit,
    withdraw,
    loan
  } = useBankContext()

  useEffect(() => {
  }, [balance])


  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      key={uuid()}
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

  const handleLoan = (e) => {
    const { loanAmount } = formData;
    e.preventDefault();
    if (!loanAmount) return;
    loan();
  };

  return (
    <div className="App">
      <h1>Bank</h1><br />
      <p>Takes ETH as the currency.</p><br />
      <hr />
      <h2>Balance: {balance} ETH</h2><br />
      <hr />
      Deposit: <Input value={formData.depositAmount} type="text" name="depositAmount" handleChange={handleChange} />
      <button onClick={handleDeposit}>Deposit</button><br />
      <hr />
      Withdraw: <Input value={formData.withdrawAmount} type="text" name="withdrawAmount" handleChange={handleChange} />
      <button onClick={handleWithdraw}>Withdraw</button><br />
      <hr />

      {/* Loan */}
      {/* Loan: <Input value={formData.loanAmount} type="text" name="loanAmount" handleChange={handleChange} />
      <button onClick={handleLoan}>Loan</button><br />
      <hr /> */}

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
