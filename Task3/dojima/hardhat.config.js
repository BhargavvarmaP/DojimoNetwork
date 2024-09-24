require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: [`e7e3cadd338e7ff25d8229c6b22be02019327c45c0248b066358e50542c4df5c`],
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [`e7e3cadd338e7ff25d8229c6b22be02019327c45c0248b066358e50542c4df5c`],
    },
  },
};

