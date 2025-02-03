import { useState } from 'react';
import { ethers } from 'ethers';
import BiometricAuth from './artifacts/contracts/BiometricAuth.sol/BiometricAuth.json';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address

function App() {
  const [hash, setHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  // Connect to MetaMask
  async function connectWallet() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  // Register a biometric hash
  async function registerHash() {
    await connectWallet();
    const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers.js v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, BiometricAuth.abi, signer);
    await contract.registerBiometric(hash);
    alert("Biometric hash registered!");
  }

  // Verify a biometric hash
  async function verifyHash() {
    await connectWallet();
    const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers.js v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, BiometricAuth.abi, signer);
    const userAddress = await signer.getAddress();
    const isValid = await contract.verifyBiometric(userAddress, hash);
    setVerificationResult(isValid ? "✅ Verified" : "❌ Not Verified");
  }

  return (
    <div>
      <h1>Biometric Identity System</h1>
      <input
        type="text"
        placeholder="fingerprint123"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
      />
      <button onClick={registerHash}>Register</button>
      <button onClick={verifyHash}>Verify</button>
      <p>{verificationResult}</p>
    </div>
  );
}

export default App;