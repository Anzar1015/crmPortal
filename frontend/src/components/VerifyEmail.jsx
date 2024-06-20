import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get('status');

    if (status === 'success') {
      toast.success('Email verified successfully!');
      navigate('/login');
    } else if (status === 'error') {
      toast.error('Error verifying email.');
      navigate('/signup');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
        <h1 className="text-2xl mb-4">Verifying email...</h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
