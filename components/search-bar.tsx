"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Calendar, X, Navigation, Clock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock data - in a real app, move this to a separate file
const popularDestinations = [
  {
    name: "Dubai",
    location: "Emirate of Dubai, United Arab Emirates",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/78/84/94/dubai-aquarium-underwater.jpg?w=200&h=200&s=1"
  },
  {
    name: "Istanbul",
    location: "Turkey, Europe",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/2f/9f/6f/istanbul.jpg?w=200&h=200&s=1"
  },
  {
    name: "London",
    location: "England, United Kingdom",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/af/70/3c/the-white-tower-the-norman.jpg?w=200&h=-1&s=1"
  },
  {
    name: "Paris",
    location: "Île-de-France, France",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=200&h=200&s=1"
  }
];


const recentSearches = [
  "Bali, Indonesia",
  "Tokyo, Japan",
  "Barcelona, Spain",
  "Rome, Italy"
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("2")
  const [activeTab, setActiveTab] = useState("hotels")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the search area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const placeholderByTab = {
    "hotels": "Where to?",
    "things-to-do": "Find things to do",
    "restaurants": "Find restaurants",
    "vacation-rentals": "Find vacation rentals"
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <div className="relative" ref={searchRef}>
        <Tabs 
          defaultValue="hotels" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="bg-white rounded-t-xl shadow-sm">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-transparent h-auto p-1 gap-1">
              <TabsTrigger 
                value="hotels" 
                className="py-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2"
              >
                <span className="hidden md:inline">Hotels</span>
                <span className="md:hidden">🏨</span>
              </TabsTrigger>
              <TabsTrigger 
                value="things-to-do" 
                className="py-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2"
              >
                <span className="hidden md:inline">Things to Do</span>
                <span className="md:hidden">🎭</span>
              </TabsTrigger>
              <TabsTrigger 
                value="restaurants" 
                className="py-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2"
              >
                <span className="hidden md:inline">Restaurants</span>
                <span className="md:hidden">🍽️</span>
              </TabsTrigger>
              <TabsTrigger 
                value="vacation-rentals" 
                className="py-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2"
              >
                <span className="hidden md:inline">Vacation Rentals</span>
                <span className="md:hidden">🏡</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className={cn(
            "bg-white rounded-full shadow-lg transition-all duration-200",
            isSearchFocused ? "rounded-b-none" : ""
          )}>
            <TabsContent value="hotels" className="mt-0 p-0  rounded-full">
              <div className="flex flex-col md:flex-row items-stretch gap-2 p-3 rounded-full">
                <div className="relative w-full flex-1 rounded-full">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal rounded-full border-2 h-12"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date?.from ? 
                          date.to ? 
                            `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}` : 
                            date.from.toLocaleDateString() 
                          : "Check in - Check out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="range" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="rounded-full border-2 h-12">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black h-12 font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="things-to-do" className="mt-0 p-0">
              <div className="flex flex-col md:flex-row items-stretch gap-2 p-3">
                <div className="relative w-full flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black h-12 font-medium mt-2 md:mt-0">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="restaurants" className="mt-0 p-0">
              <div className="flex flex-col md:flex-row items-stretch gap-2 p-3">
                <div className="relative w-full flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black h-12 font-medium mt-2 md:mt-0">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="vacation-rentals" className="mt-0 p-0">
              <div className="flex flex-col md:flex-row items-stretch gap-2 p-3">
                <div className="relative w-full flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal rounded-full border-2 h-12"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date?.from ? 
                          date.to ? 
                            `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}` : 
                            date.from.toLocaleDateString() 
                          : "Check in - Check out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="range" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black h-12 font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Search Suggestions Dropdown */}
        {isSearchFocused && (
          <div className="absolute w-full bg-white backdrop-blur-3xl shadow-lg rounded-xl border-t z-50">
            {/* Nearby section */}
            <div className="p-4">
              <div className="flex items-center mb-2">
                <Navigation className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium text-sm">Nearby</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {popularDestinations.map((destination, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
                    onClick={() => {
                      setSearchQuery(destination.name)
                      setIsSearchFocused(false)
                    }}
                  >
                    <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{destination.name}</span>
                      <span className="text-xs text-gray-500">{destination.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent searches */}
            <div className="p-4 border-t">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium text-sm">Recent Searches</h3>
              </div>
              <ul className="space-y-2">
                {recentSearches.map((search, index) => (
                  <li key={index} className="cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors">
                    <button 
                      className="w-full text-left text-sm flex items-center"
                      onClick={() => {
                        setSearchQuery(search)
                        setIsSearchFocused(false)
                      }}
                    >
                      <span>{search}</span>
                      <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular destinations */}
            <div className="p-4 border-t">
              <h3 className="font-medium text-sm mb-3">Popular Destinations</h3>
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}