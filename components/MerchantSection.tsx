import React from "react"

export default function MerchantSection() {
  return (
    <section className="bg-white py-16 font-grotesque">
      <div className="max-w-6xl mx-auto md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gray-800 text-gray-100 rounded-full text-sm font-semibold mb-4">
            FEATURES
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Built for <span className="text-text-purple">Merchants.</span>
            <br />
            Designed for Growth.
          </h2>
          <p className="text-gray-900 mt-4 max-w-2xl mx-auto md:text-xl">
            Connect with customers and partners wordwide through borderless
            payments that work across any country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 gap-4">
          {/* Card 1 */}
          <img
            src={"/borderless-reach.png"}
            className="rounded-[1.5rem] w-full"
          />
          {/* Card 2 */}
          <img
            src={"/stable-by-default.png"}
            className="rounded-[1.5rem] w-full"
          />
          <img
            src={"/instant-setup.png"}
            className="rounded-[1.5rem] w-full col-span-2"
          />
        </div>
      </div>
    </section>
  )
}
