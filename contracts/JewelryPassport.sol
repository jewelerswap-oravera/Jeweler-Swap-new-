// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JewelryPassport is ERC721, Ownable {
    uint256 private _nextTokenId = 1;
    uint256 public fee = 0.001 ether;
    
    struct Passport {
        uint256 tokenId;
        address owner;
        address verifiedBy;
        uint256 verifiedAt;
        string nfcSerial;
        string ipfsHash;
        string metadata;
        bool isActive;
    }
    
    mapping(uint256 => Passport) public passports;
    mapping(string => uint256) public nfcToTokenId;
    mapping(address => bool) public jewelers;
    
    event PassportCreated(uint256 indexed tokenId, address indexed owner, string nfcSerial);
    event PassportVerified(uint256 indexed tokenId, address indexed jeweler);
    
    constructor() ERC721("JewelryPassport", "JWP") Ownable(msg.sender) {}
    
    function addJeweler(address _jeweler) public onlyOwner {
        jewelers[_jeweler] = true;
    }
    
    function requestPassport(
        string memory _nfcSerial,
        string memory _ipfsHash,
        string memory _metadata
    ) public payable returns (uint256) {
        require(msg.value >= fee, "Insufficient fee");
        require(nfcToTokenId[_nfcSerial] == 0, "NFC already registered");
        
        uint256 tokenId = _nextTokenId++;
        passports[tokenId] = Passport({
            tokenId: tokenId,
            owner: msg.sender,
            verifiedBy: address(0),
            verifiedAt: 0,
            nfcSerial: _nfcSerial,
            ipfsHash: _ipfsHash,
            metadata: _metadata,
            isActive: false
        });
        
        nfcToTokenId[_nfcSerial] = tokenId;
        _mint(msg.sender, tokenId);
        emit PassportCreated(tokenId, msg.sender, _nfcSerial);
        return tokenId;
    }
    
    function verifyPassport(uint256 _tokenId) public {
        require(jewelers[msg.sender], "Not authorized jeweler");
        require(!passports[_tokenId].isActive, "Already verified");
        
        passports[_tokenId].verifiedBy = msg.sender;
        passports[_tokenId].verifiedAt = block.timestamp;
        passports[_tokenId].isActive = true;
        
        emit PassportVerified(_tokenId, msg.sender);
    }
    
    function getPassportByNFC(string memory _nfcSerial) public view returns (Passport memory) {
        uint256 tokenId = nfcToTokenId[_nfcSerial];
        require(tokenId != 0, "No passport for this NFC");
        return passports[tokenId];
    }
}
