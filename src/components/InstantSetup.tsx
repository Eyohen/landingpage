import React from 'react';

export default function InstantSetup() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side - Icon */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1">
            <div className="inline-block px-4 py-1 bg-purple-200 text-purple-700 rounded-full text-sm font-semibold mb-4">
              QUICK START
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-purple-600">Instant Setup</span>
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Integrate it directly into your existing payment flow or use our hosted checkout page.
            </p>
            <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
