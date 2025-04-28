"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Calendar, X, Navigation, Clock, ChevronRight, Home, Hotel, Utensils, Plane, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineAttractions } from "react-icons/md";
import { DatePickerWithRange } from "./ui/date-range"

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

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("2")
  const [activeTab, setActiveTab] = useState("hotels")
  const [searchHeading, setSearchHeading] = useState("Explore places to rent")
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
  
  // Get the position of the search input for dialog positioning
  const [searchInputRect, setSearchInputRect] = useState<DOMRect | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Check if the search bar is in the navbar (sticky mode)
  const [isSticky, setIsSticky] = useState(false)
  
  // Update the search input position when it's focused
  const updateSearchInputPosition = () => {
    if (searchInputRef.current) {
      setSearchInputRect(searchInputRef.current.getBoundingClientRect())
    }
  }
  
  // Update position on window resize and check if search bar is sticky
  useEffect(() => {
    const handleScroll = () => {
      const searchBarElement = document.getElementById('main-search-bar')
      if (searchBarElement) {
        const searchBarPosition = searchBarElement.getBoundingClientRect().top
        setIsSticky(searchBarPosition < 0)
      }
    }
    
    if (isSearchFocused) {
      updateSearchInputPosition()
      window.addEventListener('resize', updateSearchInputPosition)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', updateSearchInputPosition)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSearchFocused])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Update heading based on selected tab
    switch(value) {
      case "all":
        setSearchHeading("Explore places to rent")
        break
      case "hotels":
        setSearchHeading("Find the perfect hotel")
        break
      case "things-to-do":
        setSearchHeading("Discover things to do")
        break
      case "restaurants":
        setSearchHeading("Find great places to eat")
        break
      case "vacation-rentals":
        setSearchHeading("Find your perfect vacation rental")
        break
      default:
        setSearchHeading("Explore places to rent")
    }
  }

  const placeholderByTab = {
    "hotels": "Where to?",
    "things-to-do": "Find things to do",
    "restaurants": "Find restaurants",
    "vacation-rentals": "Find vacation rentals"
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative z-10">
      <h1 className="text-5xl font-black text-center mb-8">{searchHeading}</h1>
      <div id="main-search-bar" className="relative" ref={searchRef}>
        <Tabs 
          defaultValue="hotels" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="bg-white rounded-t-xl">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto">
            <TabsTrigger value="all" className="flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                <span className="hidden md:block">Search All</span>
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center justify-center gap-2">
                <Hotel className="w-5 h-5" />
                <span className="hidden md:block">Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="things-to-do" className="flex items-center justify-center gap-2">
                <MdOutlineAttractions className="w-5 h-5" />
                <span className="hidden md:block">Things to Do</span>
              </TabsTrigger>
              <TabsTrigger value="restaurants" className="flex items-center justify-center gap-2">
                <Utensils className="w-5 h-5" />
                <span className="hidden md:block">Restaurants</span>
              </TabsTrigger>
              <TabsTrigger value="vacation-rentals" className="flex items-center justify-center gap-2">
                <Building className="w-5 h-5" />
                <span className="hidden md:block">Vacation Rentals</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className={cn(
            "bg-white rounded-full shadow-lg transition-all duration-200 mt-6",
            isSearchFocused ? "rounded-b-none" : ""
          )}>
            <TabsContent value="all" className="mt-0 p-0">
              <div className="flex flex-col md:flex-row items-stretch gap-2 p-3">
                <div className="relative w-full flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    ref={searchInputRef}
                    placeholder={'Search Anything'}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      updateSearchInputPosition()
                    }}
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

            <TabsContent value="hotels" className="mt-0 p-0  rounded-full">
              <div className="flex flex-col md:flex-row items-stretch gap-2 p-3 rounded-full">
                <div className="relative w-full flex-1 rounded-full">
                  <Input
                    ref={searchInputRef}
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      updateSearchInputPosition()
                    }}
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
                  <DatePickerWithRange />
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
                  <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black font-medium">
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
                    ref={searchInputRef}
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      updateSearchInputPosition()
                    }}
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
                <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black h-12 px-6 font-medium mt-2 md:mt-0">
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
                    ref={searchInputRef}
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      updateSearchInputPosition()
                    }}
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
                    ref={searchInputRef}
                    placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                    className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      updateSearchInputPosition()
                    }}
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

        {/* Dark overlay with pointer events only on the overlay, not affecting scroll */}
        {isSearchFocused && !isSticky && (
          <div className="fixed inset-0 bg-black/60 z-40 pointer-events-auto" 
            onClick={() => setIsSearchFocused(false)}
            style={{ pointerEvents: 'auto' }}
          ></div>
        )}
        
        {/* Search Suggestions Dropdown */}
        {isSearchFocused && searchInputRect && !isSticky && (
          <div 
            className="fixed bg-white shadow-xl rounded-xl border z-50 w-full max-w-4xl"
            style={{
              top: `${searchInputRect.top + window.scrollY}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {/* Search input at the top of dialog */}
            <div className="p-4 border-b">
              <div className="relative w-full">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder={placeholderByTab[activeTab as keyof typeof placeholderByTab]}
                  className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
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
            </div>
            
            {/* Nearby section */}
            <div className="p-4 border-b">
              <div className="flex items-center mb-4">
                <Navigation className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium">Nearby</h3>
              </div>
              <div className="space-y-3">
                <button
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer w-full"
                  onClick={() => {
                    setSearchQuery("Current location")
                    setIsSearchFocused(false)
                  }}
                >
                  <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center">
                    <Navigation className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Nearby</span>
                    <span className="text-sm text-gray-500">Use current location</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Popular Destinations */}
            <div className="p-4">
              <div className="flex items-center mb-4">
                <h3 className="font-medium">Popular Destinations</h3>
              </div>
              <div className="space-y-3">
                {popularDestinations.map((destination, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer w-full"
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
                      <span className="font-medium">{destination.name}</span>
                      <span className="text-sm text-gray-500">{destination.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}