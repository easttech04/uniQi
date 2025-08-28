import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerificationPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid verification link.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify/${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Verification failed.');
        }

        setMessage(data.msg);
      } catch (error) {
        setMessage(error.message);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
      <Link to="/login" style={{ textDecoration: 'underline' }}>Go to Login Page</Link>
    </div>
  );
};

export default VerificationPage;
