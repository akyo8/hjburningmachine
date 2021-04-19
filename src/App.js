import Web3 from "web3";
import { useState } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";

import "./App.scss";

const tokenAddrOrigin, tokenAddrConvert;
const getContract = async (web3) => {
  const data = await $.getJSON("./abis/BurnMachineV2.json");

  const netId = await web3.eth.net.getId();
  const deployedNetwork = "56";
  const burnMachine = new web3.eth.Contract(data.abi, deployedNetwork && deployedNetwork.address);
  return burnMachine;
};

const burnMachine = async (burnMachine, contract) => {
  burnMachine = await contract.methods.convertBurnToken(tokenAddrOrigin, tokenAddrConvert).call();
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber();

  const onConnect = () => {
    console.log("OnConnected");
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          console.log("test");
          wallet.connect();
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };

  return (
    <>
      {wallet.status === "connected" ? (
        <>
          <div className="App-header">
            <h1>HyperJump Burning Machine</h1>
          </div>

          <div className="App-footer">
            <p style={{ fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>The HyperJump Core development team 2021 - Contact : </span>
              <a href="">&nbsp;info@hyperjump.com</a>
            </p>
          </div>
        </>
      ) : (
        <div className="App">
          <div className="App-header"></div>
          <img width={200} className="cloak-logo" src={logo_black} />
          <h2 className="title">HyperJump Burning Machine</h2>
          <button onClick={() => onConnect()}>CONNECT</button>

          <div className="App-footer">
            <p style={{ fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>The HyperJump Core development team 2021 - Contact : </span>
              <a href="">&nbsp;info@hyperjump.com</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default () => (
  <UseWalletProvider
    chainId={56}
    connectors={{
      // This is how connectors get configured
      metamask: { dAppId: "my-dapp-id-123-xyz" },
    }}
  >
    <App />
  </UseWalletProvider>
);
