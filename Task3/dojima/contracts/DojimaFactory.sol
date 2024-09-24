// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DojimaNFT.sol";  

/**
 * @title DojimaNFTFactory
 * @dev A factory contract for deploying and managing instances of the DojimaNFT contract.
 */
contract DojimaNFTFactory {
    // Array to store addresses of all deployed DojimaNFT contracts
    address[] public deployedNFTCollection;

    // Event emitted when a new DojimaNFT contract is deployed
    event DojimaNFTCollectionCreated(address indexed nftAddress, address indexed owner, string name, string symbol);

    /**
     * @dev Deploy a new instance of the DojimaNFT contract.
     * @param name The name of the NFT collection.
     * @param symbol The symbol of the NFT collection.
     * @return nftAddress The address of the newly deployed DojimaNFT contract.
     */
    function createDojimaNFTCollection(string memory name, string memory symbol) external returns (address nftAddress) {
        // Deploy a new instance of the DojimaNFT contract
        DojimaNFT newNFTCollection = new DojimaNFT(name, symbol);

        // Transfer ownership of the new contract to the creator (msg.sender)
        newNFTCollection.transferOwnership(msg.sender);

        // Add the address of the deployed contract to the list
        deployedNFTCollection.push(address(newNFTCollection));

        // Emit the event
        emit DojimaNFTCollectionCreated(address(newNFTCollection), msg.sender, name, symbol);

        return address(newNFTCollection);
    }

    /**
     * @dev Get all deployed DojimaNFT contract addresses.
     * @return An array of addresses of all deployed DojimaNFT contracts.
     */
    function getDeployedNFTCollection() external view returns (address[] memory) {
        return deployedNFTCollection;
    }
}
