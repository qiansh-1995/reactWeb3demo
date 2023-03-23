import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance
} from 'wagmi'

import { AddToList } from './AddToList'
import { CrowdSale } from './CrowdSale'
import { ShowTime } from './ShowTime'
import { Claim } from './Claim'
import { ShowYourBalance } from './ShowYourBalance'

export function Profile() {
  const { address, connector, isConnected } = useAccount()
  console.log('address:' + address)
  //const { data: ensName } = useEnsName({ address })
  const { data: balanceData } = useBalance({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <h3>address: {address} </h3>
        <h3>balance: {balanceData?.formatted} {balanceData?.symbol}</h3>

        <button onClick={disconnect}>Disconnect</button>

        <AddToList />

        <CrowdSale />
        <Claim/>
        <ShowYourBalance/>
        <ShowTime/>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}