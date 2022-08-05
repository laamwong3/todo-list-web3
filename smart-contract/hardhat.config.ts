import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    mumbai: {
      url: process.env.RPC_NODE,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    outputFile: "gasUsed.txt",
    noColors: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};

export default config;
