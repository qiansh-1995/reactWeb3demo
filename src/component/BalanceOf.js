import { useAccount, useContractRead } from 'wagmi';

const BalanceOf = () => {
  const { address } = useAccount();

  const { data, refetch, isFetching } = useContractRead({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'balanceOf',
    args: [address || '0x'],
    enabled: !!address,
  });

  return (
    <div>
      <h3>Read contract</h3>
      Balance of your wagmi NFT : {data?.toString()}
      <button
        style={{ marginLeft: '8px' }}
        onClick={() => {
          refetch();
        }}
      >
        {isFetching ? 'Reading...' : 'Read'}
      </button>
    </div>
  );
};

export default BalanceOf;
