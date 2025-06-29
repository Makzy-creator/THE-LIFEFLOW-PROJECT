import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../config/supabase';

interface ResendVerificationProps {
  email: string;
}

const ResendVerification: React.FC<ResendVerificationProps> = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      toast.success('Verification email resent! Please check your inbox.');
      setSent(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        className="btn-outline px-4 py-2 rounded"
        onClick={handleResend}
        disabled={loading || sent}
      >
        {loading ? 'Sending...' : sent ? 'Sent!' : 'Resend Verification Email'}
      </button>
    </div>
  );
};

export default ResendVerification;
