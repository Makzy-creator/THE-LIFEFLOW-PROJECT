import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { connectMyAlgoWallet } from '../../services/myAlgoWalletService';
import { 
  WalletIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import MultiChainService from '../../services/multiChainService';
import toast from 'react-hot-toast';

interface WalletConnectorProps {
  onConnectionChange?: (connected: boolean, address?: string) => void;
  showBalance?: boolean;
  compact?: boolean;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ 
  onConnectionChange, 
  showBalance = true,
  compact = false 
}) => {
  const { user, updateProfile } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    onConnectionChange?.(isConnected, walletAddress || undefined);
    if (isConnected && walletAddress && user && user.walletAddress !== walletAddress) {
      updateProfile({ walletAddress });
    }
  }, [isConnected, walletAddress, onConnectionChange, user, updateProfile]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const address = await connectMyAlgoWallet();
      setWalletAddress(address);
      setIsConnected(true);
      toast.success('Algorand wallet connected!');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast.error('Failed to connect Algorand wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (compact && isConnected && walletAddress) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-700">{formatAddress(walletAddress)}</span>
        <button
          onClick={handleDisconnect}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (isConnected && walletAddress) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Algorand Wallet Connected</p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-green-700">{formatAddress(walletAddress)}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Algorand
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-green-700 hover:text-green-900 font-medium"
            >
              Details
            </button>
            <button
              onClick={handleDisconnect}
              className="text-sm text-green-700 hover:text-green-900 font-medium"
            >
              Disconnect
            </button>
          </div>
        </div>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-green-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-medium text-green-900 mb-1">Network Status</p>
                <p className="text-green-700">✅ Connected to Algorand TestNet</p>
                <p className="text-green-700">✅ Blockchain features enabled</p>
              </div>
              <div>
                <p className="font-medium text-green-900 mb-1">Wallet Info</p>
                <p className="text-green-700">Address: {formatAddress(walletAddress)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
    >
      <div className="flex items-start space-x-3">
        <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            Connect your wallet to access blockchain features, record donations, 
            and receive NFT certificates.
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-xs text-blue-700">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              <span>Secure blockchain transactions</span>
            </div>
            <div className="flex items-center text-xs text-blue-700">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              <span>Automatic NFT certificate minting</span>
            </div>
            <div className="flex items-center text-xs text-blue-700">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
            <span>Algorand blockchain support</span>
            </div>
            <div className="flex items-center text-xs text-blue-700">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              <span>Optimized gas fees</span>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <WalletIcon className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletConnector;