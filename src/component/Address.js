
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount
} from 'wagmi'
import {useDebouncedEffect} from './useDebouncedEffect';
import lockJson from '../constant/Lock.json'
import contractAddress from '../constant/address.json'

export function Address() {
  const recoveredAddress = React.useRef()
  const { data, error, isLoading, signMessage } = usePrepareContractWrite({
      onSuccess(data, variables) {
          const address = verifyMessage(variables.message, data)
          recoveredAddress.current = address
      },
  })

  return (
      <form
          onSubmit={(event) => {
              event.preventDefault()
              const formData = new FormData(event.target)
              const message = formData.get('message')
              signMessage({ message })
          }}
      >
          <label htmlFor="message">Enter a message to sign</label>
          <textarea
              id="message"
              name="message"
              placeholder="The quick brown fox…"
          />
          <button disabled={isLoading}>
              {isLoading ? 'Check Wallet' : 'Sign Message'}
          </button>

          {data && (
              <div>
                  <div>Recovered Address: {recoveredAddress.current}</div>
                  <div>Signature: {data}</div>
              </div>
          )}

          {error && <div>{error.message}</div>}
      </form>
  )
}