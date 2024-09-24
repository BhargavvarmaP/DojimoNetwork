import React from "react";
const ProductOverview = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
      <img 
  src="/Utils/Cover3_Homescreen.png" 
  className="w-full  object-cover mb-4 rounded" 
/>

        <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Special</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-bold mb-4">Mint NFTs</h3>
            <p className="text-gray-600">
              Mint your own NFTs with simple steps. Upload your images and create unique digital assets.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-bold mb-4">Transfer Ownership</h3>
            <p className="text-gray-600">
              Securely transfer your NFTs to others with just a few clicks. Fast and secure.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-bold mb-4">Explore Collections</h3>
            <p className="text-gray-600">
              Browse and discover the most popular NFTs from various creators around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
