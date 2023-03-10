import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance 
  } from 'wagmi'
  import { Contract } from '@wagmi/core/internal'
  import { Crowdsale } from './Crowdsale'
  export function Profile() {
    const { address, connector, isConnected } = useAccount()
    console.log('address:'+address)
   // console.log('connector:'+JSON.stringify(connector))
    console.log('isConnected:'+isConnected)
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const {data:balanceData} = useBalance({address,chainId:97})
    console.log(' balanceDate :'+ JSON.stringify(balanceData))
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected) {
      return (
        <div>
          <h3>address: {ensName ? `${ensName} (${address})` : address}</h3>
          <h3>balance: {balanceData?.formatted} {balanceData?.symbol}</h3>
           
          <button onClick={disconnect}>Disconnect</button>
          <Contract/>
      
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