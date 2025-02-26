import {ethers} from "hardhat"

async function main () {
  const contractAddress = "0xf00154735B66dDc1985ACe3D1cb4531531268415"
  const contractFactory = await ethers.getContractFactory("OnchainNFT")
  const deployedContract = await contractFactory.deploy("MyNFT", "MNFT")
  console.log("deployed contract ", deployedContract.target)
  // parameters to pass into the mintNFT
  const recipientAddress = "0x9A73414365f5D77Fe1D4aA2Ae67a7b5FA3eb01eA"
  const nftName = "Onchain NFT"
  const description = "I love my NFT"
  const imageURI = "<svg height='200' width='350' xmlns='http://www.w3.org/2000/svg'>" + 
                  "<path id='lineAC' d='M 30 180 q 150 -250 300 0' stroke='blue' stroke-width='2' fill='none'/>" + 
                  "<text style='fill:red;font-size:25px;'>" + 
                  "<textPath href='#lineAC' startOffset='80'>I love my new NFT!</textPath>" + 
                  "</text>" +
                  "</svg>"
  await deployedContract.mintNFT(recipientAddress, nftName, description, imageURI)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
  console.error(err);
  process.exit(1);
})
