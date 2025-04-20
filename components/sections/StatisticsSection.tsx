// /components/sections/StatisticsSection.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function StatisticsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-2">Save when you compare</h3>
            <div className="flex gap-2 mb-3">
              {["American", "Delta", "United", "Southwest"].map((airline, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                  {airline.charAt(0)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Compare prices from hundreds of travel sites to get the best flight deals
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-2">41,000,000+ searches this week</h3>
            <div className="flex -space-x-2 mb-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs border-2 border-white">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Join millions of travelers finding the best deals every day
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-2">Travelers love us</h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              1M+ ratings on our app
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}