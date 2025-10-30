import React from "react"

export default function IntegrationPartners() {
  return (
    <section className="py-16 font-grotesque">
      <div className="flex items-center justify-center ">
        <p className="px-4 py-1 bg-gray-900 text-gray-100 rounded-full text-sm font-semibold mb-4 text-center">
          Even more
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            A Fully Integrated Payment Platform
            <br />
            for Moving Money Globally
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            No more waiting days for payment to clear - our platform settles
            transactions in seconds, providing immediate confirmation and
            availabilty of funds.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-white/10 rounded-2xl p-3 hover:bg-gray-750 transition">
            <img src={"/card-1.png"} className="w-full rounded-lg" />
            <div className="inline-block bg-dark-color rounded-md px-3 py-2 my-3">
              01
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              WooCommerce & Shopify
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Install in minutes with our free plugin and start accepting
              stablecoins at checkout.
            </p>
            <button className="w-full px-6 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition">
              Install Plugin
            </button>
          </div>

          <div className="border border-white/10 rounded-2xl p-3 hover:bg-gray-750 transition">
            <img src={"/card-2.png"} className="w-full rounded-lg" />
            <div className="inline-block bg-dark-color rounded-md px-3 py-2 my-3">
              02
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              Custom Apps & APIs
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Developers love us. Use our APIs and SDKs to add stablecoin
              payments to digital products.
            </p>
            <button className="w-full px-6 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition">
              Explore API Doc
            </button>
          </div>

          <div className="border border-white/10 rounded-2xl p-3 hover:bg-gray-750 transition">
            <img src={"/card-3.png"} className="w-full rounded-lg" />
            <div className="inline-block bg-dark-color rounded-md px-3 py-2 my-3">
              03
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              Cal.com & Scheduling
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Let clients book sessions and pay with stablecoins, directly from
              your
            </p>
            <button className="w-full px-6 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition">
              Connect your calender
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
