import {ethers} from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("OnchainNFT")

  const deployedContract = await contractFactory.deploy("MyNFT", "MNFT")
  
  console.log("deployed contract ", deployedContract.target)
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1)
})