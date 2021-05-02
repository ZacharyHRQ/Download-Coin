import { Image , Text } from 'rimble-ui';
import { useState } from 'react'
import { ethers } from 'ethers';
import { useForm } from "react-hook-form";
import Auction from './artifacts/contracts/Auction.sol/Auction.json'
const auctionAddress = "0x2594e3FC6bd41C11c9E3DD746197cdc154eCD703"


function Display(data) {

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
    
    return (
        <>
            <Image
            alt="random unsplash image"
            borderRadius={8}
            height="auto"
            src="https://source.unsplash.com/random/1280x720"
            />
            <Text>{data.data.price}</Text>
            <Text>{data.data.title}</Text>

            <form onSubmit={ handleSubmit(onSubmit) }>
                <input {...register( "price")} />
                <input {...register( "url", { required: true })} />
                <input {...register( "name")} />
                <input type="submit" />

            </form>
        </>
    )

}

export default Display;