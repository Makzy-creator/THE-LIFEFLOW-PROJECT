import React, { useState } from 'react';
import { donateBlood, mintDonationNFT, storeDonationData } from './algorandService';

export default function DonateBloodForm() {
  const [status, setStatus] = useState('');

  // For demo: Replace with real wallet integration
  const sender = '<ALGOD_ADDRESS>';
  const senderSK = new Uint8Array([]); // Uint8Array of secret key
  const recipient = '<RECIPIENT_ADDRESS>';

  async function handleDonate(e) {
    e.preventDefault();
    setStatus('Sending donation transaction...');
    try {
      // Store donation data on-chain (invisible to user)
      const donationData = {
        bloodType: 'O+',
        amount: 1,
        location: 'Lagos',
        timestamp: Date.now()
      };
      await storeDonationData({ sender, senderSK, data: donationData });
      // Send payment (optional)
      await donateBlood({ sender, senderSK, recipient, note: 'Blood donation' });
      // Mint NFT certificate
      await mintDonationNFT({ creator: sender, creatorSK: senderSK, metadata: { url: '', hash: '' } });
      setStatus('Donation complete! NFT certificate minted.');
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  }

  return (
    <form onSubmit={handleDonate}>
      <button type="submit">Donate Blood</button>
      <div>{status}</div>
    </form>
  );
}
