import React from "react"

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-b  py-20 relative overflow-hidden">
      <div className="absolute 2xl:-top-[50%] -top-[30%] right-[50%] translate-x-[50%] w-48 h-48 md:w-[30vw] md:h-[30vw] bg-text-purple/60 rounded-full blur-[150px]"></div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Icon row */}
        <img src={"cta graphic.png"} />

        <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold text-white mb-6">
          Your Customers Already Use
          <br />
          Stablecoins. Start Accepting
          <br />
          Them Today.
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Our platform combines cutting-edge blockchain technology with
          intuitive design to deliver a seemless payment experience.
        </p>
        <button className="px-8 py-3 bg-text-purple text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition shadow-xl">
          Get Started now
        </button>
      </div>
    </section>
  )
}
