import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from './comp/Navbar'; // Import Navbar component
import FatcVoter from './comp/FatcVoter';
import Propsal from './comp/Proposals';
import Set from './comp/FatchCandi';
import Vote from './comp/Vote';
import Home from './comp/Home'; // Import Home component
import ABIFILE from './artifacts/contracts/BlockchainVoting.sol/BlockchainVoting.json';

const ABI = ABIFILE.abi;
const ContractAddress = '0x0fee2908afda3d25e876c05ed5a6b9e40c37d909';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    setLoading(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ContractAddress, ABI, signer);
        setContract(contract);
        setConnected(true);
        window.localStorage.setItem('Connected', 'injected');
      } else {
        alert('Ethereum wallet not detected. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setAccount('');
    setContract(null);
    setConnected(false);
    window.localStorage.removeItem('Connected');
  };

  useEffect(() => {
    if (window.localStorage.getItem('Connected')) {
      connect();
    }
  }, []);

  return (
    <Router>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote contract={contract} account={account} />} />
        <Route path="/proposals" element={<Propsal contract={contract} account={account} />} />
        <Route path="/voters" element={<FatcVoter contract={contract} account={account} />} />
        <Route path="/candidates" element={<Set contract={contract} account={account} />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
