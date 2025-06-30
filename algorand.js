import algosdk from 'algosdk';

// Example: Connect to Algorand TestNet
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';

export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Example: Create a new Algorand account
export function createAccount() {
  const account = algosdk.generateAccount();
  return {
    address: account.addr,
    mnemonic: algosdk.secretKeyToMnemonic(account.sk)
  };
}

// Example: Send a payment transaction
export async function sendPayment(sender, senderSK, receiver, amount, note = '') {
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: sender,
    to: receiver,
    amount: amount,
    note: new Uint8Array(Buffer.from(note)),
    suggestedParams: params
  });
  const signedTxn = txn.signTxn(senderSK);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  return txId;
}
