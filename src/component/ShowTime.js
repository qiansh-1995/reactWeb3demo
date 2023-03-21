import { useAccount, useContractRead } from 'wagmi';
import * as React from 'react'
import crowdsale from '../constant/Crowdsale.json'
import contractAddress from '../constant/address.json'
const testABI = crowdsale.abi;
const testAddress = contractAddress.value

export function ShowTime () {
  const { address } = useAccount();
  const [time, setTime] = React.useState(0);
  const { data, refetch, isFetching } = useContractRead({
    address: testAddress,
    abi: testABI,
    functionName: 'getCurrentTimestamp',
  });
  console.log(`show time: ${data}`)
   // console.log(`show balance: ${data}  zzz ${refetch}  zzzzz${isFetching}`)
   const timestampRes = data===undefined? null:JSON.parse(data) ;

  if(data){
  return (
    <div>
              <h3>Timestamp:{timestampRes}</h3>
    </div>
  )}

};

export default ShowTime;
