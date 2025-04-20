"use client"

import React from "react"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const destinations = [
  {
    city: "Las Vegas",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "New York",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "London",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Los Angeles",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Miami",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Paris",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Orlando",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Rome",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Manila",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Cancún",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Seattle",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Denver",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Tokyo",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "Fort Lauderdale",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
  {
    city: "San Francisco",
    links: ["CARS", "FLIGHTS", "HOTELS"],
  },
]

export default function DestinationGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={container} initial="hidden" animate="show">
      {destinations.map((destination, index) => (
        <motion.div
          key={index}
          variants={item}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{destination.city}</h3>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {destination.links.map((link, linkIndex) => (
              <React.Fragment key={linkIndex}>
                <Link href="#" className="text-xs text-[#FF690F] hover:underline uppercase">
                  {link}
                </Link>
                {linkIndex < destination.links.length - 1 && <span className="text-xs text-gray-400">•</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
