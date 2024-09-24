import React from 'react';
import { ethers } from "ethers";
import { Typography, Grid, Box, Card, CardContent, CardMedia, Button, Container } from "@mui/material";

export default function MyPurchases({ marketplace, nft, account }) {
    const [loading, setLoading] = React.useState(false);
    const [purchases, setPurchases] = React.useState([]);

    const loadPurchasedItems = async () => {
        const filter = marketplace.filters.Bought(null, null, null, null, null, account);
        const results = await marketplace.queryFilter(filter);

        const purchases = await Promise.all(results.map(async (i) => {
            i = i.args;
            const uri = await nft.tokenURI(i.tokenId);
            const response = await fetch(uri);
            const metadata = await response.json();
            const totalPrice = await marketplace.getTotalPrice(i.itemId);

            return {
                totalPrice,
                itemId: i.itemId,
                name: metadata.name,
                description: metadata.description,
                image: metadata.image,
                collection: metadata.collection || "Uncategorized",
            };
        }));

        setLoading(false);
        setPurchases(purchases);
    };

    const handleRelist = async (itemId) => {
        await marketplace.listItem(itemId); // Assume listItem is a function to list the NFT again
        loadPurchasedItems(); // Reload purchased items after relisting
    };

    React.useEffect(() => {
        loadPurchasedItems();
    }, []);

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <Typography variant="h4" sx={{ backgroundColor: "rgba(243, 171, 171, 0.2)", backdropFilter: "blur(10px)", color: "white", width: "400px", margin: "auto" }}>Loading...</Typography>
        </main>
    );

    const collectionsMap = purchases.reduce((acc, item) => {
        if (!acc[item.collection]) {
            acc[item.collection] = [];
        }
        acc[item.collection].push(item);
        return acc;
    }, {});

    return (
        <Box sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
            <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
                <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
                    My Purchased Collections
                </Typography>
                {Object.entries(collectionsMap).length > 0 ? (
                    Object.entries(collectionsMap).map(([collectionName, items], index) => (
                        <Box key={index} sx={{ marginBottom: "40px" }}>
                            <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
                                {collectionName}
                            </Typography>
                            <Grid container spacing={4}>
                                {items.map((item, i) => (
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
                                                    onClick={() => handleRelist(item.itemId)}
                                                >
                                                    Relist
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : (
                    <main style={{ padding: "1rem 0" }}>
                        <Typography variant="h4" sx={{ backgroundColor: "rgba(243, 171, 171, 0.2)", backdropFilter: "blur(10px)", color: "white", width: "400px", margin: "auto" }}>
                            No Assets Purchased
                        </Typography>
                    </main>
                )}
            </Container>
        </Box>
    );
}
