import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from 'use-debounce'
import crowdsale from '../constant/Crowdsale.json'
import contractAddress from '../constant/address.json'
import { parse } from '@ethersproject/transactions'
const testABI = crowdsale.abi;
const testAddress = contractAddress.value
export function Claim() {

    const [amount, setAmount] = React.useState('')

    const { config } = usePrepareContractWrite({
        address: testAddress,
        abi: testABI,
        functionName: 'Claim',
        overrides: {
            gasLimit: 290000,
          },

    })
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div>
            <h2> Claim</h2>

        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            <label for="tokenId">Generate token</label>
            <button disabled={!write || isLoading}>
                {isLoading ? 'Pending...' : 'Confirm'}
            </button>
            {isSuccess && (
                <div>
                    Successfully Generate token
                </div>
            )}
        </form>
        </div>
    )
}
