// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BiometricAuth {
    // Maps user addresses to their biometric hash
    mapping(address => string) public biometricHashes;

    // Event to log registration
    event BiometricRegistered(address indexed user, string hash);

    // Register a biometric hash
    function registerBiometric(string memory _hash) public {
        require(bytes(_hash).length > 0, "Hash cannot be empty");
        biometricHashes[msg.sender] = _hash;
        emit BiometricRegistered(msg.sender, _hash);
    }

    // Verify a biometric hash
    function verifyBiometric(address _user, string memory _hash) public view returns (bool) {
        return keccak256(bytes(biometricHashes[_user])) == keccak256(bytes(_hash));
    }
}