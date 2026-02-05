import React from "react"
import { IoStorefrontOutline } from "react-icons/io5"

export default function DashboardPreview() {
  return (
    <section className="py-16 font-grotesque relative bg-[#070707]">
      <div className="absolute md:block hidden top-[10rem] right-[50%] translate-x-[50%] w-48 h-48 md:w-[110vw] md:h-[200px] bg-text-purple/70 rounded-full blur-[150px] overflow-x-hidden half-circle rotate-180"></div>
      <div className="absolute md:block hidden -top-[5rem] right-[50%] translate-x-[50%] w-48 h-48 md:w-[110vw] md:h-[200px] bg-white rounded-full blur-[30px] overflow-x-hidden half-circle rotate-180"></div>

      <div className="">
        <div className="max-w-6xl mx-auto px-6 relative md:-mt-72">
          <div className="text-center pt-32">
            <div className="inline-flex items-center gap-1 px-4 py-1 bg-gray-900 text-gray-100 rounded-full text-sm font-semibold mb-4">
              <IoStorefrontOutline />
              <p>For Merchants</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold md:text-gray-900 mb-4 ">
              Simple, Yet Powerful
              <br />
              Solutions
            </h2>
            <p className="md:text-gray-800 max-w-2xl mx-auto md:text-xl">
              Our platform gives seemless transactions regardless of location.
            </p>
          </div>
        
        </div>
      </div>
    </section>
  )
}
