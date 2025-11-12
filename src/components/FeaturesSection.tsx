import React from "react"

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16 md:py-24 font-grotesque">
      <div className="md:max-w-3xl mx-auto md:px-6 text-center">
        <h2 className="md:text-3xl text-lg xl:text-4xl font-bold text-gray-900 mb-4">
          Coinley makes crypto checkouts simple. From online stores to custom
          platforms, we help businesses accept crypto payments and get paid
          instantly. <span className="text-text-purple">No monthly fees.</span>
        </h2>
        <button className="mt-8 px-8 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition">
          About us
        </button>
      </div>
    </section>
  )
}
