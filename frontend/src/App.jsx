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
      <h1>_DBank_</h1>
      <div className="typewriter">
        <i>opes et potentiam</i>
      </div>
      <h2>Bank Total Balance: <span className="balance">{balance} ETH</span></h2><br />

      <div className="container">
        <div className="row">
          <span class="option">Deposit</span>
          <Input className="input" value={formData.depositAmount} type="text" name="depositAmount" handleChange={handleChange} />
          <button className="" onClick={handleDeposit}>
            ⇢
          </button>
        </div>
        <div className="row">
          <span class="option">Withdraw</span>
          <Input className="input" value={formData.withdrawAmount} type="text" name="withdrawAmount" handleChange={handleChange} />
          <button className="" onClick={handleWithdraw}>
            ⇢
          </button>
        </div>

        {/* Loan */}
        <div className="row">
          <span class="option">Loan</span>
          <Input className="input" value={formData.loanAmount} type="text" name="loanAmount" handleChange={handleChange} />
          <button className="" onClick={handleLoan}>
            ⇢
          </button>
        </div>
      </div>
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
