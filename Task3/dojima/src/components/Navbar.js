import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Stack, Typography, Button } from "@mui/material";

const Navbar = ({ Connect, account }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#333", padding: "10px 0" }}>
            <Toolbar>
                {/* Brand/Logo */}
                <Button
                     href="/"
                    sx={{
                      fontSize: "25px",
                        display: "flex",
                        justifyContent: "flex-start",
                        fontWeight: 600,
                        fontFamily: "cursive",
                        color: "white",
                        marginLeft: "20px"
                    }}
                >
                    DojimaNFT
                </Button>
                
                {/* Navigation Links */}
                <Stack
                    direction="row"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "80px"
                    }}
                    spacing={4}
                >
                    
                    {account && (
                        <>
                            <Button href="/Create" sx={navButtonStyles}>
                                Create
                            </Button>
                            <Button href="/MyListedItems" sx={navButtonStyles}>
                                MyListedItems
                            </Button>
                            <Button href="/MyPurchases" sx={navButtonStyles}>
                                MyPurchases
                            </Button>
                        </>
                    )}
                    
                </Stack>
                
                <Button
                    variant="contained"
                    onClick={Connect}
                    sx={{
                        fontWeight: 600,
                        backgroundColor: "transparent",
                        border: "2px solid white",
                        color: "white",
                        borderRadius: "14px",
                        padding: "8px 16px",
                        marginRight: "20px",
                        '&:hover': {
                            backgroundColor: "#ff4081",
                            borderColor: "#ff4081",
                        },
                    }}
                >
                    {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

const navButtonStyles = {
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "Arial",
    color: "white",
    '&:hover': {
        color: "#ff4081",
    },
};

export default Navbar;
