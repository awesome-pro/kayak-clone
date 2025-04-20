// /components/sections/HeroSection.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import SearchForm from "@/components/search-form"

interface HeroSectionProps {
  activeTab: string
}

export default function HeroSection({ activeTab }: HeroSectionProps) {
  return (
    <section className="relative">
      <div className="container px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-8 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Compare flight deals from 100s of sites<span className="text-[#FF690F]">.</span>
            </motion.h1>

            {/* Search Form */}
            <SearchForm activeTab={activeTab} />
          </div>

          <div className="hidden md:block md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="rounded-xl overflow-hidden h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="https://content.r9cdn.net/rimg/dimg/db/02/06b291e8-city-14912-171317ad83a.jpg?width=300&height=200&xhint=3039&yhint=2053&crop=true"
                  alt="Travel destination"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-xl overflow-hidden h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src="https://content.r9cdn.net/rimg/dimg/09/c0/eda8591e-city-35308-1631c654e07.jpg?width=300&height=200&xhint=1559&yhint=999&crop=true"
                  alt="Travel destination"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-xl overflow-hidden h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src="https://content.r9cdn.net/rimg/dimg/f2/b1/89e06bf7-city-10229-16561d9e10f.jpg?width=300&height=200&xhint=1443&yhint=1300&crop=true"
                  alt="Travel destination"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-xl overflow-hidden h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Image
                  src="https://content.r9cdn.net/rimg/dimg/73/0c/45ec3f09-city-29475-1646d39dcf2.jpg?width=300&height=200&xhint=1664&yhint=1018&crop=true"
                  alt="Travel destination"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}