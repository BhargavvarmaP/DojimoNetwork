# Dojima Stagenet Wallet

This React application allows users to connect their MetaMask wallet to the Dojima Stagenet, retrieve their wallet address, and display the balance in DOJ tokens. The application uses `ethers.js` for interacting with the Ethereum network and supports network switching to the Dojima Stagenet.

## Features

- Connect to MetaMask and retrieve wallet details
- Automatically switch to Dojima Stagenet if not already connected
- Display the user's wallet address and DOJ balance
- Error handling for failed connections, network switching, and balance retrieval

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed: [Download Node.js](https://nodejs.org/)
- MetaMask installed in your browser: [Download MetaMask](https://metamask.io/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BhargavvarmaP/DojimoNetwork.git
   


Navigate to the project directory:

bash
Copy code
cd dojima-stagenet-wallet
Install the required dependencies:

bash
Copy code
npm install
Running the Application
Start the development server:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Usage
Open the application in your browser.
Click the "Connect MetaMask" button.
If not connected to the Dojima Stagenet, the app will prompt MetaMask to switch the network.
Once connected, your wallet address and DOJ balance will be displayed.
Network Information
Chain ID: 187 (0xbb in hexadecimal)
RPC URL: https://rpc-d11k.dojima.network
Currency Symbol: DOJ
Block Explorer: Dojima Stagenet Explorer
Technologies Used
React.js
ethers.js
Tailwind CSS
Troubleshooting
If the wallet connection fails, ensure MetaMask is installed and configured correctly.
If the network switch fails, check that your MetaMask is unlocked and the correct permissions are granted.


