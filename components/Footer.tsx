import React from "react"
import Link from "next/link"
import {
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute -right-[10%] md:-bottom-[35%] -bottom-[10%]">
        <img src={"/footer-img.png"} className="w-3xl" />
      </div>
      <div className="max-w-7xl mx-auto md:px-10 px-4 py-16 relative">
        {/* Top section with logo and social */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          {/* Logo and description */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo icon */}
              <Link href="/" className="flex items-center gap-2">
                <img src={"/logo3.png"} />
              </Link>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              An entirely new payment infrastructure, built with blockchain
              technology, to simplify global crypto transactions.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            <Link
              href="https://x.com/Coinleyio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:text-purple-400 transition"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.instagram.com/coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:text-purple-400 transition"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61575107223768"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:text-purple-400 transition"
            >
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.youtube.com/@Coinleyio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:text-purple-400 transition"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.tiktok.com/@coinley.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:text-purple-400 transition"
            >
              <FaTiktok className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/coinley/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:text-purple-400 transition"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {/* Company */}
          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-purple-400 transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-purple-400 transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Merchants */}
          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-6">
              Merchants
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-purple-400 transition"
                >
                  Multi-Chain Access
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-purple-400 transition"
                >
                  Instant Settlements
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.coinley.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition"
                >
                  Easy Integration
                </Link>
              </li>
              <li>
                <Link
                  href="https://merchant.coinley.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition"
                >
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://docs.coinley.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.coinley.io/#api-reference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-purple-400 transition"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-6">
              Get Started
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://littlestore.coinley.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Disclaimer */}
        <div className="mb-8">
          <h5 className="text-white font-medium mb-4">
            Disclaimer for UK residents:
          </h5>
          <p className="text-gray-500 text-sm leading-relaxed">
            This website helps users process crypto transactions using Coinley's
            middleware. Coinley does not endorse or recommend any cryptocurrency
            trading activity. Users should not regard this website or its
            contents as a recommendation, invitation, or inducement to engage in
            cryptoasset trading. Coinley is a non-custodial solution; hence,
            users retain full control of their wallets and cryptos at all times.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 All Rights Reserved</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms & Condition
            </Link>
            <Link href="#" className="hover:text-white transition">
              Security Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
