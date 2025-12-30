const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying JewelryPassport contract...");
  
  const JewelryPassport = await ethers.getContractFactory("JewelryPassport");
  const passport = await JewelryPassport.deploy();
  
  await passport.waitForDeployment();
  
  console.log("✅ Contract deployed to:", await passport.getAddress());
  console.log("");
  console.log("📋 NEXT STEPS:");
  console.log("1. Copy this address to backend/.env");
  console.log("2. Add jewelers with: await passport.addJeweler('0xADDRESS')");
  console.log("3. Test with: npx hardhat test");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
