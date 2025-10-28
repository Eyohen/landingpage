//pages/Home.jsx
import React, { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
  BoltIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logotrail from '../assets/logotrail.png'
import something from '../assets/something.png'
import container from '../assets/container.png'
import container2 from '../assets/container2.png'
import container3 from '../assets/container3.png'
import browser from '../assets/Browser.png'
const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stablecoins = [
    { symbol: 'USDT', name: 'Tether USDT', color: 'bg-green-500' },
    { symbol: 'USDC', name: 'USD Coin', color: 'bg-blue-500' },
    { symbol: 'BUSD', name: 'Binance USD', color: 'bg-yellow-500' }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', amount: '5,872.00' },
    { code: 'EUR', name: 'Euro', amount: '258.50' },
    { code: 'IDR', name: 'Indonesian Rupiah', amount: '186,500.00' }
  ];

  const additionalFeatures = [
    {
      icon: <ShieldCheckIcon className="w-12 h-12" />,
      title: "Built on Blockchain",
      description: "Our platform seamlessly integrates with all major blockchain networks, allowing you to choose the best option for each transaction."
    },
    {
      icon: <BoltIcon className="w-12 h-12" />,
      title: "Instant Settlement",
      description: "No more waiting days for payments to clear – our platform settles transactions in seconds, providing immediate confirmation and availability of funds."
    },
    {
      icon: <CodeBracketIcon className="w-12 h-12" />,
      title: "3 lines of code to integrate",
      description: "Get started in no time, integrate Coinley payment into your apps and websites with just 3 lines of codes and start receiving payments."
    }
  ];

  const stats = [
    { value: "$1,245.50", label: "Total Payments", change: "+8.5%", positive: true },
    { value: "$75.50", label: "Pending", change: "-2.3%", positive: false },
    { value: "$1,125.00", label: "Successful", change: "+10.2%", positive: true },
    { value: "$45.99", label: "Failed", change: "-15.0%", positive: false }
  ];

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Coinley
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-200 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#features" className="text-gray-200 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#company" className="text-gray-200 hover:text-blue-600 transition-colors font-medium">Company</a>
              <a href="#faq" className="text-gray-200 hover:text-blue-600 transition-colors font-medium">FAQ</a>
              <Link to="/login" className="text-gray-200 hover:text-blue-600 transition-colors font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 font-medium">
                Create Account
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-900" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
                <a href="#company" className="text-gray-700 hover:text-blue-600 font-medium">Company</a>
                <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium">FAQ</a>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium text-center">
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden  py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mx-auto">
            <p className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Accept Stablecoin
              <p className="text-white">
                Payments Anywhere
              </p>
              <p className="text-white">
                You Sell Online
              </p>
            </p>

            <p className="text-white text-xl lg:text-2xl text-gray-600 mb-3 max-w-3xl leading-relaxed">
              Expand your business reach with easy crypto checkout solution
            </p>

            <p className="text-white text-lg text-gray-500 font-semibold">
              Fast. Secure. Global.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="bg-white px-4 py-2 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                Explore Docs
              </button>
              <button className="text-white px-4 py-2 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center bg-[#7042D2]">
                Start Accepting Payments
              </button>

            </div>


          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-gray-600 mb-8 italic">
              Trusted by forward-thinking merchants across industries.
            </p>

            <img src={logotrail} />

            <p className="text-2xl font-semibold leading-relaxed mt-8">
              Coinley makes Crypto checkouts simple.
            </p>
            <p className="text-2xl font-semibold leading-relaxed">
              From online stores to custom platforms, we
            </p>
            <p className="text-2xl font-semibold leading-relaxed">
              help businesses connect with global
            </p>
            <p className="text-2xl font-semibold leading-relaxed">
              customers and get paid instantly. No
            </p>
            <p className="text-2xl font-semibold text-[#7042D2] leading-relaxed">
              monthly fees. No chargebacks. Keep more of
            </p>
            <p className="text-2xl font-semibold text-[#7042D2] leading-relaxed">
              what you earn.
            </p>


            <div className='mt-6'>
              <img src={something} />
            </div>

          </div>
        </div>
      </section>

      {/* Stablecoins Feature Section */}
      <section id="features" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <button className="bg-black rounded-full text-xl text-white mb-6 px-3">
              Features
            </button>
            <p className="text-4xl font-semibold mb-4">
              Built for <span className='text-[#7042D2]'>Merchants</span>
            </p>
            <p className="text-4xl font-semibold mb-4">
              Designed for Growth.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Connect with customers and partners worldwide through borderless payments that work across any country or currency.
            </p>
          </div>


{/* image grid section */}
          <section className='max-w-3xl mx-auto'>

            <div className='flex justify-center gap-x-4'>

              <img src={container} className='w-96' />

              <img src={container2} className='w-96' />

            </div>

            <div className='mx-auto max-w-4xl mt-3'>
              <img src={container3} className='w-full' />
            </div>

          </section>


          <div className="text-center mt-12">
            <button className="bg-black rounded-full text-xl text-white px-3">
              For Merchants
            </button>
            <p className="text-4xl font-semibold mt-2">
              Simple, yet Powerful
            </p>
            <p className="text-4xl font-semibold mt-2">
             Solutions
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
             Our platform enables seamless transactions rergardless of location.
            </p>
          </div>


</div>
</section>

          {/* Stablecoins Grid */}
          <section className='bg-gray-900 text-white py-16'>
          <div className='mt-9 max-w-3xl mx-auto'>
            <img src={browser} className=''/>


{/* even more */}
<div className='text-center mt-9'>
<button className='bg-gray-700 text-white font-normal rounded-full px-2 py-1'>Even more</button>
<p className='font-semibold text-4xl text-gray-200 mt-2'>A fully integrated payment platform </p>
<p className='font-semibold text-4xl text-gray-400 mt-2'>for moving money globally</p>
<p className='font-normal text-lg text-gray-200 mt-2'>No more waiting days for payments to clear - our platform settles transactions in seconds,</p>
<p>providing immediate confirmation and availability of funds.</p>
</div>


          </div>

          </section>
       



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gray-400 text-center max-w-4xl mx-auto leading-relaxed">
              An entirely new payment infrastructure, built with blockchain technology, to simplify global crypto transactions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">About Us</div>
                <div className="hover:text-white cursor-pointer transition-colors">Careers</div>
                <div className="hover:text-white cursor-pointer transition-colors">Press</div>
                <div className="hover:text-white cursor-pointer transition-colors">Blog</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Merchants</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Multi-Chain Access</div>
                <div className="hover:text-white cursor-pointer transition-colors">Instant Settlements</div>
                <div className="hover:text-white cursor-pointer transition-colors">Easy Integration</div>
                <div className="hover:text-white cursor-pointer transition-colors">Analytics Dashboard</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Resources</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Documentation</div>
                <div className="hover:text-white cursor-pointer transition-colors">API Reference</div>
                <div className="hover:text-white cursor-pointer transition-colors">Community Forum</div>
                <div className="hover:text-white cursor-pointer transition-colors">FAQs</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Get Started</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Pricing Plans</div>
                <div className="hover:text-white cursor-pointer transition-colors">Demo</div>
                <div className="hover:text-white cursor-pointer transition-colors">Contact Sales</div>
                <div className="hover:text-white cursor-pointer transition-colors">Contact Us</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h5 className="font-bold mb-3 text-sm">Disclaimer for UK residents:</h5>
              <p className="text-gray-400 text-sm leading-relaxed">
                This website helps users process crypto transactions using Coinley's middleware. Coinley does not endorse or recommend any cryptocurrency trading activity. Users should not regard this website or its contents as a recommendation, invitation, or inducement to engage in cryptoasset trading. Coinley is a non-custodial solution; hence, users retain full control of their wallets and cryptos at all times.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Coinley
              </span>
            </div>
            <p className="text-gray-400 text-center mb-4 md:mb-0">
              © 2025 All Rights Reserved
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Condition</a>
              <a href="#" className="hover:text-white transition-colors">Security Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
