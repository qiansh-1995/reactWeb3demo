import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead,
    useAccount
} from 'wagmi'
import { useDebounce } from 'use-debounce'
import crowdsale from '../constant/Crowdsale.json'
import contractAddress from '../constant/address.json'
const testABI = crowdsale.abi;
const testAddress = contractAddress.value
export function AddToList() {
    const [to, setTo] = React.useState('')
    const [debouncedAddress] = useDebounce(to, 500)
    const { address } = useAccount()
    const { data:readData, isError :readError, isSuccess :readIsSuccess} = useContractRead({
        address: testAddress,
        abi: testABI,
        functionName: 'owner',
      })
      var isOwner =readData=== address? true: false;
      console.log(`who am i ${address}  isOwner ${isOwner} `)
      console.log(`readData : ${readData} \n readError ${readError}  \n isSuccess ${readIsSuccess} `)
    const { config } = usePrepareContractWrite({
        address: testAddress,
        abi: testABI,
        functionName: 'addWhitelist',
        args: [debouncedAddress],
    })
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    if(isOwner){
        return (
            <div>
            <h2>Whitelist Management</h2>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    write?.()
                }}
            >
                <label for="tokenId">Account Address：</label>
                <input
                    aria-label="Recipient"
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="0xA0Cf…251e"
                    value={to}
                />
                <button disabled={!write || isLoading}>
                    {isLoading ? 'Adding...' : 'add'}
                </button>
                {isSuccess && (
                    <div>
                        Successfully add address 
                    </div>
                )}
            </form>
            </div>
        )
    }

}
