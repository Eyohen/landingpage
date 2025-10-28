//pages/Register.jsx
// import React, { useState } from 'react';
// import { 
//   SparklesIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   ChevronRightIcon,
//   CheckCircleIcon,
//   ShieldCheckIcon,
//   UserIcon,
//   BuildingOfficeIcon
// } from '@heroicons/react/24/solid';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { Link } from 'react-router-dom';
// import { URL } from '../url'
// import axios from 'axios';

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [accountType, setAccountType] = useState('individual');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     companyName: '',
//     companySize: '',
//     agreeToTerms: false,
//     subscribeToUpdates: true
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Registration attempt:', { ...formData, accountType });
//   };

//   const socialProviders = [
//     { name: 'Google', icon: '🔗' },
//     { name: 'GitHub', icon: '⚡' },
//     { name: 'Microsoft', icon: '🏢' }
//   ];

//   const companySizes = [
//     '1-10 employees',
//     '11-50 employees', 
//     '51-200 employees',
//     '201-1000 employees',
//     '1000+ employees'
//   ];

//   const passwordRequirements = [
//     { text: 'At least 8 characters', met: formData.password.length >= 8 },
//     { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
//     { text: 'Contains number', met: /\d/.test(formData.password) },
//     { text: 'Passwords match', met: formData.password === formData.confirmPassword && formData.confirmPassword !== '' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#c4e6ff]/20 via-white to-[#c4e6ff]/10" style={{fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif'}}>
//       <div className="flex">
//         {/* Left Side - Branding */}
//         <div className="hidden lg:flex lg:w-2/5 bg-[#27214e] relative overflow-hidden">
//           <div className="flex items-center justify-center w-full px-12">
//             <div className="text-center max-w-lg">
//               <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
//                 <SparklesIcon className="w-12 h-12 text-white" />
//               </div>
              
//               <h2 className="text-3xl font-bold text-white mb-6">
//                 Start building today
//               </h2>
              
//               <p className="text-[#c4e6ff] text-lg leading-relaxed mb-8">
//                 Join thousands of developers and companies using Papersignal to power their customer communications.
//               </p>

//               <div className="grid grid-cols-1 gap-4">
//                 <div className="bg-white/10 rounded-lg p-4 text-left">
//                   <h3 className="text-white font-semibold mb-2">Free to start</h3>
//                   <p className="text-[#c4e6ff] text-sm">Get started with our generous free tier, no credit card required.</p>
//                 </div>
//                 <div className="bg-white/10 rounded-lg p-4 text-left">
//                   <h3 className="text-white font-semibold mb-2">Enterprise ready</h3>
//                   <p className="text-[#c4e6ff] text-sm">Scale to millions of messages with enterprise-grade infrastructure.</p>
//                 </div>
//                 <div className="bg-white/10 rounded-lg p-4 text-left">
//                   <h3 className="text-white font-semibold mb-2">Developer first</h3>
//                   <p className="text-[#c4e6ff] text-sm">Built by developers, for developers with comprehensive APIs and docs.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Background decoration */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
//         </div>

//         {/* Right Side - Registration Form */}
//         <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
//           <div className="max-w-md w-full">
//             {/* Back to Home */}
//             <div className="mb-8">
//               <button className="flex items-center text-gray-600 hover:text-[#27214e] transition-colors">
//                 <ArrowLeftIcon className="w-4 h-4 mr-2" />
//                 <span className="text-sm font-medium">Back to Home</span>
//               </button>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="flex items-center justify-center space-x-3 mb-6 lg:hidden">
//                 <div className="w-10 h-10 bg-[#27214e] rounded-xl flex items-center justify-center">
//                   <SparklesIcon className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold text-[#27214e]">Papersignal</span>
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
//               <p className="text-gray-600">Start building better customer experiences today</p>
//             </div>

//             {/* Account Type Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-900 mb-3">Account type</label>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   onClick={() => setAccountType('individual')}
//                   className={`flex items-center p-4 border-2 rounded-lg transition-all ${
//                     accountType === 'individual' 
//                       ? 'border-[#27214e] bg-[#c4e6ff]/10' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <UserIcon className="w-5 h-5 mr-3 text-[#27214e]" />
//                   <div className="text-left">
//                     <div className="font-semibold text-gray-900">Individual</div>
//                     <div className="text-xs text-gray-600">Personal projects</div>
//                   </div>
//                 </button>
//                 <button
//                   onClick={() => setAccountType('business')}
//                   className={`flex items-center p-4 border-2 rounded-lg transition-all ${
//                     accountType === 'business' 
//                       ? 'border-[#27214e] bg-[#c4e6ff]/10' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <BuildingOfficeIcon className="w-5 h-5 mr-3 text-[#27214e]" />
//                   <div className="text-left">
//                     <div className="font-semibold text-gray-900">Business</div>
//                     <div className="text-xs text-gray-600">Team & company</div>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Social Registration Options */}
//             <div className="grid grid-cols-3 gap-3 mb-6">
//               {socialProviders.map((provider, index) => (
//                 <button
//                   key={index}
//                   className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all duration-200"
//                 >
//                   <span className="text-lg mr-2">{provider.icon}</span>
//                   <span className="text-sm font-medium text-gray-700">{provider.name}</span>
//                 </button>
//               ))}
//             </div>

//             <div className="relative mb-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500 font-medium">or register with email</span>
//               </div>
//             </div>

//             {/* Registration Form */}
//             <div className="space-y-5">
//               {/* Name Fields */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
//                     First name
//                   </label>
//                   <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     required
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
//                     placeholder="John"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
//                     Last name
//                   </label>
//                   <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     required
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
//                     placeholder="Doe"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
//                   Work email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
//                   placeholder="john@company.com"
//                 />
//               </div>

//               {/* Company Fields - Show only for business accounts */}
//               {accountType === 'business' && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
//                       Company name
//                     </label>
//                     <input
//                       id="companyName"
//                       name="companyName"
//                       type="text"
//                       value={formData.companyName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
//                       placeholder="Acme Inc"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="companySize" className="block text-sm font-semibold text-gray-900 mb-2">
//                       Company size
//                     </label>
//                     <select
//                       id="companySize"
//                       name="companySize"
//                       value={formData.companySize}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
//                     >
//                       <option value="">Select size</option>
//                       {companySizes.map((size, index) => (
//                         <option key={index} value={size}>{size}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
//                     placeholder="Create a secure password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeSlashIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
//                   Confirm password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeSlashIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Password Requirements */}
//               {formData.password && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm font-medium text-gray-900 mb-2">Password requirements:</p>
//                   <div className="space-y-1">
//                     {passwordRequirements.map((req, index) => (
//                       <div key={index} className="flex items-center text-sm">
//                         <CheckCircleIcon className={`w-4 h-4 mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
//                         <span className={req.met ? 'text-green-700' : 'text-gray-600'}>{req.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Terms and Privacy */}
//               <div className="space-y-3">
//                 <div className="flex items-start">
//                   <input
//                     id="agreeToTerms"
//                     name="agreeToTerms"
//                     type="checkbox"
//                     required
//                     checked={formData.agreeToTerms}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-[#27214e] focus:ring-[#27214e] border-gray-300 rounded mt-0.5"
//                   />
//                   <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-900">
//                     I agree to the{' '}
//                     <a href="#" className="font-medium text-[#27214e] hover:text-[#1a1735]">Terms of Service</a>
//                     {' '}and{' '}
//                     <a href="#" className="font-medium text-[#27214e] hover:text-[#1a1735]">Privacy Policy</a>
//                   </label>
//                 </div>

//                 <div className="flex items-start">
//                   <input
//                     id="subscribeToUpdates"
//                     name="subscribeToUpdates"
//                     type="checkbox"
//                     checked={formData.subscribeToUpdates}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-[#27214e] focus:ring-[#27214e] border-gray-300 rounded mt-0.5"
//                   />
//                   <label htmlFor="subscribeToUpdates" className="ml-3 text-sm text-gray-900">
//                     Send me product updates and developer news
//                   </label>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={!formData.agreeToTerms}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#27214e] hover:bg-[#1a1735] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27214e] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Create account
//                 <ChevronRightIcon className="w-4 h-4 ml-2" />
//               </button>
//             </div>

//             {/* Sign In Link */}
//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-semibold text-[#27214e] hover:text-[#1a1735] transition-colors">
//                   Sign in
//                 </Link>
//               </p>
//             </div>

//             {/* Security Notice */}
//             <div className="mt-6 bg-[#c4e6ff]/20 rounded-lg p-4 border border-[#c4e6ff]/50">
//               <div className="flex items-start">
//                 <ShieldCheckIcon className="w-5 h-5 text-[#27214e] mr-2 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm text-gray-700 font-medium mb-1">Your data is secure</p>
//                   <p className="text-xs text-gray-600">We use enterprise-grade encryption and never share your personal information.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { 
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../url';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState('individual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    country: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${URL}/api/merchant/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        businessName: accountType === 'business' ? formData.businessName : `${formData.firstName} ${formData.lastName}`,
        country: formData.country,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.merchant) {
        alert('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
    { text: 'Passwords match', met: formData.password === formData.confirmPassword && formData.confirmPassword !== '' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c4e6ff]/20 via-white to-[#c4e6ff]/10" style={{fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif'}}>
      <div className="flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-2/5 bg-[#27214e] relative overflow-hidden">
          <div className="flex items-center justify-center w-full px-12">
            <div className="text-center max-w-lg">
              <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <SparklesIcon className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6">
                Start building today
              </h2>
              
              <p className="text-[#c4e6ff] text-lg leading-relaxed mb-8">
                Join thousands of developers and companies using Papersignal to power their customer communications.
              </p>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-left">
                  <h3 className="text-white font-semibold mb-2">Free to start</h3>
                  <p className="text-[#c4e6ff] text-sm">Get started with our generous free tier, no credit card required.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-left">
                  <h3 className="text-white font-semibold mb-2">Enterprise ready</h3>
                  <p className="text-[#c4e6ff] text-sm">Scale to millions of messages with enterprise-grade infrastructure.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-left">
                  <h3 className="text-white font-semibold mb-2">Developer first</h3>
                  <p className="text-[#c4e6ff] text-sm">Built by developers, for developers with comprehensive APIs and docs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full">
            <div className="mb-8">
              <Link to="/" className="flex items-center text-gray-600 hover:text-[#27214e] transition-colors">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-6 lg:hidden">
                <div className="w-10 h-10 bg-[#27214e] rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#27214e]">Papersignal</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600">Start building better customer experiences today</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Account Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Account type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAccountType('individual')}
                  className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                    accountType === 'individual' 
                      ? 'border-[#27214e] bg-[#c4e6ff]/10' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <UserIcon className="w-5 h-5 mr-3 text-[#27214e]" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Individual</div>
                    <div className="text-xs text-gray-600">Personal projects</div>
                  </div>
                </button>
                <button
                  onClick={() => setAccountType('business')}
                  className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                    accountType === 'business' 
                      ? 'border-[#27214e] bg-[#c4e6ff]/10' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <BuildingOfficeIcon className="w-5 h-5 mr-3 text-[#27214e]" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Business</div>
                    <div className="text-xs text-gray-600">Team & company</div>
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              {accountType === 'business' && (
                <div>
                  <label htmlFor="businessName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Business name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required={accountType === 'business'}
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors text-sm"
                    placeholder="Acme Inc"
                  />
                </div>
              )}

              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
                  placeholder="United States"
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
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27214e] focus:border-[#27214e] transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {formData.password && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Password requirements:</p>
                  <div className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircleIcon className={`w-4 h-4 mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={req.met ? 'text-green-700' : 'text-gray-600'}>{req.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#27214e] focus:ring-[#27214e] border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-[#27214e] hover:text-[#1a1735]">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="font-medium text-[#27214e] hover:text-[#1a1735]">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#27214e] hover:bg-[#1a1735] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27214e] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
                {!loading && <ChevronRightIcon className="w-4 h-4 ml-2" />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#27214e] hover:text-[#1a1735] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 bg-[#c4e6ff]/20 rounded-lg p-4 border border-[#c4e6ff]/50">
              <div className="flex items-start">
                <ShieldCheckIcon className="w-5 h-5 text-[#27214e] mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-1">Your data is secure</p>
                  <p className="text-xs text-gray-600">We use enterprise-grade encryption and never share your personal information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;