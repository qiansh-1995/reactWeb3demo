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
export function MintNFTForm() {
    const [to, setTo] = React.useState('')
    const [debouncedTo] = useDebounce(to, 500)

    const [amount, setAmount] = React.useState('')
    const [debouncedAmount] = useDebounce(amount, 500)

    const { config } = usePrepareContractWrite({
        address: testAddress,
        abi: testABI,
        functionName: 'transfer',
        args: [debouncedTo,parseInt(debouncedAmount)],
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
            <label for="tokenId">Token ID</label>
            <input
                aria-label="Recipient"
                onChange={(e) => setTo(e.target.value)}
                placeholder="0xA0Cf…251e"
                value={to}
            />
            <input
                aria-label="Amount (ether)"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05"
                value={amount}
            />
            <button disabled={!write || isLoading}>
                {isLoading ? 'Minting...' : 'Mint'}
            </button>
            {isSuccess && (
                <div>
                    Successfully minted your NFT!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </form>
    )
}
