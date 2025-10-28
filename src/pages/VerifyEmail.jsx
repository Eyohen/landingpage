// VerifyEmail.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';
import { URL } from '../url';
import Navbar from '../components/Navbar';

const VerifyEmail = () => {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Get token from URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (!token) {
          setStatus('error');
          setMessage('Verification token is missing. Please check your email link.');
          return;
        }

        // Call the verification endpoint
        const response = await axios.get(`${URL}/api/merchants/verify-email?token=${token}`);
        
        // Handle success response
        setStatus('success');
        setMessage('Your email has been successfully verified! Redirecting to login...');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
        
        // Handle error response
        setStatus('error');
        if (error.response && error.response.data && error.response.data.msg) {
          setMessage(error.response.data.msg);
        } else {
          setMessage('Failed to verify your email. The token may be invalid or expired.');
        }
      }
    };

    verifyToken();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-black mb-2">Email Verification</h1>
            <p className="text-gray-600">Verifying your email address</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            {status === 'loading' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-semibold text-black mb-2">Verifying your email</h2>
                <p className="text-gray-600">Please wait while we verify your email address...</p>
              </div>
            )}
            
            {status === 'success' && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiCheck className="text-green-500 text-3xl" />
                </div>
                <h2 className="text-xl font-semibold text-black mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            )}
            
            {status === 'error' && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <FiAlertTriangle className="text-red-500 text-3xl" />
                </div>
                <h2 className="text-xl font-semibold text-black mb-2">Verification Failed</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="space-y-4 w-full">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="w-full bg-gray-100 text-black py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors"
                  >
                    Register Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <FiMail className="text-black text-xl mr-2" />
              <span className="font-bold text-lg text-black">PaperSignal</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VerifyEmail;