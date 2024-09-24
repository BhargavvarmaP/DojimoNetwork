import React, { useContext } from 'react';
import { Box, Stack, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { AppContext } from '../App'; // Import the context

const Create = () => {
    const [collections, setCollections] = React.useState([]);
    const [hasCollection, setHasCollection] = React.useState(false);
    const [collectionName, setCollectionName] = React.useState("");
    const [selectedCollection, setSelectedCollection] = React.useState("");
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [uri, setURI] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [error, setError] = React.useState("");
    const { nft, marketplace, factory } = useContext(AppContext); // Use context

    // Handle collection creation (on-chain)
    const createCollection = async () => {
        if (!collectionName) {
            setError("Collection name is required.");
            return;
        }

        try {
            console.log(factory)
            const tx = await factory.createDojimaNFTCollection(collectionName,collectionName.slice(0,3) );
            
            await tx.wait(); // wait for transaction confirmation
            console.log("factory",tx)
            setCollections([...collections, collectionName]); // Adding to the local list
            setHasCollection(true);
            setError("");
        } catch (err) {
            setError("Collection creation failed: " + err.message);
        }
    };

    // Handle image upload to IPFS
    const uploadIPFS = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/png"];
            if (!validTypes.includes(file.type)) {
                setError("Please upload a JPEG or PNG file.");
                return;
            }
            try {
                const ipfs = await window.Ipfs.create();
                const result = await ipfs.add(file);
                setImage("https://ipfs.io/ipfs/" + result.path);
                console.log(Image)
                setError("");
                await ipfs.stop();
            } catch (error) {
                setError("IPFS Upload Error: " + error.message);
            }
        }
    };

    // Handle NFT creation and minting
    const createNFT = async () => {
        if (!name || !image || !price || !description || !selectedCollection) {
            setError("All fields are mandatory.");
            return;
        }

        try {
            const ipfs = await window.Ipfs.create();
            const metadata = JSON.stringify({ image, name, description, uri, collection: selectedCollection });
            const result = await ipfs.add(metadata);
            const metadataURI = "https://ipfs.io/ipfs/" + result.path;
              console.log(metadata,metadataURI)
            const tx = await nft.mintNFT(metadataURI, price); // Assuming mintNFT function requires tokenURI and price
            await tx.wait();
            console.log(tx)
            setError(""); // Reset error on success
        } catch (err) {
            setError("Minting failed: " + err.message);
        }
    };

    return (
        <Box>
            <Typography variant="h4">Create New NFT</Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Stack spacing={2}>
                {/* Select Collection */}
                {hasCollection ? (
                    <Select
                        value={selectedCollection}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        displayEmpty
                    >
                        {collections.map((col, index) => (
                            <MenuItem key={index} value={col}>{col}</MenuItem>
                        ))}
                    </Select>
                ) : (
                    <>
                        <TextField
                            label="Collection Name"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                        />
                        <Button variant="contained" onClick={createCollection}>Create Collection</Button>
                    </>
                )}

                {/* NFT Details */}
                <TextField
                    label="NFT Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                />
                <TextField
                    label="Price in ETH"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={uploadIPFS}
                />
                {image && <img src={image} alt="NFT Preview" width="200" />}

                <Button variant="contained" onClick={createNFT}>Mint NFT</Button>
            </Stack>
        </Box>
    );
};

export default Create;
