import React from "react"
import { IoStarOutline } from "react-icons/io5"

export default function IntegrationPartners() {
  return (
    <section className="py-16 font-grotesque">
      <div className="flex w-fit items-center gap-2 px-4 py-2 bg-dark-color rounded-full mb-6 mx-auto">
        <IoStarOutline className="text-white w-4 h-4" />
        <span className="text-gray-300 text-sm">Even more</span>
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
            <a
              href="/coinley-woocommerce-plugin-v1.1.5.zip"
              download="coinley-woocommerce-plugin-v1.1.5.zip"
              className="block w-full px-6 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition text-center"
            >
              Install Plugin
            </a>
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
            <a
              href="https://docs.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition text-center"
            >
              Explore API Doc
            </a>
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
