import './App.css';
import { useState } from 'react'
import { ethers } from 'ethers'
import { Button, Input, MetaMaskButton, Text, Link, Field, Card, Flex, Heading, Box, Image } from 'rimble-ui';
import Token from './artifacts/contracts/Token.sol/DownloadCoin.json'
const tokenAddress = "0x7d3De90e1bF9189C929fA3D5344Ae79B9BDD7D40"

function App() {

  const [userAddress, setuserAddress] = useState()
  const [amount, setAmount] = useState()

  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    const account = accounts[0];
    console.log(account)
    setuserAddress(account)
  }

  async function requestAccount() {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", ethers.utils.formatEther(balance.toString()));
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAddress, ethers.utils.parseEther(amount).toString());
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAddress}`);
    }
  }

  return (
    <div className="App">
      <Flex>
        <Box p={ 3 } width={ 1 / 2 }>
          <Heading as={ "h1" }>Download Coin Faceut</Heading>
        </Box>
        <Box p={ 3 } width={ 1 / 2 }>
          <Button icon="Send" mr={ 3 } onClick={ getBalance }>
            Check Balance
          </Button>
          { typeof window.ethereum !== 'undefined' ? <MetaMaskButton onClick={ getAccount }>Connect with MetaMask</MetaMaskButton> : <Text> Please install MetaMask extension
                                                                                                                                       <Link href="https://metamask.io/" target="_blank" title="metamask download link"> here
                                                                                                                                       </Link>
                                                                                                                                     </Text> }
        </Box>
      </Flex>
      <br/>
      <Image alt="random unsplash image" borderRadius={ 8 } height="auto" src="data:image/jpeg;base64,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"
      />
      <br/>
      <br/>
      <Card width={ "auto" } maxWidth={ "420px" } mx={ "auto" } px={ [3, 3, 4] }>
        <Field label="Your Public Address">
          <Input type="text" required={ true } onChange={ e => setuserAddress(e.target.value) } />
        </Field>
        <Field Field label="Get Download Coin">
          <Input type="text" required={ true } onChange={ e => setAmount(e.target.value) } />
        </Field>
        <br />
        <Button icon="Send" mr={ 3 } onClick={ sendCoins }>
          Send
        </Button>
      </Card>
    </div>
    );
}

export default App;