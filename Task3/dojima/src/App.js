import './App.css';
import React from "react";
import Home from './components/Home';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Create from './components/Create';
import {ethers} from "ethers";
import Explore from './components/Explore';
import MyListedItems from './components/MyListedItems';
import MyPurchases from './components/MyPurchases';
import DojimaNFT from "./ABI/DojimaNFT.json";
import DojimaNFTFactory from "./ABI/DojimaNFTFactory.json";
import DojimaNFTMarketplace from "./ABI/DojimaNFTMarketplace.json";
export const AppContext = React.createContext(); // Create context

function App() {
  const [account, setAccount] = React.useState("Connect to Wallet");
  const [nft, setNFT] = React.useState({});
  const [factory, setFactory] = React.useState({});
  const [marketplace, setMarketplace] = React.useState({});  
  const data = React.createContext({});
  
  const Connect = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await Connect();
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    const MarketplaceAddress = "0xC933E5bA31265fe459404701FA479F2776e2dAAC";
    const FactoryAddress = "0xc3A3D1627370C107Dc4C8698fC3a1D9Bd0A9CaDD";
    const NFTAddress = "0x4F689bAc306e1785DA5163D1CDC42D424591a720";
    const marketplace = new ethers.Contract(MarketplaceAddress, DojimaNFTMarketplace, signer);
    const factory = new ethers.Contract(FactoryAddress, DojimaNFTFactory, signer);
    let nft = new ethers.Contract(NFTAddress, DojimaNFT, signer);
    setMarketplace(marketplace);
    setFactory(factory)
    setNFT(nft);
    
  }
  return (
    <div className="App">
      <AppContext.Provider value={{ account, nft, marketplace,factory }}> {/* Use Provider */}
        <Navbar Connect={Connect} account={account} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Create" element={<Create marketplace={marketplace} factory={factory} nft={nft} account={account}/>} />
            <Route path="/Explore" element={<Explore marketplace={marketplace}  account={account} />} />
            <Route path="/MyListedItems" element={<MyListedItems marketplace={marketplace} nft={nft} account={account} />} />
            <Route path="/MyPurchases" element={<MyPurchases marketplace={marketplace} nft={nft} account={account} />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
