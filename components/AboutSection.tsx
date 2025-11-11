"use client"
import React, { useRef, useState } from "react"
import FeaturesSection from "./FeaturesSection"
import PaymentFlow from "./PaymentFlow"
import MerchantSection from "./MerchantSection"

export default function AboutSection() {
  const videoRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleVideo = () => {
    if (videoRef.current) {
      const iframe = videoRef.current
      if (isPlaying) {
        // Pause video
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        )
      } else {
        // Play video
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        )
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="bg-white relative pt-16 lg:mt-40">
      <div className="md:block hidden absolute -top-[22rem] right-[50%] translate-x-[50%] w-48 h-48 md:w-[110vw] md:h-[500px] bg-text-purple rounded-full blur-[150px] overflow-x-hidden half-circle"></div>
      <div className="md:block hidden absolute -top-[20rem] right-[50%] translate-x-[50%] w-48 h-48 md:w-[110vw] md:h-[200px] bg-white rounded-full blur-[30px] overflow-x-hidden half-circle"></div>

      <div className="md:px-6 px-4 relative bg-white md:-mt-64 ">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-x-hidden md:-top-60 md:right-[50%] md:translate-x-[50%] overflow-hidden">
            <div className="relative w-[80%] mx-auto group">
              <iframe
                ref={videoRef}
                className="w-full aspect-video rounded-xl md:rounded-2xl shadow-gray-500 shadow-2xl"
                src="https://www.youtube.com/embed/ZNqQdUzNTQI?enablejsapi=1"
                title="Coinley Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Play/Pause overlay button */}
              <button
                onClick={toggleVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  {isPlaying ? (
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-[#7C3AED]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-[#7C3AED] ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
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
