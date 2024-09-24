import React, { useContext, useEffect } from 'react';
import { Box, Stack, Button, TextField, Typography, Select, MenuItem, Paper } from "@mui/material";
import { AppContext } from '../App'; // Import the context
import { ethers } from "ethers";
import axios from 'axios';

const Create = () => {
    const [collections, setCollections] = React.useState([]);
    const [hasCollection, setHasCollection] = React.useState(false);
    const [collectionName, setCollectionName] = React.useState("");
    const [selectedCollection, setSelectedCollection] = React.useState("");
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [royaltyAmount, setRoyaltyAmount] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [error, setError] = React.useState("");
    const { nft, marketplace, factory } = useContext(AppContext); // Use context

    const PINATA_API_KEY = '0348e84e7bac46bfe424';
    const PINATA_SECRET_API_KEY = 'f0b71fdfb49ab36f58121ebb8442e316d021f5919a271391f8f95fa6406944ae';

    useEffect(() => {
        // Fetch existing collections for the connected user
        const fetchCollections = async () => {
            try {
                const userCollections = await factory.getUserCollections(); // Modify this according to your smart contract method
                if (userCollections.length > 0) {
                    setCollections(userCollections);
                    setHasCollection(true);
                }
            } catch (error) {
                console.error("Failed to fetch collections:", error);
            }
        };
        fetchCollections();
    }, [factory]);

    // Handle collection creation (on-chain)
    const createCollection = async () => {
        if (!collectionName) {
            setError("Collection name is required.");
            return;
        }

        try {
            const tx = await factory.createDojimaNFTCollection(collectionName, collectionName.slice(0, 3));
            await tx.wait(); // wait for transaction confirmation
            setCollections([...collections, collectionName]); // Adding to the local list
            setHasCollection(true);
            setError("");
        } catch (err) {
            setError("Collection creation failed: " + err.message);
        }
    };

    // Handle image upload to Pinata
    const uploadToPinata = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError("Please select a file.");
            return;
        }

        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            setError("Please upload a JPEG or PNG file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                maxBodyLength: 'Infinity', // Prevent axios from throwing error on large files
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'pinata_api_key': PINATA_API_KEY,
                    'pinata_secret_api_key': PINATA_SECRET_API_KEY,
                },
            });
            const ipfsHash = res.data.IpfsHash;
            setImage(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
            setError("");
        } catch (error) {
            setError("Pinata Upload Error: " + error.message);
        }
    };

    // Handle NFT creation and minting
    const createNFT = async () => {
        if (!name || !image || !royaltyAmount || !description || !selectedCollection) {
            setError("All fields are mandatory.");
            return;
        }

        try {
            const metadata = {
                image,
                name,
                description,
                collection: selectedCollection,
            };

            const result = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
                headers: {
                    'pinata_api_key': PINATA_API_KEY,
                    'pinata_secret_api_key': PINATA_SECRET_API_KEY,
                },
            });

            const metadataURI = `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`;

            const tx = await nft.mintNFT(metadataURI, ethers.utils.parseEther(royaltyAmount.toString())); 
            await tx.wait();
            setError(""); // Reset error on success
        } catch (err) {
            setError("Minting failed: " + err.message);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, width: "100%" }}>
                {error && <Typography color="error" align="center">{error}</Typography>}

                {/* Create Collection Form */}
                {!hasCollection && (
                    <Stack spacing={2} marginBottom={4}>
                        <Typography variant="h5">Create Collection</Typography>
                        <TextField
                            label="Collection Name"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={createCollection} fullWidth>Create Collection</Button>
                    </Stack>
                )}

                {/* Create NFT Form */}
                {hasCollection && (
                    <Stack spacing={2}>
                        <Typography variant="h5">Create New NFT</Typography>

                        {/* Select Collection */}
                        <Select
                            value={selectedCollection}
                            onChange={(e) => setSelectedCollection(e.target.value)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>Select a Collection</MenuItem>
                            {collections.map((col, index) => (
                                <MenuItem key={index} value={col}>{col}</MenuItem>
                            ))}
                        </Select>

                        <TextField label="NFT Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
                        <TextField label="Royalty in Units" type="number" value={royaltyAmount} onChange={(e) => setRoyaltyAmount(e.target.value)} fullWidth />
                        
                        <input type="file" accept="image/*" onChange={uploadToPinata} />
                        {image && <img src={image} alt="NFT Preview" width="200" style={{ marginTop: 10 }} />}

                        <Button variant="contained" onClick={createNFT} fullWidth>Mint NFT</Button>
                    </Stack>
                )}
            </Paper>
        </Box>
    );
};

export default Create;
