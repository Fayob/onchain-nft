import {ethers} from "hardhat"

async function main () {
  const contractAddress = "0xf00154735B66dDc1985ACe3D1cb4531531268415"
  const contractAddress2 = "0xD8eD745f34CaE665fc27C4adb14C8B4ADc910E60"
  const onchainNFTContract = await ethers.getContractAt("OnchainNFT", contractAddress)

  // parameters to pass into the mintNFT
  const recipientAddress = "0x9A73414365f5D77Fe1D4aA2Ae67a7b5FA3eb01eA"
  const nftName = "Fayob NFT"
  const description = "This is Fayob Onchain NFT"
  const imageURI = "<svg height='200' width='350' xmlns='http://www.w3.org/2000/svg'>" + 
                  "<path id='lineAC' d='M 30 180 q 150 -250 300 0' stroke='blue' stroke-width='2' fill='none'/>" + 
                  "<text style='fill:red;font-size:25px;'>" + 
                  "<textPath href='#lineAC' startOffset='80'>Fayob's NFT!</textPath>" + 
                  "</text>" +
                  "</svg>"

  const imageURI2 = "<svg height='200' width='200' xmlns='http://www.w3.org/2000/svg'>" + 
                    "<text x='5' y='30' fill='red' font-size='35'>Onchain " + 
                    "<tspan fill='none' stroke='green'>NFT</tspan>!" +
                    "</text>" +
                    "</svg>"

  const tx = await onchainNFTContract.mintNFT(recipientAddress, nftName, description, imageURI);
  const receipt = await tx.wait();

  // Getting the token Id returned from mintNFT
  let tokenId;
  for (const log of receipt!.logs) {
    try {
      const parsedLog = onchainNFTContract.interface.parseLog(log);
      tokenId = parsedLog?.args[0]
      // console.log("Event Name:", parsedLog?.name);
      // console.log("Event Args:", parsedLog?.args);
      // console.log("Returned Token Id:", tokenId);
    } catch (error) {
      console.error("Log parsing error:", error);
    }
  }
  // console.log(receipt!.logs[receipt!.logs.length - 1].args.tokenId)
  console.log("NFT Minted #", tokenId);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
  console.error(err);
  process.exit(1);
})
