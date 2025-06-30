import { PeraWalletConnect} from '@perawallet/connect';

const peraWallet = new PeraWalletConnect();

export async function connectPeraWallet() {
  try {
    const accounts = await peraWallet.connect();
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    throw new Error('No Pera Wallet accounts found');
  } catch (err) {
    throw err;
  }
}
