import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,useAccount,
  useContractRead,
  useWaitForTransaction,
} from 'wagmi'
import lockJson from '../const/Lock.json'
import contractAddress from '../const/address.json'
import { getContract, getProvider } from '@wagmi/core'
export function PaymentBNB() {
  const [ message, setMessage ] = React.useState( '' );
  const latestMessage = React.useRef( '' );
  React.useEffect( () => {
    latestMessage.current = message;
  } );

  const showMessage = () => {
    console.log( 'message: ' + message ); //获取的永远是上一次send之前的值 点击前输入框的值
    console.log( 'You input latest value: ' + latestMessage.current ); //最新值
  };

  const handleSendClick = () => {
    setTimeout( showMessage, 1000 );
    
  };

  const setAmountValue = ( e ) => {
    setMessage( e.target.value );
  };
  //const preAddress=setAmountValue(setMessage);
  console.log( 'setmessage1: ' + message);
  console.log( 'setmessage2: ' + latestMessage.current);
  const { address } = useAccount();
    const testABI = lockJson.abi;
  const testAddress =contractAddress.address
  // const contract = useContractRead({
  //   address: '0xf1dB491e9Ca39f43DbB628f7231B2505b0405471',
  //   abi:testABI,
  //   functionName:'withdraw',

  // })
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: testAddress ,
    abi:testABI,
    functionName: 'buyTokens',
    
  })
  //args:[latestMessage.current]
  //const provider = getProvider()

  //console.log("function getcontrat"+JSON.stringify(contract))
//  console.log("usePrepareContractWrite: "+JSON.stringify(config))
  const { data, error, isError, write } = useContractWrite(config)
  console.log("useContractWrite: "+JSON.stringify(data))
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div>
      <h2>INPUT TBNB AMOUUNT:</h2>
          <>
      <input value={ message } onChange={ setAmountValue }/>
      <button onClick={ handleSendClick }>Payments</button>
    </>
    {isLoading && <div>Check Wallet</div>}
      {isSuccess && (
        <div>
          Successfully add address to whitelist!
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
}
