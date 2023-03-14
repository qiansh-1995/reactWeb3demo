import {
    useAccount,
    useConnect,
    useBalance,
    useContractRead,
} from 'wagmi'
import {  Provider,useWeb3 } from '@wagmi/core';
import './index.css';

import crowJson from './MyFirstLaunchPad.json'
import lockJson from './Lock.json'

export function Crowdsale() {
    //const { account, library, active } = useWeb3();
      const testABI = lockJson.abi;
  const testAddress =contractAddress.address
    const { address } = useAccount();
    const contractInstance = useContractRead({
        address: '0x5064ea025f86640942ba15b983955c6bDD849156',
        abi: testABI,
        functionName: 'addWhitelist',
        args: [address || '0x'],
        enabled: !!address,
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