// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./DojimaNFT.sol"; 

contract DojimaNFTMarketplace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
        address nftContract;
    }

    // Mapping from NFT contract address and token ID to listing details
    mapping(address => mapping(uint256 => Listing)) private listings;

    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, uint256 price);
    event NFTDelisted(address indexed nftContract, uint256 indexed tokenId, address indexed seller);

    modifier onlyOwner(address nftContract, uint256 tokenId) {
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not the NFT owner");
        _;
    }

    modifier isListed(address nftContract, uint256 tokenId) {
        require(listings[nftContract][tokenId].price > 0, "NFT not listed for sale");
        _;
    }

    modifier notListed(address nftContract, uint256 tokenId) {
        require(listings[nftContract][tokenId].price == 0, "NFT already listed");
        _;
    }

    /**
     * @dev List an NFT on the marketplace
     * @param nftContract Address of the NFT contract
     * @param tokenId Token ID of the NFT
     * @param price Price in wei for which the NFT is listed
     */
    function listNFT(address nftContract, uint256 tokenId, uint256 price)
        external
        nonReentrant
        onlyOwner(nftContract, tokenId)
        notListed(nftContract, tokenId)
    {
        require(price > 0, "Price must be greater than zero");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        listings[nftContract][tokenId] = Listing({
            price: price,
            seller: msg.sender,
            nftContract: nftContract
        });

        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    /**
     * @dev Buy an NFT from the marketplace
     * @param nftContract Address of the NFT contract
     * @param tokenId Token ID of the NFT
     */
    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant isListed(nftContract, tokenId) {
        Listing memory listing = listings[nftContract][tokenId];
        
        require(msg.value >= listing.price, "Insufficient payment");

        // Calculate royalty payment
        DojimaNFT dojimaNFT = DojimaNFT(nftContract);
        (address royaltyReceiver, uint256 royaltyAmount) = dojimaNFT.getRoyaltyInfo(tokenId, msg.value);

        require(msg.value >= royaltyAmount, "Royalty exceeds payment");

        // Pay royalty to the original creator
        if (royaltyAmount > 0) {
            (bool payment, ) = payable(royaltyReceiver).call{value: royaltyAmount}("");
            require(payment, "Royalty payment failed");
        }

        // Transfer the remaining amount to the seller
        (bool success, ) = payable(listing.seller).call{value:msg.value - royaltyAmount}("");
          require(success, "Remaining payment transfer failed");
        // Remove the listing
        delete listings[nftContract][tokenId];

        // Transfer the NFT to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        emit NFTSold(nftContract, tokenId, msg.sender, listing.price);
    }

    /**
     * @dev Delist an NFT from the marketplace
     * @param nftContract Address of the NFT contract
     * @param tokenId Token ID of the NFT
     */
    function delistNFT(address nftContract, uint256 tokenId)
        external
        nonReentrant
        onlyOwner(nftContract, tokenId)
        isListed(nftContract, tokenId)
    {
        Listing memory listing = listings[nftContract][tokenId];

        require(listing.seller == msg.sender, "Only seller can delist");

        // Remove the listing
        delete listings[nftContract][tokenId];

        // Transfer the NFT back to the seller
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        emit NFTDelisted(nftContract, tokenId, msg.sender);
    }

    function getListing(address nftContract, uint256 tokenId)
        external
        view
        returns (uint256 price, address seller, address nftAddress)
    {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT not listed");
        return (listing.price, listing.seller, listing.nftContract);
    }
}
