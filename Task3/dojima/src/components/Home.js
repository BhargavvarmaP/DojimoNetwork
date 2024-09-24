import React from 'react';
import { Box, Stack, TextField, Button, Typography, Card, CardContent, CardMedia, Container, Grid } from "@mui/material";

const Home = () => {
  const [formData, setFormData] = React.useState({});
  const { Name, Address } = formData;

  function handleSubmit() {
    console.log("Name:", Name);
    console.log("Address:", Address);
  }

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      
      <main>
        <Container maxWidth="lg" sx={{ textAlign: "center", marginBottom: "40px" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }}>
            Welcome to the Dojima NFT Marketplace
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: "10px", color: "#666" }}>
            Discover, collect, and sell extraordinary NFTs
          </Typography>
          <Button href="/Explore" variant="contained" sx={{ marginTop: "20px", borderRadius: "16px", backgroundColor: "#ff4081", color: "white" }}>
            Explore Now
          </Button>
        </Container>
      </main>

      
      <article>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
            Featured NFTs
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ borderRadius: "16px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://via.placeholder.com/300?text=NFT+${item}`}
                    alt={`NFT ${item}`}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                      NFT Title {item}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>
                      A brief description of NFT {item}.
                    </Typography>
                    <Button variant="contained" fullWidth sx={{ marginTop: "10px", backgroundColor: "#ff4081", color: "white" }}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </article>

      
      <Box boxShadow={6} sx={{ width: "50%", margin: "40px auto", padding: "20px", borderRadius: "16px", backgroundColor: "white" }}>
        <Typography variant="h5" textAlign="center" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Join Our Community
        </Typography>
        <Stack spacing={3}>
          <TextField
            size="small"
            onChange={onChangeHandler}
            name="Name"
            label="Name"
            placeholder="Enter Your Name"
            fullWidth
            required
          />
          <TextField
            size="small"
            onChange={onChangeHandler}
            name="Address"
            label="Wallet Address"
            placeholder="Enter Your Wallet Address"
            fullWidth
            required
          />
          <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ backgroundColor: "#ff4081", color: "white", borderRadius: "16px" }}>
            Get Started
          </Button>
        </Stack>
      </Box>

      {/* Footer Section */}
      <footer>
        <Box sx={{ backgroundColor: "#333", color: "white", padding: "20px 0", marginTop: "40px" }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  About Us
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px" }}>
                  We are a decentralized marketplace offering a platform to discover, buy, and sell unique digital assets.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Quick Links
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px" }}>Explore</Typography>
                <Typography variant="body2">Collections</Typography>
                <Typography variant="body2">Create</Typography>
                <Typography variant="body2">Contact Us</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Follow Us
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px" }}>Twitter</Typography>
                <Typography variant="body2">Instagram</Typography>
                <Typography variant="body2">Discord</Typography>
                <Typography variant="body2">Facebook</Typography>
              </Grid>
            </Grid>
          </Container>
          <Typography variant="body2" textAlign="center" sx={{ marginTop: "20px" }}>
            &copy; 2024 Dojima NFT Marketplace. All Rights Reserved.
          </Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default Home;
