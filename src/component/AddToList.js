import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from 'use-debounce'
import myToken from '../constant/MyToken.json'
import contractAddress from '../constant/address.json'
const testABI = myToken.abi;
const testAddress = contractAddress.value2
export function AddToList() {
    const [to, setTo] = React.useState('')
    const [debouncedAddress] = useDebounce(to, 500)



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

    return (
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
                    Successfully minted your NFT!
                </div>
            )}
        </form>
    )
}
