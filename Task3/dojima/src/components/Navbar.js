import React, { useState } from "react";

const Navbar = ({ connectWallet, disconnectWallet, userAddress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectToggle = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
    setIsConnected(!isConnected);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Marketplace Name */}
          <div className="text-2xl font-bold text-white">
            <a href="/" className="hover:text-gray-300">
              Dojima Marketplace
            </a>
          </div>

          {/* Menu Items for Medium and Larger Screens */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-100 hover:text-gray-300">Home</a>
            <a href="#explore" className="text-gray-100 hover:text-gray-300">Explore</a>
            <a href="#features" className="text-gray-100 hover:text-gray-300">Features</a>
            <a href="#about" className="text-gray-100 hover:text-gray-300">About Us</a>
          </div>

          {/* Connect/Disconnect Wallet Button */}
          <div className="hidden md:block">
            <button
              onClick={handleConnectToggle}
              className={`bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg transition ease-in-out duration-300 ${
                isConnected ? "hover:bg-red-100" : "hover:bg-purple-100"
              }`}
            >
              {isConnected ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Connect Wallet"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <a
              href="/"
              className="block text-gray-100 hover:bg-purple-700 py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#explore"
              className="block text-gray-100 hover:bg-purple-700 py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </a>
            <a
              href="#features"
              className="block text-gray-100 hover:bg-purple-700 py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#about"
              className="block text-gray-100 hover:bg-purple-700 py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </a>
            <button
              onClick={handleConnectToggle}
              className={`w-full bg-white text-purple-700 font-semibold px-4 py-2 mt-4 rounded-lg transition ease-in-out duration-300 ${
                isConnected ? "hover:bg-red-100" : "hover:bg-purple-100"
              }`}
            >
              {isConnected ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
