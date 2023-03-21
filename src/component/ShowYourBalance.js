import { useAccount, useContractRead } from 'wagmi';
import * as React from 'react'
import crowdsale from '../constant/Crowdsale.json'
import contractAddress from '../constant/address.json'
const testABI = crowdsale.abi;
const testAddress = contractAddress.value

export function ShowYourBalance() {
  const { address } = useAccount();

  const { data, refetch, isFetching } = useContractRead({
    address: testAddress,
    abi: testABI,
    functionName: 'inquireMyExpectBalance',
    args: [address]
  });
  console.log(`showbalance accountId: ${address}` );
   console.log(`show balance: ${data}  zzz ${refetch}  zzzzz${isFetching}`);
  const balance = data===undefined? null:JSON.parse(data) / Math.pow(10, 18);
  if (data) {
    return (
      <div>
        <h3>your expect balance: {balance} </h3>

      </div>
    )
  }

};

export default ShowYourBalance;
