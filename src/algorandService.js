import algosdk from 'algosdk';

// Algorand client setup (TestNet)
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';
export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Helper: Send a donation transaction (abstracted for frontend use)
export async function donateBlood({ sender, senderSK, recipient, note }) {
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: sender,
    to: recipient,
    amount: 1000, // microAlgos, adjust as needed
    note: new Uint8Array(Buffer.from(note)),
    suggestedParams: params
  });
  const signedTxn = txn.signTxn(senderSK);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  return txId;
}

// Helper: Mint NFT (ASA) for donation (abstracted)
export async function mintDonationNFT({ creator, creatorSK, metadata }) {
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: creator,
    total: 1,
    decimals: 0,
    assetName: 'BloodDonationNFT',
    unitName: 'BLOODNFT',
    assetURL: metadata.url || '',
    assetMetadataHash: metadata.hash || undefined,
    suggestedParams: params
  });
  const signedTxn = txn.signTxn(creatorSK);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  return txId;
}

// Helper: Store donation data in Algorand note field (abstracted)
export async function storeDonationData({ sender, senderSK, data }) {
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: sender,
    to: sender, // self, just to store data
    amount: 0,
    note: new Uint8Array(Buffer.from(JSON.stringify(data))),
    suggestedParams: params
  });
  const signedTxn = txn.signTxn(senderSK);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  return txId;
}
