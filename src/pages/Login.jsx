//pages/Login.jsx
// import React, { useState } from 'react';
// import { 
//   SparklesIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   ChevronRightIcon,
//   ShieldCheckIcon
// } from '@heroicons/react/24/solid';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { Link, useNavigate } from 'react-router-dom';
// import { URL } from '../url'
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate()
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Login attempt:', { email, password, rememberMe });
//   };

//   const socialProviders = [
//     { name: 'Google', icon: '🔗', color: 'border-gray-300 hover:border-gray-400' },
//     { name: 'GitHub', icon: '⚡', color: 'border-gray-300 hover:border-gray-400' },
//     { name: 'Microsoft', icon: '🏢', color: 'border-gray-300 hover:border-gray-400' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#c4e6ff]/20 via-white to-[#c4e6ff]/10 flex" style={{fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif'}}>
//       {/* Left Side - Login Form */}
//       <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full">
//           {/* Back to Home */}
//           <div className="mb-8">
//             <button className="flex items-center text-gray-600 hover:text-[#27214e] transition-colors">
//               <ArrowLeftIcon className="w-4 h-4 mr-2" />
//               <span className="text-sm font-medium">Back to Home</span>
//             </button>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center space-x-3 mb-6">
//               <div className="w-12 h-12 bg-[#27214e] rounded-xl flex items-center justify-center">
//                 <SparklesIcon className="w-7 h-7 text-white" />
//               </div>
//               <span className="text-3xl font-bold text-[#27214e]">Papersignal</span>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
//             <p className="text-gray-600">Sign in to your account to continue building</p>
//           </div>

//           {/* Social Login Options */}
//           <div className="grid grid-cols-3 gap-3 mb-6">
//             {socialProviders.map((provider, index) => (
//               <button
//                 key={index}
//                 className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-all duration-200 ${provider.color} hover:shadow-sm`}
//               >
//                 <span className="text-lg mr-2">{provider.icon}</span>
//                 <span className="text-sm font-medium text-gray-700">{provider.name}</span>
//               </button>
//             ))}
//           </div>

//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
//             </div>
//           </div>

//           {/* Login Form */}
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="h-4 w-4 text-[#27214e] focus:ring-[#27214e] border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-semibold text-[#27214e] hover:text-[#1a1735] transition-colors">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             <button
//               onClick={()=> navigate('/dashboard')}
//               className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#27214e] hover:bg-[#1a1735] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27214e] font-semibold transition-all duration-200"
//             >
//               Sign in to your account
//               <ChevronRightIcon className="w-4 h-4 ml-2" />
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               Don't have an account ?{' '}
//               <Link to="/signup" className="font-semibold text-[#27214e] hover:text-[#1a1735] transition-colors">
//                 Sign up for free
//               </Link>
//             </p>
//           </div>

//           {/* Security Notice */}
//           <div className="mt-8 bg-[#c4e6ff]/20 rounded-lg p-4 border border-[#c4e6ff]/50">
//             <div className="flex items-center">
//               <ShieldCheckIcon className="w-5 h-5 text-[#27214e] mr-2 flex-shrink-0" />
//               <p className="text-sm text-gray-700">
//                 Your data is protected with enterprise-grade security and encryption.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Illustration/Branding */}
//       <div className="hidden lg:flex lg:flex-1 bg-[#27214e] relative overflow-hidden">
//         <div className="flex items-center justify-center w-full px-12">
//           <div className="text-center max-w-lg">
//             <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
//               <SparklesIcon className="w-12 h-12 text-white" />
//             </div>
            
//             <h2 className="text-3xl font-bold text-white mb-6">
//               Build better customer experiences
//             </h2>
            
//             <p className="text-[#c4e6ff] text-lg leading-relaxed mb-8">
//               Join thousands of developers using Papersignal to create seamless customer communication workflows.
//             </p>

//             <div className="space-y-4">
//               <div className="flex items-center text-white">
//                 <div className="w-2 h-2 bg-[#c4e6ff] rounded-full mr-3"></div>
//                 <span>99.9% uptime SLA</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <div className="w-2 h-2 bg-[#c4e6ff] rounded-full mr-3"></div>
//                 <span>Enterprise-grade security</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <div className="w-2 h-2 bg-[#c4e6ff] rounded-full mr-3"></div>
//                 <span>24/7 developer support</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Background decoration */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { 
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../url';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/api/merchant/login`, {
        email,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.data?.verified === false) {
        setError('Please verify your email before logging in. Check your inbox for the verification link.');
      } else {
        setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const socialProviders = [
    { name: 'Google', icon: '🔗', color: 'border-gray-300 hover:border-gray-400' },
    { name: 'GitHub', icon: '⚡', color: 'border-gray-300 hover:border-gray-400' },
    { name: 'Microsoft', icon: '🏢', color: 'border-gray-300 hover:border-gray-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c4e6ff]/20 via-white to-[#c4e6ff]/10 flex" style={{fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif'}}>
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-[#27214e] transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#27214e] rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-[#27214e]">Papersignal</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue building</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mb-6">
            {socialProviders.map((provider, index) => (
              <button
                key={index}
                className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-all duration-200 ${provider.color} hover:shadow-sm`}
              >
                <span className="text-lg mr-2">{provider.icon}</span>
                <span className="text-sm font-medium text-gray-700">{provider.name}</span>
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#27214e] focus:ring-[#27214e] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-[#27214e] hover:text-[#1a1735] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#27214e] hover:bg-[#1a1735] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27214e] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in to your account'}
              {!loading && <ChevronRightIcon className="w-4 h-4 ml-2" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-[#27214e] hover:text-[#1a1735] transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          <div className="mt-8 bg-[#c4e6ff]/20 rounded-lg p-4 border border-[#c4e6ff]/50">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-[#27214e] mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Your data is protected with enterprise-grade security and encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration/Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-[#27214e] relative overflow-hidden">
        <div className="flex items-center justify-center w-full px-12">
          <div className="text-center max-w-lg">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-6">
              Build better customer experiences
            </h2>
            
            <p className="text-[#c4e6ff] text-lg leading-relaxed mb-8">
              Join thousands of developers using Papersignal to create seamless customer communication workflows.
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-white">
                <div className="w-2 h-2 bg-[#c4e6ff] rounded-full mr-3"></div>
                <span>99.9% uptime SLA</span>
              </div>
              <div className="flex items-center text-white">
                <div className="w-2 h-2 bg-[#c4e6ff] rounded-full mr-3"></div>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center text-white">
                <div className="w-2 h-2 bg-[#c4e6ff] rounded-full mr-3"></div>
                <span>24/7 developer support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      </div>
    </div>
  );
};

export default Login;