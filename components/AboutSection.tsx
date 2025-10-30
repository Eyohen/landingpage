import React from "react"
import FeaturesSection from "./FeaturesSection"
import PaymentFlow from "./PaymentFlow"
import MerchantSection from "./MerchantSection"

export default function AboutSection() {
  return (
    <section className="bg-white relative pt-16 lg:mt-40">
      <div className="md:block hidden absolute -top-[22rem] right-[50%] translate-x-[50%] w-48 h-48 md:w-[110vw] md:h-[500px] bg-text-purple rounded-full blur-[150px] overflow-x-hidden half-circle"></div>
      <div className="md:block hidden absolute -top-[20rem] right-[50%] translate-x-[50%] w-48 h-48 md:w-[110vw] md:h-[200px] bg-white rounded-full blur-[30px] overflow-x-hidden half-circle"></div>

      <div className="md:px-6 px-4 relative bg-white md:-mt-64 ">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-x-hidden md:-top-60 md:right-[50%] md:translate-x-[50%] overflow-hidden">
            <img
              src={"/video-placeholder-2.png"}
              className="w-[80%] mx-auto rounded-xl md:rounded-2xl  shadow-gray-500 shadow-2xl"
            />
            {/* Trust badges */}
            <div className="flex items-center flex-col justify-center gap-0 text-sm text-gray-800 md:mt-7 mt-4">
              <span className="md:text-lg">
                Trusted by thousands of merchants around the world
              </span>
              <div className="flex items-center gap-4 md:gap-16 md:justify-start justify-between mt-4 md:mt-4">
                <img
                  src={"/woocommerce.png"}
                  className="md:w-20 w-20 mx-auto rounded-xl md:rounded-2xl  shadow-gray-500 shadow-2xl"
                />
                <img
                  src={"/cal.com.png"}
                  className="md:w-20 w-20 mx-auto rounded-xl md:rounded-2xl  shadow-gray-500 shadow-2xl"
                />
                <img
                  src={"/shopify.png"}
                  className="md:w-20 w-20 mx-auto rounded-xl md:rounded-2xl  shadow-gray-500 shadow-2xl"
                />
              </div>
            </div>
            <FeaturesSection />
            <PaymentFlow />
            <MerchantSection />
          </div>
        </div>
      </div>
    </section>
  )
}
