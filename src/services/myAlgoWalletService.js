import MyAlgoConnect from '@randlabs/myalgo-connect';

export async function connectMyAlgoWallet() {
  const myAlgoWallet = new MyAlgoConnect();
  try {
    const accounts = await myAlgoWallet.connect();
    if (accounts && accounts.length > 0) {
      return accounts[0].address;
    }
    throw new Error('No Algorand accounts found');
  } catch (err) {
    throw err;
  }
}
