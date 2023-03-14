



import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers'
import { useDebouncedEffect } from "./useDebouncedEffect";
import lockJson from '../const/Lock.json'
import contractAddress from '../const/address.json'
import web3 from 'web3'
export function Address() {
  const [tokenId, setTokenId] = React.useState('')
  const debouncedTokenId = useDebouncedEffect(() => console.log(tokenId), [tokenId], 1000)
  const testABI = lockJson.abi;
  const testAddress = contractAddress.address;

  //ethers test
 
  const [provider, setProvider] = useState()
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState('0')
  const [blockNumber, setBlockNumber] = useState('0')
  const [gasPrice, setGasPrice] = useState('0')
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [connected, setConnected] = useState(false)
  // useEffect(() => {
  //   // check if ethereum is provided by something like Metamask
  //   if (typeof window.ethereum !== 'undefined') {
  //     console.log('ethereum is available')

  //     // get provider injected by metamask
  //     const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  //     const signer = provider.getSigner();

  //   }
  // }, [])
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  const accountHandler = async (account) => {
    setAccount(account)
    const balance = await provider.getBalance(account)
    // notice that we use format ether here, uncomment the following console.log and see what happens if we don't
    setBalance(ethers.utils.formatEther(balance))
  }
  const connectHandler = async () => {
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const accountList = await provider.listAccounts()
    console.log(accountList)
    accountHandler(accountList[0])
    setConnected(true)
  }

  // handles submit button
  const handleSubmit = async (e) => {
    // stops page from refreshing
    e.preventDefault()

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      testAddress,
      testABI,
      provider
    )

    // a signer is necessary when your want to write to the blockchain
    // your wallet doesn't need to sign or spend any ether to read from the blockchain
    // but it does need to spend ether and therefore sign to write to the blockchain
    const signer = provider.getSigner()
    const contractWithSigner = contract.connect(signer)
    // we can use 'set' here because the abi provides us with a reference to the methods defined in our smart contract
    console.log(await contractWithSigner.set(inputValue))
    console.log(inputValue)
  }

  const handleRetrieveData = async () => {
    const simpleStorageContract = new ethers.Contract(
      testAddress,
      testABI,
      provider
    )
    console.log("simpleStorageContract::"+JSON.stringify(simpleStorageContract))
    // we can use 'get' here because the abi provides us with a reference to the methods defined in our smart contract
    setValue(ethers.utils.formatUnits(await simpleStorageContract.get(), 0))
  }
  // const {
  //   config,
  //   error: prepareError,
  //   isError: isPrepareError,
  // } = usePrepareContractWrite({
  //   address: testAddress,
  //   abi:testABI,
  //   functionName:'addWhitelist',
  //   args: [parseInt(debouncedTokenId)],
  // })
  // const { data, error, isError, write } = useContractWrite(config)

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  //   })

  return (
    //ethers test
    <div className='layout'>
      <header className='navbar'>
        <div className='container'>
          <div className='logo'>Simple Storage</div>
          {connected ? (
            <div>
              <label>
                {`${Number.parseFloat(balance).toPrecision(4)} ETH`}
              </label>
              <button className='account-button' onClick={connectHandler}>
                {account.substring(0, 6)}...
                {account.substring(account.length - 4)}
              </button>
            </div>
          ) : (
            <button className='connect-button' onClick={connectHandler}>
              Connect
            </button>
          )}
        </div>
      </header>
      <section className='cards'>
        <div className='card'>
          <h2>Set Value</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              name='value'
              placeholder='0'
            />
            <button>Submit</button>
          </form>
        </div>
        <div className='card'>
          <h2>Get Value</h2>
          <button onClick={handleRetrieveData}>Retrieve</button>
          <label>{value}</label>
        </div>
      </section>
      <footer>
        <div className='container'>
          {gasPrice} gwei &bull; {blockNumber}
        </div>
      </footer>
    </div>
  )

//-----------------------------------------------------------------------------------------
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault()
    //     write?.()
    //   }}
    // >
    //   <label for="tokenId">Token ID</label>
    //   <input
    //     id="tokenId"
    //     onChange={(e) => setTokenId(e.target.value)}
    //     value={tokenId}
    //   />
    //   <button disabled={!write || isLoading}>
    //     {isLoading ? 'Pending...' : 'add'}
    //   </button>
    //   {isSuccess && (
    //     <div>
    //       Successfully add to whitelist!
    //       <div>
    //         <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
    //       </div>
    //     </div>
    //   )}
    //   {(isPrepareError || isError) && (
    //     <div>Error: {(prepareError || error)?.message}</div>
    //   )}
    // </form>
  //)
}
