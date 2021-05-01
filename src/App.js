import './App.css';
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { ethers } from 'ethers'
import Auction from './artifacts/contracts/Auction.sol/Auction.json'
import Token from './artifacts/contracts/Token.sol/Token.json'

import Display from './compoments/display'
const auctionAddress = "0x3bC4aC85Ec96226942Ddb001283c46424f23d05C"
const auctionAddress = ""

function App() {
  const [Data, setData] = useState({
    price: "",
    url: "",
    title: ""
  })
  const {register, handleSubmit} = useForm();
  const onSubmit = data => setDisplay(data);

  async function requestAccount() {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
  }

  async function fetchDisplay() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({
        provider
      })
      const contract = new ethers.Contract(auctionAddress, Auction.abi, provider)
      try {
        const data = await contract.getDisplay()
        console.log('data: ', data)
        setData(prevState => ({
          ...prevState,
          price: data._price.toString(),
          url: data._url,
          title: data._name
        }));
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function setDisplay(display) {
    if (!display) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({
        provider
      })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(auctionAddress, Auction.abi, signer)
      const transaction = await contract.newDisplay(display.price, display.url, display.name)
      await transaction.wait()
      fetchDisplay()
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ fetchDisplay }>Fetch Greeting</button>
        <Display data={ Data }></Display>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <input {...register( "price")} />
          <input {...register( "url", { required: true })} />
          <input {...register( "name")} />
          <input type="submit" />
        </form>
        <br />
      </header>
    </div>
    );
}

export default App;