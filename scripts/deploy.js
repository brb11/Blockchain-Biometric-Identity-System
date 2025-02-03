const hre = require("hardhat");

async function main() {
    const BiometricAuth = await ethers.getContractFactory("BiometricAuth");
    const biometricAuth = await BiometricAuth.deploy(); // Correct way to deploy
    await biometricAuth.waitForDeployment(); // Use waitForDeployment instead of .deployed()
  
    console.log("BiometricAuth deployed to:", await biometricAuth.getAddress());
  }
  

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });