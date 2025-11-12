"use client"

import React, { useState } from "react"

import { HiMenuAlt3 } from "react-icons/hi"
import { IoClose } from "react-icons/io5"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 font-grotesque">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 relative z-50">
            <img src={"/logo3.png"} alt="Coinley Logo" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 bg-purple-200/20 py-3 px-7 rounded-full border border-text-purple/60">
            <a
              href="#why-us"
              onClick={(e) => scrollToSection(e, 'why-us')}
              className="text-white hover:text-purple-400 transition cursor-pointer"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="text-white hover:text-purple-400 transition cursor-pointer"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="text-white hover:text-purple-400 transition cursor-pointer"
            >
              Company
            </a>
            <a
              href="#faq"
              onClick={(e) => scrollToSection(e, 'faq')}
              className="text-white hover:text-purple-400 transition cursor-pointer"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://merchant.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition"
            >
              Login
            </a>
            <a
              href="https://merchant.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-black text-gray-200 rounded-full hover:bg-gray-900 transition inline-block"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoClose className="w-8 h-8" />
            ) : (
              <HiMenuAlt3 className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-full gap-8 transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {/* Mobile Navigation Links */}
          <a
            href="#why-us"
            onClick={(e) => scrollToSection(e, 'why-us')}
            className="text-white text-2xl hover:text-purple-400 transition cursor-pointer"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="text-white text-2xl hover:text-purple-400 transition cursor-pointer"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="text-white text-2xl hover:text-purple-400 transition cursor-pointer"
          >
            Company
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, 'faq')}
            className="text-white text-2xl hover:text-purple-400 transition cursor-pointer"
          >
            FAQ
          </a>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <a
              href="https://merchant.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-purple-400 transition"
              onClick={toggleMenu}
            >
              Login
            </a>
            <a
              href="https://merchant.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-black text-gray-200 rounded-full hover:bg-gray-900 transition text-lg inline-block"
              onClick={toggleMenu}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
