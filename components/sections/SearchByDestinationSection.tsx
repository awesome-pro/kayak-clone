// /components/sections/SearchByDestinationSection.tsx
"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const destinations = [
  {
    city: "Las Vegas",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "New York",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "London",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "Los Angeles",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "Miami",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "Paris",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "Orlando",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "Rome",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
  {
    city: "Tokyo",
    links: ["FLIGHTS", "HOTELS", "CARS"],
  },
]

export default function SearchByDestinationSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-4">Search cheap flights by destination</h2>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Looking for cheap airfare? Search and compare flight deals from various airlines and travel sites. 
          Find the best prices for your next trip and save money on your airfare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{destination.city}</h3>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {destination.links.map((link, linkIndex) => (
                  <Link key={linkIndex} href="#" className="text-xs text-[#FF690F] hover:underline">
                    {link}
                    {linkIndex < destination.links.length - 1 && <span className="text-gray-400 ml-2">•</span>}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="#" className="text-[#FF690F] hover:underline">
            Airlines
          </Link>
          <Link href="#" className="text-[#FF690F] hover:underline">
            Airports around the world
          </Link>
          <Link href="#" className="text-[#FF690F] hover:underline">
            Flight routes
          </Link>
          <Link href="#" className="text-[#FF690F] hover:underline">
            Travel guides
          </Link>
        </div>
      </div>
    </section>
  )
}