// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DojimaNFT
 * @dev ERC721 NFT contract with royalty support, minting functionality, and enhanced error handling.
 */
contract DojimaNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Strings for uint256;

    uint256 private tokenCounter;

    struct RoyaltyInfo {
        address receiver;
        uint256 amount; // Royalty amount in basis points (e.g., 500 = 5%)
    }
    mapping(uint256 => RoyaltyInfo) private _royaltyInfos;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string tokenURI, uint256 royaltyAmount);
    event RoyaltyUpdated(uint256 indexed tokenId, address indexed receiver, uint256 royaltyAmount);
    event NFTBurned(uint256 indexed tokenId, address indexed owner);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        tokenCounter = 0;
    }

    /**
     * @dev Mint a new NFT with the specified token URI and royalty amount.
     * @param tokenURI The URI pointing to the NFT metadata.
     * @param royaltyAmount The royalty amount in basis points (max 10000 for 100%).
     * @return newItemId The ID of the newly minted NFT.
     */
    function mintNFT(string memory tokenURI, uint256 royaltyAmount) external onlyOwner nonReentrant returns (uint256) {
        require(bytes(tokenURI).length > 0, "Token URI must not be empty");
        require(royaltyAmount <= 10000, "Royalty exceeds 100%");
        
        uint256 newItemId = tokenCounter++;
        _safeMint(msg.sender, newItemId);
        
        // Validate IPFS hash format
        require(_validateIPFS(tokenURI), "Invalid IPFS URI format");
        _setTokenURI(newItemId, tokenURI);

        _royaltyInfos[newItemId] = RoyaltyInfo(msg.sender, royaltyAmount);

        emit NFTMinted(newItemId, msg.sender, tokenURI, royaltyAmount);
        return newItemId;
    }

    /**
     * @dev Validate the IPFS URI format.
     * @param tokenURI The token URI to validate.
     * @return isValid True if valid, false otherwise.
     */
    function _validateIPFS(string memory tokenURI) internal pure returns (bool) {
        return (bytes(tokenURI).length >= 46 && bytes(tokenURI)[0] == 'i' && bytes(tokenURI)[1] == 'p' &&
                bytes(tokenURI)[2] == 'f' && bytes(tokenURI)[3] == 's' && bytes(tokenURI)[4] == ':');
    }

    /**
     * @dev Transfer ownership of an NFT.
     * @param to The address to transfer the NFT to.
     * @param tokenId The ID of the NFT to transfer.
     */
    function transferNFT(address to, uint256 tokenId) external {
        require(requireOwned(tokenId), "Token does not exist");
        address owner = ownerOf(tokenId);
        require(msg.sender == owner || getApproved(tokenId) == to || isApprovedForAll(owner, msg.sender), "Not owner nor approved");
        require(to != address(0), "Invalid address");

        _safeTransfer(owner, to, tokenId, "");
    }

    /**
     * @dev Burn an NFT.
     * @param tokenId The ID of the NFT to be burned.
     */
    function burnNFT(uint256 tokenId) external {
        require(requireOwned(tokenId), "Token does not exist");
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Caller is not the owner");

        _burn(tokenId);
        emit NFTBurned(tokenId, owner);
    }

    /**
     * @dev Get royalty information for a token.
     * @param tokenId The ID of the token.
     * @param salePrice The sale price of the token.
     * @return receiver The address receiving the royalty.
     * @return royaltyAmount The royalty amount to be paid.
     */
    function getRoyaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256) {
        require(requireOwned(tokenId), "Token does not exist");
        
        RoyaltyInfo memory royalty = _royaltyInfos[tokenId];
        uint256 royaltyAmount = (salePrice * royalty.amount) / 10000;
        return (royalty.receiver, royaltyAmount);
    }

    /**
     * @dev Check if the token exists.
     * @param tokenId The ID of the token to check.
     * @return exists True if the token exists, false otherwise.
     */
    function requireOwned(uint256 tokenId) internal view  returns (bool) {
        require(_requireOwned(tokenId)!=address(0),"Token not Existed");
        return true;
    
    }
}
