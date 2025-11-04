import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative md:h-[110vh] 2xl:h-screen">
      {/* Floating coins decoration */}
      {/* <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"></div> */}
      <div className="absolute 2xl:-top-[70%] -top-[50%] right-[50%] translate-x-[50%] w-48 h-48 md:w-[50vw] md:h-[50vw] bg-text-purple/40 rounded-full blur-[150px]"></div>

      <div className="absolute right-0 md:top-4 top-40 2xl:w-fit md:w-[50%] w-full md:opacity-100 opacity-20">
        <img src={"/hero_coins.png"} />
      </div>

      <div className="relative max-w-7xl mx-auto md:px-10 2xl:px-0 px-4 py-24 2xl:py-54 lg:py-40">
        <div className="md:max-w-2xl 2xl:max-w-3xl">
          <div className="font-grotesque">
            <h1 className="md:text-5xl text-3xl 2xl:text-7xl lg:text-[55px] font-bold text-white mb-6 2xl:leading-[75px] lg:leading-[68px] tracking-tighter">
              Accept Stablecoin Payments Anywhere You Sell Online
            </h1>
            <div className="md:text-lg lg:text-xl text-gray-300 mb-8">
              <p className="">
                Expand your buisness reach with easy crypto checkout solution
                <span className="md:block">Fast. Secure. Global</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://docs.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
            >
              Explore docs
            </Link>
            <Link
              href="https://merchant.coinley.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-text-purple text-white rounded-full font-semibold hover:bg-purple-700 transition inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
