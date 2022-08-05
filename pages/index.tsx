import { Box, Button, Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useMoralis } from "react-moralis";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
const network = "0x13881";
const Home: NextPage = () => {
  const {
    account,
    enableWeb3,
    deactivateWeb3,
    chainId,
    isWeb3Enabled,
    isWeb3EnableLoading,
    Moralis,
  } = useMoralis();
  const connectWallet = async () => {
    await enableWeb3();
  };

  useEffect(() => {
    (async () => {
      if (chainId && chainId !== network) {
        await deactivateWeb3();
      }
    })();
  }, [chainId]);

  useEffect(() => {
    Moralis.onChainChanged(async (chainId) => {
      await deactivateWeb3();
    });
    Moralis.onAccountChanged(async (account) => {
      await deactivateWeb3();
    });
  }, []);
  console.log(chainId);
  return (
    <>
      <Container maxWidth={"xl"}>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100vh"}
        >
          {!isWeb3Enabled ? (
            <Button
              disabled={isWeb3EnableLoading}
              variant="contained"
              onClick={connectWallet}
              size="large"
              sx={{ borderRadius: 5 }}
            >
              CONNECT WALLET
            </Button>
          ) : (
            <TodoCard />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
