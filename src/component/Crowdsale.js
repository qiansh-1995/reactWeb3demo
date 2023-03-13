import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,useAccount,
  useContractRead,
  useWaitForTransaction,
} from 'wagmi'
import lockJson from '../const/Lock.json'
import { getContract, getProvider } from '@wagmi/core'
export function Crowdsale() {
  const { address } = useAccount();
  const testABI = lockJson.abi;
  const contract = useContractRead({
    address: '0xf1dB491e9Ca39f43DbB628f7231B2505b0405471',
    abi:testABI,
    functionName:'withdraw',

  })
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0xf1dB491e9Ca39f43DbB628f7231B2505b0405471',
    abi:testABI,
    functionName: 'addWhitelist',
    args:address
  })
  const provider = getProvider()

  //console.log("function getcontrat"+JSON.stringify(contract))
  console.log("usePrepareContractWrite: "+JSON.stringify(config))
  const { data, error, isError, write } = useContractWrite(config)
  console.log("useContractWrite: "+JSON.stringify(data))
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? 'Writing...' : 'addWhitelist'}
      </button>
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
