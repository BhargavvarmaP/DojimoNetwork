import React from 'react';
import { ethers } from "ethers";
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button, Container } from "@mui/material";

export default function MyListedItems({ marketplace, nft, account }) {
    const [loading, setLoading] = React.useState(false);
    const [collections, setCollections] = React.useState([]);

    const loadListedItems = async () => {
        const itemCount = await marketplace.itemCount();
        const collectionsMap = new Map();

        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i);
            if (item.seller.toLowerCase() === account) {
                const uri = await nft.tokenURI(item.tokenId);
                const response = await fetch(uri);
                const metadata = await response.json();
                const totalPrice = await marketplace.getTotalPrice(item.itemId);

                const nftData = {
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                };

                const collectionName = metadata.collection || "Uncategorized";

                if (!collectionsMap.has(collectionName)) {
                    collectionsMap.set(collectionName, []);
                }
                collectionsMap.get(collectionName).push(nftData);
            }
        }

        const formattedCollections = Array.from(collectionsMap, ([name, nfts]) => ({ name, nfts }));
        setCollections(formattedCollections);
        setLoading(false);
    };

    const handleDelist = async (itemId) => {
        await marketplace.cancelListing(itemId);
        loadListedItems();
    };

    React.useEffect(() => {
        loadListedItems();
    }, []);

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <Typography variant="h4" sx={{ backgroundColor: "rgba(243, 171, 171, 0.2)", backdropFilter: "blur(10px)", color: "white", width: "400px", margin: "auto" }}>Loading...</Typography>
        </main>
    );

    return (
        <Box sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
            <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
                <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
                    My Listed Collections
                </Typography>
                {collections.length > 0 ? (
                    collections.map((collection, index) => (
                        <Box key={index} sx={{ marginBottom: "40px" }}>
                            <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
                                {collection.name}
                            </Typography>
                            <Grid container spacing={4}>
                                {collection.nfts.map((item, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={i}>
                                        <Card sx={{ borderRadius: "16px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={item.image}
                                                alt={item.name}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "#777", marginBottom: "10px" }}>
                                                    {item.description}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "#777" }}>
                                                    Price: {ethers.utils.formatEther(item.totalPrice)} ETH
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    sx={{ marginTop: "10px", backgroundColor: "#ff4081", color: "white" }}
                                                    onClick={() => handleDelist(item.itemId)}
                                                >
                                                    Delist
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : (
                    <Typography variant="h4" sx={{ backgroundColor: "rgba(243, 171, 171, 0.2)", backdropFilter: "blur(10px)", color: "white", width: "400px", margin: "auto" }}>
                        No assets Listed
                    </Typography>
                )}
            </Container>
        </Box>
    );
}
