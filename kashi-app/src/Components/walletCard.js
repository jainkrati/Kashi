import React, { useState } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectwalletHandler = async () => {
    try {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } catch (error) {
      console.log(error);
    }
  };
  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const balance = await newAccount.getBalance();
    setUserBalance(ethers.utils.formatEther(balance));
    await getuserBalance(address);
  };
  const getuserBalance = async (address) => {
    const balance = await provider.getBalance(address, "latest");
  };
  return (
    <div className="WalletCard">
      <h3 className="h4">Welcome to a decentralized Application</h3>
      <button
        style={{ background: defaultAccount ? "#A5CC82" : "white" }}
        onClick={connectwalletHandler}
      >
        {defaultAccount ? "Connected!!" : "Connect"}
      </button>
      <div className="displayAccount">
        <h4 className="walletAddress">Address:{defaultAccount}</h4>
        <div className="balanceDisplay">
          <h3>Wallet Amount: {userBalance}</h3>
        </div>
      </div>
      {errorMessage}
    </div>
  );
};
export default WalletCard;
