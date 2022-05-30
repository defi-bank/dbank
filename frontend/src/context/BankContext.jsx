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

    //   REFACTOR to DEPOSIT AND WITHDRAW
    const sendBank = async () => {
        try {
            if (ethereum) {
                const { addressTo, amount, keyword, message } = formData;
                const BankContract = createEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);

                await ethereum.request({
                    method: "eth_sendBank",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                });

                const BankHash = await BankContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

                setIsLoading(true);
                console.log(`Loading - ${BankHash.hash}`);
                await BankHash.wait();
                console.log(`Success - ${BankHash.hash}`);
                setIsLoading(false);

                const BanksCount = await BankContract.getBankCount();

                setBankCount(BanksCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

    return (
        <BankContext.Provider
            value={{
                connectWallet,
                currentAccount,
                isLoading,
                handleChange
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
