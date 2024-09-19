// src/App.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(account);
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const { chainId } = await provider.getNetwork();

        if (chainId !== 187) {
          await switchNetwork();
        }

        fetchBalance(account);
      } catch (error) {
        console.error(error);
        setErrorMessage('Connection failed. Please try again.');
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xbb' }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xbb',
                chainName: 'Dojima Stagenet',
                rpcUrls: ['https://rpc-d11k.dojima.network'],
                nativeCurrency: {
                  name: 'Dojima',
                  symbol: 'DOJ',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://explorer.d11k.dojima.network/'],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
          setErrorMessage('Failed to switch to Dojima Stagenet.');
        }
      } else {
        console.error(switchError);
      }
    }
  };

  const fetchBalance = async (account) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://rpc-d11k.dojima.network');
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch balance.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Dojima Stagenet Wallet</h1>

        {!walletAddress ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition hover:bg-blue-600"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 font-medium">Wallet Address:</p>
            <p className="bg-gray-100 p-2 rounded-md text-sm break-all text-gray-800">{walletAddress}</p>

            <div className="mt-4">
              <p className="text-gray-600 font-medium">Balance:</p>
              <p className="text-xl font-bold text-gray-900">{balance} DOJ</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
