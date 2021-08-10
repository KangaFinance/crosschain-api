import React, { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { compileFunction } from 'vm';

var client;

const App = () => {
  const [metamaskAddress, setMetamaskAddress] = useState()

  useEffect(() => {
    detectEthereumProvider().then((provider) => {
      try {
        // @ts-ignore
        if (provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?')
        }

        if (!provider) {
          alert('Metamask not found')
        }

        provider.on('accountsChanged', (accounts) =>
            setMetamaskAddress(accounts[0])
        )

        provider.on('disconnect', () => {
            setMetamaskAddress('')
        })

        provider
            .request({ method: 'eth_requestAccounts' })
            .then(async (accounts) => {
                setMetamaskAddress(accounts[0]);
                client = provider;
            })
      } catch (e) {
        console.error(e)
      }
    })
  }, [])

  const setProvider = async () =>  {
    // POST request using fetch inside useEffect React hook
    console.log(client);
    console.log(Object.keys(client).length)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': 'http://localhost:3001', 'Access-Control-Allow-Credentials': 'true' },
        // 1. The main idea as here some how collect the web3 object with the Metamask information
        body: client
    };
    fetch('http://localhost:3000/lp/addLiquidity', requestOptions)
        .then(response => response.json())
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

  const sendTokens = async () =>  {
    // POST request using fetch inside useEffect React hook
    console.log(client);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3001', 'Access-Control-Allow-Credentials': 'true' },
        body: JSON.stringify({
          "oneAddress": "one1zs2mzq923x5f7r3xayhnv8jhzyn6020xtd493h",
          "ethAddress": "0x9E1AD78422Fd571B26D93EeB895f631A67Cd5462",
      })  
    };
    fetch('http://localhost:3000/lp/addLiquidity', requestOptions)
        .then(response => response.json())
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

  return (
      <div
          style={{
            background: '#dedede',
            width: '100vw',
            height: '100vh',
            padding: '100px 0'
          }}
      >
        <div
            style={{
              maxWidth: 600,
              margin: '0 auto'
            }}
        >
            Your metamask address: {metamaskAddress}
            <button onClick={() => setProvider()}>Send tokens</button>
        </div>
      </div>
  )
}

export default App