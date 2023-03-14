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
export function CheckOwner() {
  const [ message, setMessage ] = React.useState( '' );
  const latestMessage = React.useRef( '' );
  React.useEffect( () => {
    latestMessage.current = message;
  } );


  const { address } = useAccount();
    const testABI = lockJson.abi;
  const testAddress =contractAddress.address
  const contract = useContractRead({
    address: testAddress ,
    abi:testABI,
    functionName:'checkInWhitelist',
    args:[address]
  })

  //const provider = getProvider()

  console.log("function getcontrat11:"+JSON.stringify(contract))
//  console.log("usePrepareContractWrite: "+JSON.stringify(config))
  const { data, error, isError, write } = useContractWrite(contract)
  console.log("useContractWrite: "+JSON.stringify(data))


  return (
    <div>
          <>
          <h2>checkAddr:{data}</h2>

    </>
  
      
    </div>
  )
}
