"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, X, RefreshCcw, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface SearchFormProps {
  activeTab: string
}

const tripTypes = [
  { value: "round-trip", label: "Round-trip" },
  { value: "one-way", label: "One-way" },
  { value: "multi-city", label: "Multi-city" },
]

const cabinTypes = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
]

export default function SearchForm({ activeTab }: SearchFormProps) {
  const [origin, setOrigin] = useState("San Francisco (SFO)")
  const [destination, setDestination] = useState("")
  const [tripType, setTripType] = useState(tripTypes[0])
  const [dates, setDates] = useState("Departure — Return")
  const [travelers, setTravelers] = useState("1 adult, Economy")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTravelersOpen, setIsTravelersOpen] = useState(false)
  
  // Traveler counts
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [cabinType, setCabinType] = useState(cabinTypes[0])

  const handleSwapLocations = () => {
    const temp = origin
    setOrigin(destination)
    setDestination(temp)
  }

  const updateTravelers = () => {
    const totalTravelers = adults + children + infants
    const travelerText = `${totalTravelers} ${totalTravelers === 1 ? 'traveler' : 'travelers'}, ${cabinType.label}`
    setTravelers(travelerText)
    setIsTravelersOpen(false)
  }

  const renderSearchForm = () => {
    switch (activeTab) {
      case 'flights':
        return renderFlightsForm()
      case 'stays':
        return renderStaysForm()
      case 'cars':
        return renderCarsForm()
      default:
        return renderFlightsForm()
    }
  }

  const renderFlightsForm = () => (
    <>
      <div className="flex flex-wrap gap-3 mb-4">
        {tripTypes.map((type) => (
          <Button
            key={type.value}
            variant={tripType.value === type.value ? "secondary" : "outline"}
            className={cn(
              "rounded-full text-sm",
              tripType.value === type.value ? "bg-gray-200" : "bg-white"
            )}
            onClick={() => setTripType(type)}
          >
            {type.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* Origin Field */}
        <div className="md:col-span-4 relative">
          <div className="relative">
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="pl-10 pr-8 py-6 border-2 focus:border-[#FF690F] rounded-md"
              placeholder="From where?"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            {origin && (
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setOrigin("")}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full border border-gray-200 hover:bg-gray-100"
            onClick={handleSwapLocations}
          >
            <RefreshCcw className="w-4 h-4 text-gray-500" />
          </Button>
        </div>

        {/* Destination Field */}
        <div className="md:col-span-4 relative">
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 pr-8 py-6 border-2 focus:border-[#FF690F] rounded-md"
            placeholder="To where?"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          {destination && (
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setDestination("")}>
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <div className="md:col-span-3">
          <Button className="w-full h-full bg-[#FF690F] hover:bg-[#E05800] text-white py-6 rounded-md">
            <Search className="w-5 h-5 mr-2" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        {/* Date Picker */}
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-start text-left font-normal py-6 border-2 focus:border-[#FF690F] rounded-md"
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{dates}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4">
              <div className="text-center mb-4">
                <h3 className="font-medium">Select dates</h3>
                <p className="text-sm text-gray-500">Click to select departure and return dates</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Departure</h4>
                  <div className="p-2 border rounded-md text-center">
                    Select date
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Return</h4>
                  <div className="p-2 border rounded-md text-center">
                    Select date
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  size="sm" 
                  onClick={() => setIsDatePickerOpen(false)}
                  className="bg-[#FF690F] hover:bg-[#E05800] text-white"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Travelers Selector */}
        <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-start text-left font-normal py-6 border-2 focus:border-[#FF690F] rounded-md"
            >
              <Users className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{travelers}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-4">
              <h3 className="font-medium mb-4">Travelers</h3>
              
              {/* Adults */}
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-sm text-gray-500">Ages 18+</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    -
                  </Button>
                  <span>{adults}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setAdults(adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Children */}
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Children</p>
                  <p className="text-sm text-gray-500">Ages 2-17</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    -
                  </Button>
                  <span>{children}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setChildren(children + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Infants */}
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Infants</p>
                  <p className="text-sm text-gray-500">Under 2</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setInfants(Math.max(0, infants - 1))}
                    disabled={infants <= 0}
                  >
                    -
                  </Button>
                  <span>{infants}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setInfants(infants + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Cabin Type */}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Cabin type</h4>
                <div className="grid grid-cols-2 gap-2">
                  {cabinTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={cabinType.value === type.value ? "secondary" : "outline"}
                      className={cn(
                        "text-sm justify-start",
                        cabinType.value === type.value ? "bg-gray-200" : ""
                      )}
                      onClick={() => setCabinType(type)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={updateTravelers}
                  className="bg-[#FF690F] hover:bg-[#E05800] text-white"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )

  const renderStaysForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="md:col-span-5 relative">
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 pr-8 py-6 border-2 focus:border-[#FF690F] rounded-md"
            placeholder="Where are you going?"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="md:col-span-4 relative">
          <Button 
            variant="outline" 
            className="w-full justify-start text-left font-normal py-6 border-2 focus:border-[#FF690F] rounded-md"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Check-in — Check-out</span>
          </Button>
        </div>

        <div className="md:col-span-3">
          <Button className="w-full h-full bg-[#FF690F] hover:bg-[#E05800] text-white py-6 rounded-md">
            <Search className="w-5 h-5 mr-2" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        <Button 
          variant="outline" 
          className="justify-start text-left font-normal py-6 border-2 focus:border-[#FF690F] rounded-md"
          onClick={() => setIsTravelersOpen(true)}
        >
          <Users className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-600">2 adults, 0 children</span>
        </Button>

        <Button 
          variant="outline" 
          className="justify-start text-left font-normal py-6 border-2 focus:border-[#FF690F] rounded-md"
        >
          <span className="text-gray-600">1 room</span>
        </Button>
      </div>
    </>
  )

  const renderCarsForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="md:col-span-5 relative">
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 pr-8 py-6 border-2 focus:border-[#FF690F] rounded-md"
            placeholder="Pick-up location"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="md:col-span-4 relative">
          <Button 
            variant="outline" 
            className="w-full justify-start text-left font-normal py-6 border-2 focus:border-[#FF690F] rounded-md"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Pick-up — Drop-off</span>
          </Button>
        </div>

        <div className="md:col-span-3">
          <Button className="w-full h-full bg-[#FF690F] hover:bg-[#E05800] text-white py-6 rounded-md">
            <Search className="w-5 h-5 mr-2" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center mt-3">
        <input type="checkbox" id="different-location" className="mr-2" />
        <label htmlFor="different-location" className="text-sm text-gray-600">Drop car off at different location</label>
      </div>
    </>
  )

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="p-5">
        {renderSearchForm()}
      </div>
    </motion.div>
  )
}
