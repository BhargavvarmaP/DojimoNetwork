NFT Marketplace Application
This project is a React-based NFT Marketplace called "wayNFT," allowing users to mint, view, add, transfer, and delete NFTs stored on IPFS. It integrates with smart contracts deployed on the Polygon Mumbai testnet using ethers.js, and features include wallet connection, smart contract interactions, and an intuitive frontend for managing NFTs.

Features
Mint NFTs: Create and mint NFTs using an IPFS integration.
View and Explore NFTs: Explore and manage your NFT collections.
Transfer and Delete NFTs: Transfer ownership or delete your NFTs.
Wallet Integration: Connect to MetaMask for seamless transactions.
Smart Contract Interaction: Interact with deployed smart contracts using ethers.js.
Technologies Used
React: Frontend framework
Ethers.js: Ethereum interaction library
IPFS: For image and metadata storage
Solidity: Smart contract development
Tailwind CSS / Material-UI: For advanced styling
React Router: For page navigation
Smart Contracts Used
DojimaNFT: Main NFT smart contract
DojimaNFTFactory: Factory contract for creating NFTs
DojimaNFTMarketplace: Marketplace contract for managing NFTs
Prerequisites
Node.js (v16.16.0 or above recommended)
npm or yarn
MetaMask browser extension
An Ethereum wallet with Binance  testnet funds
Getting Started
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/BhargavvarmaP/DojimoNetwork.git
Navigate to the project directory:
bash
Copy code
cd DojimaNFTMarketplace
Install dependencies:
bash
Copy code
npm install
or
bash
Copy code
yarn install
Environment Setup
Ensure you have MetaMask installed and set up to connect to the Polygon Mumbai testnet. Fund your wallet with test tokens from the Mumbai Faucet.

Running the Application
Start the development server:

bash
Copy code
npm start
or

bash
Copy code
yarn start
Visit http://localhost:3000 to use the application.

Using the Application
Connect Wallet: Click the "Connect to Wallet" button to link your MetaMask account.
Mint NFTs: Navigate to the 'Create' page to mint a new NFT.
Explore NFTs: View available NFTs on the 'Explore' page.
Manage Your NFTs: Check your listed items on the 'MyListedItems' page and view your purchases on the 'MyPurchases' page.
Folder Structure
bash
Copy code
src
├── components
│   ├── Create.js         # Component for minting NFTs
│   ├── Explore.js        # Component for exploring NFTs
│   ├── Home.js           # Homepage component
│   ├── MyListedItems.js  # Component for managing your listed NFTs
│   ├── MyPurchases.js    # Component for viewing your purchases
│   ├── Navbar.js         # Navigation bar
├── ABI                   # Folder containing ABI files for smart contracts
├── App.js                # Main entry point of the application
└── index.js              # Application bootstrap
Contract Details
Marketplace Address: 0xF4A73aec5CbB0721a1Ea49B9B37D39bd6ea067fb
Factory Address: 0xE47d750647c94D04B94952b8B31B890c8CD42572

Deployment
To create a production build:

bash
Copy code
npm run build
or

bash
Copy code
yarn build
The optimized build will be created in the build directory.

License
This project is licensed under the MIT License.

Acknowledgments
ethers.js for blockchain interaction
IPFS for decentralized storage
Binance Testnet for testing