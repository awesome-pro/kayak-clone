// /components/sections/ProFeaturesSection.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const proFeatures = [
  {
    title: "KAYAK.ai",
    description: "Plan your trip with our AI travel assistant",
    icon: "/images/ai-icon.svg",
    color: "bg-blue-50",
  },
  {
    title: "Best Time to Travel",
    description: "Find the perfect time for your next adventure",
    icon: "/images/calendar-icon.svg",
    color: "bg-green-50",
  },
  {
    title: "Explore",
    description: "Discover destinations based on your budget",
    icon: "/images/explore-icon.svg",
    color: "bg-purple-50",
  },
  {
    title: "Trips",
    description: "Organize all your travel plans in one place",
    icon: "/images/trips-icon.svg",
    color: "bg-orange-50",
  },
]

export default function ProFeaturesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-8">For travel pros</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl ${feature.color} border border-gray-100`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FF690F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
              <Link href="#" className="text-[#FF690F] text-sm font-medium">
                Learn more
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}