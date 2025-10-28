// Documentation.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FiMail, FiCopy, FiCheck, FiSearch, FiArrowRight } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copied, setCopied] = useState(false);
  
  // Copy API key to clipboard
  const copyApiKey = () => {
    navigator.clipboard.writeText('pk_test_PaperSignal123456789DEMO');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Documentation Header */}
      <section className="pt-32 pb-10 px-4 md:px-0 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Documentation</h1>
              <p className="text-gray-600">
                Learn how to integrate and use PaperSignal's powerful email API
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search docs..."
                  className="w-64 py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="hidden md:block ml-4 pl-4 border-l border-gray-300">
                <a href="https://github.com/papersignal" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">
                  <BsGithub className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Documentation Content */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-150px)] lg:pr-6 pb-10">
              <div className="mb-6">
                <Link to="/signup" className="w-full bg-black text-white rounded-md py-2 px-4 flex items-center justify-center font-medium hover:bg-gray-800 transition-colors">
                  <span>Get API Key</span>
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                  Getting Started
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#getting-started"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'getting-started'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('getting-started')}
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#installation"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'installation'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('installation')}
                    >
                      Installation
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#authentication"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'authentication'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('authentication')}
                    >
                      Authentication
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#sending-email"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'sending-email'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('sending-email')}
                    >
                      Sending Email
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                  Core Features
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#templates"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'templates'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('templates')}
                    >
                      Templates
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#tracking"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'tracking'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('tracking')}
                    >
                      Tracking & Analytics
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#webhooks"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'webhooks'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('webhooks')}
                    >
                      Webhooks
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                  API Reference
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#endpoints"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'endpoints'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('endpoints')}
                    >
                      Endpoints
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#errors"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'errors'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('errors')}
                    >
                      Error Handling
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#rate-limits"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        activeSection === 'rate-limits'
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('rate-limits')}
                    >
                      Rate Limits
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="mt-10 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="font-medium text-black mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Can't find what you're looking for?
                </p>
                <Link to="/contact" className="text-black font-medium hover:underline text-sm flex items-center">
                  Contact Support
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main Documentation Content */}
          <div className="lg:w-3/4">
            <div className="prose prose-lg max-w-none">
              {/* Getting Started Section */}
              <section id="getting-started" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Getting Started with PaperSignal</h2>
                <p className="text-gray-700 mb-4">
                  PaperSignal is a powerful email API that makes it easy to send transactional and marketing emails with high deliverability. This guide will help you integrate our API into your application.
                </p>
                
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-black mb-4">Quick Start</h3>
                  <ol className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <div>
                        <strong>Sign up</strong> for a PaperSignal account and get your API key
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <div>
                        <strong>Install</strong> our SDK for your preferred programming language
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <div>
                        <strong>Initialize</strong> the client with your API key
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                      <div>
                        <strong>Send</strong> your first email using our simple API
                      </div>
                    </li>
                  </ol>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Features Overview</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-semibold text-black mb-2">Transactional Emails</h4>
                    <p className="text-gray-600 text-sm">Send order confirmations, welcome emails, password resets, and more.</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-semibold text-black mb-2">Marketing Campaigns</h4>
                    <p className="text-gray-600 text-sm">Send newsletters, announcements, and promotional emails at scale.</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-semibold text-black mb-2">Email Templates</h4>
                    <p className="text-gray-600 text-sm">Create reusable templates with dynamic content variables.</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-semibold text-black mb-2">Advanced Analytics</h4>
                    <p className="text-gray-600 text-sm">Track opens, clicks, bounces, and more with detailed reports.</p>
                  </div>
                </div>
              </section>
              
              {/* Installation Section */}
              <section id="installation" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Installation</h2>
                <p className="text-gray-700 mb-4">
                  You can integrate PaperSignal using our SDK libraries available for various programming languages. Choose your preferred language below.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-4">JavaScript / Node.js</h3>
                  <div className="relative bg-gray-900 rounded-md p-4 mb-4">
                    <pre className="text-gray-100 text-sm overflow-x-auto">
                      <code>npm install @papersignal/sdk</code>
                    </pre>
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
                      aria-label="Copy to clipboard"
                    >
                      <FiCopy className="text-sm" />
                    </button>
                  </div>
                  
                  <div className="relative bg-gray-900 rounded-md p-4">
                    <pre className="text-gray-100 text-sm overflow-x-auto">
                      <code>{`// Initialize the client
import { PaperSignal } from '@papersignal/sdk';

// Create a client instance with your API key
const client = new PaperSignal('YOUR_API_KEY');`}</code>
                    </pre>
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
                      aria-label="Copy to clipboard"
                    >
                      <FiCopy className="text-sm" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-4">Python</h3>
                  <div className="relative bg-gray-900 rounded-md p-4 mb-4">
                    <pre className="text-gray-100 text-sm overflow-x-auto">
                      <code>pip install papersignal</code>
                    </pre>
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
                      aria-label="Copy to clipboard"
                    >
                      <FiCopy className="text-sm" />
                    </button>
                  </div>
                  
                  <div className="relative bg-gray-900 rounded-md p-4">
                    <pre className="text-gray-100 text-sm overflow-x-auto">
                      <code>{`# Initialize the client
from papersignal import PaperSignal

# Create a client instance with your API key
client = PaperSignal('YOUR_API_KEY')`}</code>
                    </pre>
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
                      aria-label="Copy to clipboard"
                    >
                      <FiCopy className="text-sm" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-4">PHP</h3>
                  <div className="relative bg-gray-900 rounded-md p-4 mb-4">
                    <pre className="text-gray-100 text-sm overflow-x-auto">
                      <code>composer require papersignal/papersignal-php</code>
                    </pre>
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
                      aria-label="Copy to clipboard"
                    >
                      <FiCopy className="text-sm" />
                    </button>
                  </div>
                  
                  <div className="relative bg-gray-900 rounded-md p-4">
                    <pre className="text-gray-100 text-sm overflow-x-auto">
                      <code>{`<?php
// Initialize the client
require 'vendor/autoload.php';

use PaperSignal\\PaperSignal;

// Create a client instance with your API key
$client = new PaperSignal('YOUR_API_KEY');`}</code>
                    </pre>
                    <button 
                      className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
                      aria-label="Copy to clipboard"
                    >
                      <FiCopy className="text-sm" />
                    </button>
                  </div>
                </div>
              </section>
              
              {/* Authentication Section */}
              <section id="authentication" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Authentication</h2>
                <p className="text-gray-700 mb-4">
                  All requests to the PaperSignal API require authentication using your API key. You can find your API key in the dashboard.
                </p>
                
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold text-black">Test API Key</h4>
                      <p className="text-sm text-gray-600">Use for development and testing</p>
                    </div>
                    <div className="relative">
                      <div className="flex items-center bg-gray-100 rounded px-3 py-1">
                        <code className="text-sm text-gray-800 mr-2">pk_test_PaperSignal123456789DEMO</code>
                        <button 
                          onClick={copyApiKey}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-black">Live API Key</h4>
                      <p className="text-sm text-gray-600">Use for production environments</p>
                    </div>
                    <Link 
                      to="/signup" 
                      className="bg-black text-white rounded-md py-1 px-3 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Get Live API Key
                    </Link>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Using Your API Key</h3>
                
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// With our SDK
const client = new PaperSignal('YOUR_API_KEY');

// With HTTP requests
// Include in the Authorization header
Authorization: Bearer YOUR_API_KEY`}</code>
                  </pre>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h4 className="font-semibold text-yellow-800 mb-1">Security Note</h4>
                  <p className="text-yellow-700 text-sm">
                    Keep your API keys secure and never expose them in client-side code. Use environment variables or a secure backend to store your keys.
                  </p>
                </div>
              </section>
              
              {/* Sending Email Section */}
              <section id="sending-email" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Sending Email</h2>
                <p className="text-gray-700 mb-4">
                  Send your first email with PaperSignal using our simple API.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">Basic Example</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// JavaScript/Node.js example
await client.send({
  from: 'you@yourdomain.com',
  to: 'recipient@example.com',
  subject: 'Hello from PaperSignal',
  html: '<h1>Hello World</h1><p>Your first email sent through PaperSignal!</p>',
  text: 'Hello World. Your first email sent through PaperSignal!'
});`}</code>
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Available Parameters</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">from</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Email address of the sender</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">to</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String or Array</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Email address(es) of the recipient(s)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">subject</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Subject line of the email</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">html</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No*</td>
                        <td className="px-6 py-4 text-sm text-gray-700">HTML content of the email (*Either html or text is required)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">text</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No*</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Plain text content of the email (*Either html or text is required)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">cc</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String or Array</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Carbon copy recipient(s)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">bcc</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String or Array</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Blind carbon copy recipient(s)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">reply_to</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">String</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Email address for replies</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">track</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Object</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Tracking configuration (opens, clicks, etc.)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h4 className="font-semibold text-blue-800 mb-1">Best Practice</h4>
                  <p className="text-blue-700 text-sm">
                    Always include both HTML and plain text versions of your email for maximum compatibility across email clients.
                  </p>
                </div>
              </section>
              
              {/* Templates Section */}
              <section id="templates" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Email Templates</h2>
                <p className="text-gray-700 mb-4">
                  Use templates to create reusable email designs with dynamic content.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">Creating a Template</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// Create a new template
const template = await client.templates.create({
name: 'welcome-email',
  subject: 'Welcome to {{company_name}}',
  html: \`
    <div>
      <h1>Welcome to {{company_name}}, {{user_name}}!</h1>
      <p>{{custom_message}}</p>
      <p>Best regards,<br>The {{team_name}} Team</p>
    </div>
  \`
});`}</code>
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Using a Template</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// Send an email using a template
await client.send({
  from: 'welcome@yourbusiness.com',
  to: 'new.user@example.com',
  template_id: 'tmpl_welcome_email',
  template_data: {
    company_name: 'Acme Inc',
    user_name: 'John Doe',
    custom_message: 'We\'re excited to have you join our platform!',
    team_name: 'Customer Success'
  }
});`}</code>
                  </pre>
                </div>
              </section>
              
              {/* Tracking Section */}
              <section id="tracking" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Tracking & Analytics</h2>
                <p className="text-gray-700 mb-4">
                  Track email engagement with PaperSignal's comprehensive analytics.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">Enabling Tracking</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`await client.send({
  from: 'marketing@yourbusiness.com',
  to: 'customer@example.com',
  subject: 'Special Offer Inside',
  html: '<h1>Limited Time Offer</h1><p>Click <a href="https://yourbusiness.com/offer">here</a> to view your exclusive discount.</p>',
  
  // Enable tracking
  track: {
    opens: true,           // Track when the email is opened
    clicks: true,          // Track link clicks
    unsubscribe: true      // Add and track unsubscribe link
  }
});`}</code>
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Retrieving Analytics</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// Get analytics for a specific email
const messageAnalytics = await client.analytics.message('msg_1aBcDeFgHiJkLmNo');

// Get analytics for all emails in a date range
const campaignAnalytics = await client.analytics.list({
  start_date: '2023-04-01',
  end_date: '2023-04-30',
  event_types: ['open', 'click', 'bounce', 'spam_report']
});`}</code>
                  </pre>
                </div>
              </section>
              
              {/* Webhooks Section */}
              <section id="webhooks" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Webhooks</h2>
                <p className="text-gray-700 mb-4">
                  Receive real-time notifications about email events using webhooks.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">Setting Up Webhooks</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// Create a webhook endpoint
const webhook = await client.webhooks.create({
  url: 'https://your-app.com/papersignal/webhook',
  description: 'Production email events',
  events: ['delivery', 'open', 'click', 'bounce', 'spam', 'unsubscribe'],
  active: true
});`}</code>
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Webhook Events</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">delivery</h4>
                    <p className="text-gray-600 text-sm">Email was successfully delivered</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">open</h4>
                    <p className="text-gray-600 text-sm">Recipient opened the email</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">click</h4>
                    <p className="text-gray-600 text-sm">Recipient clicked a link in the email</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">bounce</h4>
                    <p className="text-gray-600 text-sm">Email bounced (delivery failed)</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Example Webhook Handler</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`// Example Express.js webhook handler
app.post('/webhook/papersignal', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'delivery':
      console.log(\Email delivered to \${event.data.recipient}\);
      break;
    case 'open':
      console.log(\Email opened by \${event.data.recipient}\);
      break;
    case 'click':
      console.log(\Link clicked by \${event.data.recipient}\);
      break;
    case 'bounce':
      console.log(\Email to \${event.data.recipient} bounced\);
      break;
  }
  
  res.status(200).send('Event received');
});`}</code>
                  </pre>
                </div>
              </section>
              
              {/* API Reference Section */}
              <section id="endpoints" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">API Endpoints</h2>
                <p className="text-gray-700 mb-4">
                  PaperSignal's RESTful API provides the following endpoints for managing your email communications.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">Base URL</h3>
                <div className="bg-gray-100 p-3 rounded-md mb-6">
                  <code className="text-gray-800">https://api.papersignal.com/v1</code>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Available Endpoints</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">POST</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">/send</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Send an email</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">POST</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">/templates</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Create a new template</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">GET</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">/templates</td>
                        <td className="px-6 py-4 text-sm text-gray-700">List all templates</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">GET</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">/templates/:id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Get a specific template</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">GET</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">/analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Get email analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              {/* Error Handling Section */}
              <section id="errors" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Error Handling</h2>
                <p className="text-gray-700 mb-4">
                  PaperSignal uses conventional HTTP response codes to indicate success or failure of API requests.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">HTTP Status Codes</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Code</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">200 - OK</td>
                        <td className="px-6 py-4 text-sm text-gray-700">The request was successful</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">400 - Bad Request</td>
                        <td className="px-6 py-4 text-sm text-gray-700">The request was invalid</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">401 - Unauthorized</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Authentication failed</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">429 - Too Many Requests</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Rate limit exceeded</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-4">Error Response Format</h3>
                <div className="relative bg-gray-900 rounded-md p-4 mb-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{`{
  "error": {
    "type": "invalid_request_error",
    "message": "The 'from' field is required",
    "param": "from",
    "code": "missing_required_param"
  }
}`}</code>
                  </pre>
                </div>
              </section>
              
              {/* Rate Limits Section */}
              <section id="rate-limits" className="mb-16">
                <h2 className="text-3xl font-bold text-black mb-6">Rate Limits</h2>
                <p className="text-gray-700 mb-4">
                  PaperSignal implements rate limiting to ensure fair usage and service stability.
                </p>
                
                <h3 className="text-xl font-semibold text-black mb-4">Default Limits</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Requests</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Sending</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">Free</td>
                        <td className="px-6 py-4 text-sm text-gray-700">100 requests/minute</td>
                        <td className="px-6 py-4 text-sm text-gray-700">500 emails/day</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">Growth</td>
                        <td className="px-6 py-4 text-sm text-gray-700">500 requests/minute</td>
                        <td className="px-6 py-4 text-sm text-gray-700">50,000 emails/month</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">Enterprise</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Custom</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Custom</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h4 className="font-semibold text-yellow-800 mb-1">Rate Limit Handling</h4>
                  <p className="text-yellow-700 text-sm">
                    When you exceed rate limits, the API will return a 429 status code with a Retry-After header indicating how many seconds to wait before retrying.
                  </p>
                </div>
              </section>
              
              {/* Get Started Section */}
              <section className="bg-black text-white rounded-xl p-10 mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Join thousands of developers using PaperSignal's powerful email API.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/signup" 
                    className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Sign up for free
                  </Link>
                  <Link 
                    to="/contact" 
                    className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors"
                  >
                    Contact sales
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <FiMail className="text-black text-2xl mr-2" />
                <span className="font-bold text-xl text-black">PaperSignal</span>
              </div>
              <p className="text-gray-600 mb-6">
                The email API for modern developers
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  <BsGithub className="text-xl" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="/#features" className="text-gray-600 hover:text-black transition-colors">Features</a></li>
                <li><a href="/#pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</a></li>
                <li><Link to="/docs" className="text-gray-600 hover:text-black transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">About</a></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8">
            <p className="text-gray-500 text-center">
              &copy; {new Date().getFullYear()} PaperSignal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default Documentation;