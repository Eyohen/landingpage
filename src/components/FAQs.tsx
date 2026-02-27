"use client"

import React, { useState } from "react"
import { IoStarOutline } from "react-icons/io5"
import { IoClose, IoAdd } from "react-icons/io5"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How do stablecoin payments work?",
    answer:
      "Stablecoins are cryptocurrencies designed to match the value of traditional currencies like the US dollar. When a customer pays with a stablecoin, you receive the exact amount in your wallet without worrying about price changes.",
  },
  {
    question: "Do I need to understand crypto to use Coinley?",
    answer:
      "No, you don't need any crypto expertise to use Coinley. Our platform is designed to be user-friendly and handles all the technical complexities behind the scenes. Simply integrate our solution and start accepting stablecoin payments.",
  },
  {
    question: "What fees do you charge?",
    answer:
      "Coinley charges a competitive 1% transaction fee with no monthly fees or hidden costs. You only pay when you receive payments, making it affordable for businesses of all sizes.",
  },
  {
    question: "How do I integrate with my existing platform?",
    answer:
      "Integration is simple! We offer plugins for WooCommerce and Shopify, comprehensive APIs for custom implementations, and direct integrations with scheduling apps like Cal.com. Most merchants can get started in under 15 minutes.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full mb-6">
            <IoStarOutline className="text-white w-4 h-4" />
            <span className="text-gray-300 text-sm">FAQs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            You Have questions? Here are quick answers to the most common
            inquiries
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-dark-color overflow-hidden bg-dark-color/30 backdrop-blur-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-dark-color/50 transition"
              >
                <h3 className="text-white text-lg font-medium pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <IoClose className="w-6 h-6 text-text-purple cursor-pointer" />
                  ) : (
                    <IoAdd className="w-6 h-6 text-text-purple cursor-pointer" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-white/70 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
