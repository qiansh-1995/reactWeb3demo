import {
    useAccount,
    useConnect,
    useEnsAvatar,
    useEnsName,
    useBalance,
    useContractRead,
} from 'wagmi'
import {  Provider,useWeb3 } from '@wagmi/core';
import './index.css';

import crowJson from './MyFirstLaunchPad.json'


export function Crowdsale() {
    //const { account, library, active } = useWeb3();
    const testABI = crowJson.abi;
    const contractInstance = useContractRead({
        address: '0x2d883f94C6BeADB514ABF27460B3AaF1D162a6Ec',
        abi: testABI,
    })

    console.log('contract:' + JSON.stringify(contractInstance))
    async function callMyContractFunction() {
        const result = await contractInstance.myFunction();
        console.log(result);

        console.log('contractInfo:' + JSON.stringify(contractInstance))

        // const addWhitelist = async (addresss) => {
        //     return contractInstance.methods.addWhitelist(address).send()
        // }
        // const buyTokens = async (amount) => {
        //     return contractInstance.methods.buyTokens(amount).send()
        // }
        // const Claim = async (address) => {
        //     return contractInstance.methods.Claim(address).send()
        // }

        return (
            <div>
                <button onClick={callMyContractFunction}>Call Function</button>

            </div>
        )

    }

}