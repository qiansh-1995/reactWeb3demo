import { useState } from 'react'
import { useContractRead } from 'wagmi'

import lockJson from '../constant/Lock.json'
import contractAddress from '../constant/address.json'
const testABI = lockJson.abi;
const testAddress = contractAddress.value
const wagmigotchiContractConfig = {
  address: testAddress,
  abi: testABI,
}

export const ReadContract = () => {
  return (
    <div>
      <div>
        <GetAlive />
      </div>
      {false && (
        <div>
          <Love />
        </div>
      )}
    </div>
  )
}

const GetAlive = () => {
  const { data, isRefetching, isSuccess, refetch } = useContractRead({
    ...wagmigotchiContractConfig,
    functionName: 'addWhitelist',
    args:['0x56BA7eF2CCEE0feA9Ce2fC6545d7b351a51ed725']
  })

  return (
    <div>
      Is wagmigotchi alive?: {isSuccess && <span>{data ? 'yes' : 'no'}</span>}
      <button
        disabled={isRefetching}
        onClick={() => refetch()}
        style={{ marginLeft: 4 }}
      >
        {isRefetching ? 'loading...' : 'refetch'}
      </button>
    </div>
  )
}

const Love = () => {
  const [address, setAddress] = useState(
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  )
  const { data, isFetching, isRefetching, isSuccess } = useContractRead({
    ...wagmigotchiContractConfig,
    functionName: 'addWhitelist',
    args: [address],
    enabled: Boolean(address),
  })

  const [value, setValue] = useState('')

  return (
    <div>
      Get wagmigotchi love:
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        style={{ marginLeft: 4 }}
        value={value}
      />
      <button onClick={() => setAddress(value)}>
        {isFetching
          ? isRefetching
            ? 'refetching...'
            : 'fetching...'
          : 'fetch'}
      </button>
      {isSuccess && <div>{data?.toString()}</div>}
    </div>
  )
}
