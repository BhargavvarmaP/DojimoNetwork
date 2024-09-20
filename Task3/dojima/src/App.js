import React from "react";
import Navbar from "./components/Navbar";
import HomeScreen from "./components/HomeScreen";
import ProductOverview from "./components/ProductOverview";

function App() {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Wallet connected:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature!");
    }
  };

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} />
      <HomeScreen />
      <ProductOverview />
    </div>
  );
}

export default App;
