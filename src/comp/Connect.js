import React, { useState } from "react";
import { ethers } from "ethers";
import * as ReactBootStrap from "react-bootstrap";

const Connect = ({ onConnect }) => {
  const [loading, setLoading] = useState(false);

  const connectToEthereum = async () => {
    setLoading(true);
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        onConnect(accounts[0]);
      } catch (error) {
        console.error("Error connecting to Ethereum:", error);
      }
    } else {
      console.error("Ethereum provider not found");
    }
  };

  return (
    <div className="text-center">
      <h2>Connect to Ethereum</h2>
      <button
        onClick={connectToEthereum}
        className="btn btn-success"
        disabled={loading}
      >
        {!loading ? "Connect" : "Connecting..."}
      </button>
    </div>
  );
};

export default Connect;
