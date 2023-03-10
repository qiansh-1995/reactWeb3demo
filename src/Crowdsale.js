import {
    useAccount,
    useConnect,
    useEnsAvatar,
    useEnsName,
    useBalance,
} from 'wagmi'
import { Contract } from '@wagmi/core/internal'
import './index.css';
import styled from 'styled-components';
import crowJson from './MyFirstLaunchPad.json'

export function Crowdsale() {
    const { address, connector, isConnected } = useAccount()

    // console.log('connector:'+JSON.stringify(connector))

    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { data: balanceData } = useBalance({ address, chainId: 97 })
    console.log(' balanceDate :' + JSON.stringify(balanceData))
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()

    const testABI = crowJson.abi;
    const contractInstance = Contract({
        address: '0x2d883f94C6BeADB514ABF27460B3AaF1D162a6Ec',
        abi: testABI,
    })
    console.log('contractInfo:' + JSON.stringify(contractInstance))
    const addWhitelist = async (addresss) => {
        return contractInstance.methods.addWhitelist(address).send()
    }
    const buyTokens = async (amount) => {
        return contractInstance.methods.buyTokens(amount).send()
    }
    const Claim = async (address) => {
        return contractInstance.methods.Claim(address).send()
    }
        if (isConnected) {
            return (
                <div>


                </div>
            )
        }
    

}