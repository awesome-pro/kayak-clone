"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import SearchForm from "@/components/search-form"
import DestinationGrid from "@/components/destination-grid"

export default function KayakLandingPage() {
  const [activeTab, setActiveTab] = useState("flights")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <Link href="/" className="flex items-center">
              <div className="flex">
                {["K", "A", "Y", "A", "K"].map((letter, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-white font-bold",
                      index === 0 ? "bg-[#FF690F]" : "bg-[#FF690F]",
                    )}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="hidden md:flex gap-2">
              <User className="w-4 h-4" />
              <span>Sign in</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="container px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-8 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Compare flight deals from 100s of sites<span className="text-[#FF690F]">.</span>
              </motion.h1>

              {/* Service Tabs */}
              <Tabs defaultValue="flights" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 h-auto p-1 bg-transparent gap-2">
                  <TabsTrigger
                    value="flights"
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-md data-[state=active]:bg-[#FF690F] data-[state=active]:text-white",
                      activeTab === "flights" ? "bg-[#FF690F] text-white" : "bg-white",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-1"
                    >
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                    </svg>
                    <span className="text-xs">Flights</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="stays"
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-md data-[state=active]:bg-[#FF690F] data-[state=active]:text-white",
                      activeTab === "stays" ? "bg-[#FF690F] text-white" : "bg-white",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-1"
                    >
                      <path d="M2 22h20"></path>
                      <path d="M6 12v4"></path>
                      <path d="M18 12v4"></path>
                      <path d="M12 12v4"></path>
                      <path d="M22 7H2v5h20V7z"></path>
                      <path d="M22 2H2v5h20V2z"></path>
                      <path d="M17 12v10"></path>
                      <path d="M7 12v10"></path>
                    </svg>
                    <span className="text-xs">Stays</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cars"
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-md data-[state=active]:bg-[#FF690F] data-[state=active]:text-white",
                      activeTab === "cars" ? "bg-[#FF690F] text-white" : "bg-white",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-1"
                    >
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                    <span className="text-xs">Cars</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="packages"
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-md data-[state=active]:bg-[#FF690F] data-[state=active]:text-white",
                      activeTab === "packages" ? "bg-[#FF690F] text-white" : "bg-white",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-1"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                    </svg>
                    <span className="text-xs">Packages</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="kayak-ai"
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-md data-[state=active]:bg-[#FF690F] data-[state=active]:text-white",
                      activeTab === "kayak-ai" ? "bg-[#FF690F] text-white" : "bg-white",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="text-xs">KAYAK.ai</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search Form */}
              <SearchForm activeTab={activeTab} />
            </div>

            <div className="hidden md:block md:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="https://sjc.microlink.io/7sER_xgRNcluplr4l7ItbgYa8X5BA0lbxGOzEeOquLU9XKQUHzGk4bky5OXPui2jsUU5h1TQgOch8VxgsP6GHQ.jpeg"
                    alt="Travel destination"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Travel destination"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Travel destination"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=300"
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

      {/* Destinations Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Start your travel planning here</h2>
            <p className="text-gray-600">
              Search{" "}
              <Link href="#" className="text-[#FF690F] hover:underline">
                Flights
              </Link>
              ,{" "}
              <Link href="#" className="text-[#FF690F] hover:underline">
                Hotels
              </Link>{" "}
              &{" "}
              <Link href="#" className="text-[#FF690F] hover:underline">
                Rental Cars
              </Link>
            </p>
          </motion.div>

          <DestinationGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t border-gray-200">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Mobile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Discover
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    How we work
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Help/FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Affiliates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">More</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Airline Fees
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Airlines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Low Fare Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Badges & Certificates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#FF690F]">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} KAYAK Software Corporation</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
