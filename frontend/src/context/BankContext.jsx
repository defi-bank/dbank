import React, { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

const BankContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const BankContract = new ethers.Contract(contractAddress, contractABI, signer);

    return BankContract;
};

export const BankContextProvider = ({ children }) => {
    const [formData, setformData] = useState({ depositAmount: "", withdrawAmount: "" });
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };


    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    const deposit = async () => {
        try {
            if (ethereum) {
                const { depositAmount } = formData;

                // load the ABI from local file
                // defined above
                const BankContract = createEthereumContract();
                let parsedAmount = ethers.utils.parseEther(depositAmount)

                var BankHash = await BankContract.deposit({ value: parsedAmount })

                setIsLoading(true);
                console.log(`Loading - ${BankHash.hash}`);
                await BankHash.wait();
                console.log(`Success - ${BankHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const withdraw = async () => {
        try {
            if (ethereum) {
                const { withdrawAmount } = formData;

                // load the ABI from local file
                // defined above
                const bankContract = createEthereumContract();
                let parsedAmount = ethers.utils.parseEther(withdrawAmount)

                var BankHash = await bankContract.withdraw(parsedAmount)


                setIsLoading(true);
                console.log(`Loading - ${BankHash.hash}`);
                await BankHash.wait();
                console.log(`Success - ${BankHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }

    }

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

    return (
        <BankContext.Provider
            value={{
                connectWallet,
                currentAccount,
                isLoading,
                formData,
                handleChange,
                deposit,
                withdraw
            }}
        >
            {children}
        </BankContext.Provider>
    );
};


export const useBankContext = () => {
    const context = useContext(BankContext)

    if (!context)
        throw new Error("BankContext must be called from within the BankContextProvider")

    return context
}
