// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

// import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract OnchainNFT is ERC721URIStorage, Ownable {
    uint256 private tokenCounter;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory metadataName, string memory metadataDesc, string memory imageURI) external returns(uint256) {
      uint256 tokenId = tokenCounter + 1;

      string memory json = Base64.encode(
        abi.encodePacked('{"name": "', metadataName,'", "description": "', metadataDesc,'", "image": "data:image/svg+xml;base64,',Base64.encode(bytes(imageURI)),'"}')
      );

      _safeMint(recipient, tokenId);
      _setTokenURI(tokenId, string(abi.encodePacked("data:application/json;base64,", json)));

      tokenCounter = tokenId;
      return tokenId;
    }
}