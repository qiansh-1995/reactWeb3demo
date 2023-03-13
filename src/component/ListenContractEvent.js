import { useState } from 'react';
import { useContractEvent } from 'wagmi';

const ListenContractEvent = () => {
  const [eventData, setEventData] = useState(0)

  useContractEvent({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
    ],
    eventName: 'Transfer',
    listener: (from, to, tokenId) => {
      setEventData({
        from,
        to,
        tokenId: tokenId.toString(),
      });
    },
  });

  return (
    <div>
      <h3>Current Mint Event</h3>
      <ul>
        <li>From: {eventData?.from}</li>
        <li>To: {eventData?.to}</li>
        <li>Token ID: {eventData?.tokenId}</li>
      </ul>
    </div>
  );
};

export default ListenContractEvent;

