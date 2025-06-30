# LIFEFLOW - Blockchain Blood Donation Platform

**Your one pint of blood can save 5 Lives**

A revolutionary blood donation platform built on Algorand with smart contracts, NFT certificates, and real-time AI assistance.

## 🚀 Hackathon Features

### ✅ Algorand Smart Contracts
- **Blood Donation Backend**: Immutable donation records with verification (Algorand Layer 1/ASC1)
- **NFT Certificate System**: Algorand Standard Assets (ASA) for donation certificates
- **Donor Registration**: On-chain donor profiles and eligibility tracking (Algorand accounts)
- **Request Management**: Transparent blood request system

### ✅ Real Wallet Integration
- **Algorand Wallet**: Secure authentication with Algorand
- **Account-based**: Unique Algorand addresses for all users
- **Auto-connect**: Seamless wallet integration experience

### ✅ NFT Certificates
- **Automatic Minting**: ASA (NFT) certificates for every verified donation
- **Rich Metadata**: Blood type, amount, location, timestamp
- **Downloadable**: Generate certificate images
- **Shareable**: Social media integration for impact sharing

### ✅ Immutable Records
- **Algorand Storage**: All donations stored on Algorand blockchain for transparency
- **Verification System**: Medical professional verification workflow
- **Audit Trail**: Complete transaction history
- **Transparency**: Public verification of donation records

## 🏗️ Architecture

```
Frontend (React/TypeScript)
    ↓
Algorand Wallet (Authentication & Communication)
    ↓
Algorand Smart Contracts (ASC1/TEAL/PyTeal)
    ├── Blood Donation Backend
    └── NFT Certificate System
```

## 🛠️ Setup & Deployment

### Prerequisites
- Node.js 16+ and npm
- Algorand wallet (Pera, MyAlgo, etc.)
- Python 3.8+ (for PyTeal smart contracts)

dfx deploy
1. **Install Dependencies**
```bash
npm install
```

2. **Start Frontend**
```bash
npm run dev
```

dfx deploy --network ic
1. **Install Dependencies**
```bash
npm install
```

2. **Start Frontend**
```bash
npm run dev
```
### Local Development

1. **Install Dependencies**
```bash
npm install
npm install algosdk
```

2. **Start Frontend**
```bash
npm run dev
```
### Production Deployment

1. **Deploy Algorand Smart Contracts**
   - Use PyTeal or Reach to compile and deploy contracts to Algorand MainNet/TestNet.
   - Update contract addresses in your environment variables.

2. **Build Frontend**
```bash
npm run build
```

## 📋 Smart Contract Functions

### Blood Donation Backend (Algorand ASC1)
- `registerDonor(name, bloodType, location)` - Register new donor (Algorand account opt-in)
- `recordDonation(recipientId, bloodType, amount, location)` - Record donation (Algorand transaction/note)
- `createBloodRequest(bloodType, amount, urgency, location)` - Create request (Algorand smart contract call)
- `fulfillBloodRequest(requestId, donationId)` - Fulfill request (Algorand smart contract call)
- `getDonations()` - Get all donations (read from Algorand blockchain)
- `verifyDonation(donationId)` - Verify donation (Algorand smart contract call)

### NFT Certificate System (Algorand ASA)
- `mintDonationCertificate(request)` - Mint ASA NFT for donation
- `getTokenMetadata(tokenId)` - Get ASA NFT metadata
- `getTokensByOwner(owner)` - Get user's NFTs (Algorand address)
- `transferToken(tokenId, to)` - Transfer ASA NFT

## 🎯 Key Features

### For Donors
- ✅ Algorand wallet integration
- ✅ Automatic ASA NFT certificate minting
- ✅ Donation eligibility tracking (56-day rule)
- ✅ Impact visualization with certificates
- ✅ Shareable achievement system

### For Recipients
- ✅ Transparent request system
- ✅ Real-time donor matching
- ✅ Urgency-based prioritization
- ✅ Algorand-verified donations

### For Medical Professionals
- ✅ Donation verification system
- ✅ Immutable audit trails
- ✅ Compliance monitoring
- ✅ Multi-facility management

## 🔐 Security Features

- **Algorand Wallet**: Secure, passwordless authentication
- **Account-based Access**: Unique Algorand addresses
- **Smart Contract Validation**: Business logic enforcement (Algorand ASC1)
- **Immutable Records**: Tamper-proof donation history
- **Verification System**: Medical professional oversight

## 🌟 Demo Highlights

- **Live Blockchain**: Real transactions on Algorand
- **NFT Minting**: Automatic ASA certificate generation
- **Wallet Connection**: Seamless Algorand wallet integration
- **Smart Contracts**: PyTeal (Algorand ASC1)
- **Immutable Records**: Verifiable donation history

## 📊 Platform Statistics

Track real-time metrics:
- Total donations recorded on blockchain
- NFT certificates minted
- Active donors and recipients
- Verified medical facilities

## 🚀 Future Enhancements

- Cross-chain compatibility
- Mobile app with biometric verification
- AI-powered matching algorithms
- Global blood bank network
- Regulatory compliance automation

## 📄 License

MIT License - Built for saving lives through blockchain innovation.

---

**LIFEFLOW** - Where blockchain meets humanitarian impact. Your one pint of blood can save 5 Lives. Every donation matters, every life counts.