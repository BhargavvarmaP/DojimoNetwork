Sepolia Testnet Transactions Viewer
This project is a React application that displays a paginated list of transactions for a given Ethereum Sepolia testnet address using ethers.js and the Etherscan API. It shows transaction details such as the transaction hash, sender, recipient, value, and gas used.

Features
Fetches transactions for a specified Ethereum address from the Sepolia testnet.
Displays transaction details including hash, from, to, value, and gas used.
Pagination for easy browsing of transactions (15 transactions per page).
Error handling for invalid or unavailable data.
User-friendly UI with Tailwind CSS styling.
Technologies Used
React: Frontend framework
Axios: For making API requests
ethers.js: For Ethereum-related functionality
Tailwind CSS: For styling the application
Getting Started
Prerequisites
Node.js (version 16.16.0 recommended)
npm (Node Package Manager) or yarn
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/BhargavvarmaP/DojimoNetwork.git
Navigate to the project directory:
bash
Copy code
cd sepolia-transaction-viewer
Install the dependencies:
bash
Copy code
npm install
or
bash
Copy code
yarn install
Running the Application
Start the React development server:

bash
Copy code
npm start
or

bash
Copy code
yarn start
The application will be running at http://localhost:3000.

Configuration
To fetch transactions, the application uses the Etherscan API. Make sure to set your API key in the apiKey variable located in the TransactionList component file:

js
Copy code
const apiKey = 'YOUR_ETHERSCAN_API_KEY';
Usage
The app will display a list of transactions for the provided Ethereum Sepolia testnet address.
Use the "Previous" and "Next" buttons to navigate through pages of transactions.
Deployment
To build the project for production, run:

bash
Copy code
npm run build
or

bash
Copy code
yarn build
The build output will be generated in the build directory.

License
This project is licensed under the MIT License.

Acknowledgments
Ethers.js - For interacting with the Ethereum blockchain
Etherscan API - For fetching transaction data
Tailwind CSS - For styling the application
