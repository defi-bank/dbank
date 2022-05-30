import React, { createContext, useContext, useState, useEffect } from "react"

const BankContext = createContext(null)

export const BankContextProvider = ({ children }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(42)
  }, [])

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <BankContext.Provider value={{ count, increment }}>
      {children}
    </BankContext.Provider>
  )
}

export const useBankContext = () => {
  const context = useContext(BankContext)

  if (!context)
    throw new Error("BankContext must be called from within the BankContextProvider")

  return context
}
