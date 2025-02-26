import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: `${process.env.ALCHEMY_SEPOLIA_API_URL}`,
      accounts: [`0x${process.env.SEPOLIA_ACCOUNT_PRIVATE_KEY}`]
    }
  }
};

export default config;
