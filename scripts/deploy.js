const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );


  const Auction = await hre.ethers.getContractFactory("Auction");
  const auction = await Auction.deploy();

  await auction.deployed();
  console.log("Contract deployed to:", auction.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });