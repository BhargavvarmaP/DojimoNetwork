import React, { useState } from "react";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        {/* Tabs for Explore and Mint */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-6 py-2 rounded-lg ${activeTab === "explore" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Explore NFTs
          </button>
          <button
            onClick={() => setActiveTab("mint")}
            className={`ml-4 px-6 py-2 rounded-lg ${activeTab === "mint" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Mint New NFT
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "explore" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for NFT Cards */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-bold">NFT #1</h3>
              <p className="text-gray-600">Description of NFT #1</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-bold">NFT #2</h3>
              <p className="text-gray-600">Description of NFT #2</p>
            </div>
            {/* Add more NFT cards as needed */}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Mint a New NFT</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="NFT Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="NFT Description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition"
              >
                Mint NFT
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
