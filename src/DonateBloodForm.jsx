import React, { useState } from 'react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from 'algosdk';
import { algodClient } from './algorandService';

export default function DonateBloodForm() {
  const [status, setStatus] = useState('');
  const [account, setAccount] = useState(null);
  const [txUrl, setTxUrl] = useState('');
  const myAlgoWallet = new MyAlgoConnect();

  async function connectWallet() {
    try {
      const accounts = await myAlgoWallet.connect();
      setAccount(accounts[0].address);
      setStatus('Wallet connected: ' + accounts[0].address);
    } catch (err) {
      setStatus('Wallet connection failed');
    }
  }

  async function handleDonate(e) {
    e.preventDefault();
    if (!account) {
      setStatus('Please connect your wallet first.');
      return;
    }
    setStatus('Preparing transaction...');
    try {
      // Prepare donation data
      const donationData = {
        bloodType: 'O+',
        amount: 1,
        location: 'Lagos',
        timestamp: Date.now()
      };
      // Store donation data in Algorand note field (self-payment)
      const params = await algodClient.getTransactionParams().do();
      const note = new Uint8Array(Buffer.from(JSON.stringify(donationData)));
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: account,
        to: account, // self, just to store data
        amount: 0,
        note,
        suggestedParams: params
      });
      const txn_b64 = algosdk.encodeUnsignedTransaction(txn).toString('base64');
      // Ask user to sign with MyAlgo
      const signed = await myAlgoWallet.signTransaction(txn.toByte());
      setStatus('Sending transaction to Algorand...');
      const { txId } = await algodClient.sendRawTransaction(signed.blob).do();
      setTxUrl('https://testnet.algoexplorer.io/tx/' + txId);
      setStatus('Donation recorded on Algorand!');
    } catch (err) {
      setStatus('Error: ' + (err.message || err));
    }
  }

  return (
    <div>
      {!account && <button type="button" onClick={connectWallet}>Connect MyAlgo Wallet</button>}
      {account && (
        <form onSubmit={handleDonate}>
          <button type="submit">Donate Blood</button>
        </form>
      )}
      <div>{status}</div>
      {txUrl && <a href={txUrl} target="_blank" rel="noopener noreferrer">View on AlgoExplorer</a>}
    </div>
  );
}
