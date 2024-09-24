const { ethers } = require("hardhat");

async function main() {
    

    // Get the ContractFactory for DojimaNFTFactory
    const DojimaNFTFactory = await ethers.getContractFactory("DojimaNFTFactory");
    const DojimaNFTMarketplace = await ethers.getContractFactory("DojimaNFTMarketplace");
    console.log(DojimaNFTFactory,DojimaNFTMarketplace)
    // Deploy the factory contract
    const dojimaNFTFactory = await DojimaNFTFactory.deploy();
    const dojimaNFTMarketplace = await DojimaNFTMarketplace.deploy();
    // Wait for the deployment to be mined
    await dojimaNFTFactory.deployed();
    await dojimaNFTMarketplace.deployed();

    console.log("DojimaNFTFactory deployed to:", dojimaNFTFactory.address);
    console.log("DojimaNFTFactory deployed to:", dojimaNFTMarketplace.address);
}

// Run the main function and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
