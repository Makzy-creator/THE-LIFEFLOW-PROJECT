import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AuthFlow from '../components/auth/AuthFlow';
import BloodDropletLogo from '../components/BloodDropletLogo';

const Login: React.FC = () => {
  const { user } = useAuth();

  // Only redirect if user is fully onboarded (has walletAddress)
  if (user && user.walletAddress) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <BloodDropletLogo size="xl" animated />
            <h1 className="text-3xl font-bold text-gradient">LIFEFLOW</h1>
          </div>
          <p className="text-gray-600">
            Your one pint of blood can save <span className="text-red-600 font-semibold">5 LIVES</span>
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AuthFlow 
            mode="login" 
            onModeChange={() => window.location.href = '/register'}
            onSuccess={() => window.location.href = '/dashboard'}
          />
          <div className="flex justify-end mt-2">
            <button
              className="text-sm text-red-600 hover:underline focus:outline-none"
              onClick={() => window.location.href = '/forgot-password'}
              type="button"
            >
              Forgot password?
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;