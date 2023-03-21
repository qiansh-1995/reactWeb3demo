import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from 'use-debounce'
import crowdsale from '../constant/Crowdsale.json'
import contractAddress from '../constant/address.json'
import { utils } from 'ethers'
import { parse } from '@ethersproject/transactions'
const testABI = crowdsale.abi;
const testAddress = contractAddress.value
export function CrowdSale() {

    const [amount, setAmount] = React.useState('')
    const [debouncedAmount] = useDebounce(amount, 500)
    //const realAmount= debouncedAmount*Math.pow(10,18);
    
    console.log(`debouncedAmount: ${debouncedAmount}`)

    const { config } = usePrepareContractWrite({
        address: testAddress,
        abi: testABI,
        functionName: 'crowdSale',
        overrides: {
            value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
            gasLimit: 290000,
          },
    })
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div>
            <h2> CrowdSale</h2>

        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            <label for="tokenId">amount number:</label>
            <input
                aria-label="Amount (BNB)"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.01"
                value={amount}
            />
            <button disabled={!write || isLoading}>
                {isLoading ? 'Pending...' : 'Confirm'}
            </button>
            {isSuccess && (
                <div>
                    Successfully CrowdSale
                </div>
            )}
        </form>
        </div>
    )
}
