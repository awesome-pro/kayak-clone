// /components/sections/TravelDealsSection.tsx
"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const travelDeals = [
  {
    destination: "Las Vegas",
    image: "https://content.r9cdn.net/rimg/dimg/f5/c1/85aff68e-city-25968-1631c654e07.jpg?width=300&height=200&xhint=1259&yhint=854&crop=true",
    duration: "3h 21m",
    dates: "Nov 15-22",
    price: "$89",
  },
  {
    destination: "Miami",
    image: "https://content.r9cdn.net/rimg/dimg/6c/06/8e1ab191-city-28242-1631c654e07.jpg?width=300&height=200&xhint=1664&yhint=1018&crop=true",
    duration: "2h 45m",
    dates: "Dec 5-12",
    price: "$129",
  },
  {
    destination: "New York",
    image: "https://content.r9cdn.net/rimg/dimg/09/c0/eda8591e-city-35308-1631c654e07.jpg?width=300&height=200&xhint=1559&yhint=999&crop=true",
    duration: "5h 10m",
    dates: "Jan 10-17",
    price: "$139",
  },
  {
    destination: "Orlando",
    image: "https://content.r9cdn.net/rimg/dimg/db/02/06b291e8-city-14912-171317ad83a.jpg?width=300&height=200&xhint=3039&yhint=2053&crop=true",
    duration: "2h 30m",
    dates: "Nov 20-27",
    price: "$99",
  },
  {
    destination: "San Francisco",
    image: "https://content.r9cdn.net/rimg/dimg/73/0c/45ec3f09-city-29475-1646d39dcf2.jpg?width=300&height=200&xhint=1664&yhint=1018&crop=true",
    duration: "1h 45m",
    dates: "Dec 12-19",
    price: "$119",
  },
]

export default function TravelDealsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Travel deals under $139</h2>
          <Link href="#" className="text-[#FF690F] flex items-center gap-1 font-medium">
            Explore more
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 hide-scrollbar">
          {travelDeals.map((deal, index) => (
            <motion.div
              key={index}
              className="min-w-[260px] bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-36">
                <Image
                  src={deal.image}
                  alt={deal.destination}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{deal.destination}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{deal.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{deal.dates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Roundtrip</span>
                  <span className="font-bold text-lg">{deal.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#FF690F]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}