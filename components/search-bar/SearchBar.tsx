"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchTabs from "./SearchTabs";
import DateRangePicker from "./DateRangePicker";
import TravelersSelector from "./TravelersSelector";
import LocationSearchPanel from "./LocationSearchPanel";

// Mock popular destinations data
export const popularDestinations = [
  {
    id: "dubai",
    name: "Dubai",
    region: "Emirate of Dubai, United Arab Emirates",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/a3/a1/dubai-from-the-sky.jpg?w=100&h=100&s=1"
  },
  {
    id: "istanbul",
    name: "Istanbul",
    region: "Türkiye, Europe",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f7/0e/istanbul.jpg?w=100&h=100&s=1"
  },
  {
    id: "london",
    name: "London",
    region: "England, United Kingdom",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/c4/a7/28/london.jpg?w=100&h=100&s=1"
  },
  {
    id: "paris",
    name: "Paris",
    region: "Île-de-France, France",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/7d/95/cf/paris.jpg?w=100&h=100&s=1"
  },
  {
    id: "new-york-city",
    name: "New York City",
    region: "New York, United States",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c0/f2/d1/new-york-city.jpg?w=100&h=100&s=1"
  },
  {
    id: "rome",
    name: "Rome",
    region: "Lazio, Italy",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/c1/3d/95/rome.jpg?w=100&h=100&s=1"
  }
];

// Sponsored content
export const sponsoredContent = {
  id: "dog-friendly",
  title: "Your guide to dog-friendly travels",
  sponsor: "CESAR",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/4d/67/4e/caption.jpg?w=100&h=100&s=1"
};

export type TabType = "search-all" | "hotels" | "things-to-do" | "restaurants" | "flights" | "vacation-rentals";

export default function SearchBar({ initialHeading = "Where to?" }) {
  const [activeTab, setActiveTab] = useState<TabType>("search-all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTravelersSelector, setShowTravelersSelector] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2025, 4, 5), // May 5, 2025
    to: new Date(2025, 4, 23), // May 23, 2025
  });
  const [travelers, setTravelers] = useState(1);
  const [heading, setHeading] = useState(initialHeading);
  
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Update heading based on active tab
  useEffect(() => {
    switch (activeTab) {
      case "search-all":
        setHeading("Where to?");
        break;
      case "hotels":
        setHeading("Stay somewhere great");
        break;
      case "things-to-do":
        setHeading("Find things to do");
        break;
      case "restaurants":
        setHeading("Find the best restaurants");
        break;
      case "flights":
        setHeading("Find the best flight");
        break;
      case "vacation-rentals":
        setHeading("Find the perfect rental");
        break;
      default:
        setHeading("Where to?");
    }
  }, [activeTab]);

  // Handle sticky behavior on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current) return;
      
      const searchBarTop = searchBarRef.current.getBoundingClientRect().top;
      if (searchBarTop <= 0 && !isSticky) {
        setIsSticky(true);
      } else if (searchBarTop > 0 && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current && 
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowLocationSearch(false);
        setShowDatePicker(false);
        setShowTravelersSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setShowLocationSearch(false);
    setShowDatePicker(false);
    setShowTravelersSelector(false);
    setSearchQuery("");
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (["search-all", "hotels", "things-to-do", "restaurants"].includes(activeTab)) {
      setShowLocationSearch(true);
      setShowDatePicker(false);
      setShowTravelersSelector(false);
    }
  };

  // Handle origin input focus for flights
  const handleOriginFocus = () => {
    if (activeTab === "flights" || activeTab === "vacation-rentals") {
      setShowLocationSearch(true);
      setShowDatePicker(false);
      setShowTravelersSelector(false);
    }
  };

  // Handle destination input focus for flights
  const handleDestinationFocus = () => {
    if (activeTab === "flights" || activeTab === "vacation-rentals") {
      setShowLocationSearch(true);
      setShowDatePicker(false);
      setShowTravelersSelector(false);
    }
  };

  // Handle date input click
  const handleDateClick = () => {
    setShowDatePicker(true);
    setShowLocationSearch(false);
    setShowTravelersSelector(false);
  };

  // Handle travelers selector click
  const handleTravelersClick = () => {
    setShowTravelersSelector(true);
    setShowLocationSearch(false);
    setShowDatePicker(false);
  };

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    if (activeTab === "flights" || activeTab === "vacation-rentals") {
      if (origin === "") {
        setOrigin(location);
      } else {
        setDestination(location);
      }
    } else {
      setSearchQuery(location);
    }
    setShowLocationSearch(false);
  };

  // Handle search submission
  const handleSearch = () => {
    // Here you would typically navigate to search results page
    console.log("Searching with:", {
      tab: activeTab,
      query: searchQuery,
      origin,
      destination,
      dateRange,
      travelers
    });
    
    // Close all dropdowns
    setShowLocationSearch(false);
    setShowDatePicker(false);
    setShowTravelersSelector(false);
  };

  return (
    <div 
      ref={searchBarRef}
      className={cn(
        "w-full transition-all duration-300 z-40",
        isSticky ? "fixed top-0 left-0 bg-white shadow-md py-2" : "relative"
      )}
    >
      <div className="container mx-auto px-4">
        {!isSticky && (
          <h1 className="text-4xl font-bold text-center mb-6">{heading}</h1>
        )}
        
        <SearchTabs activeTab={activeTab} onTabChange={handleTabChange} isSticky={isSticky} />
        
        <div className="relative mt-4">
          {/* Search inputs based on active tab */}
          {(activeTab === "search-all" || activeTab === "hotels" || activeTab === "things-to-do" || activeTab === "restaurants") && (
            <div className="relative flex items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Places to go, things to do, hotels..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-4 px-8 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          )}
          
          {/* Flights and Vacation Rentals have more complex search UI */}
          {(activeTab === "flights" || activeTab === "vacation-rentals") && (
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow md:w-1/4">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="From: Origin"
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  onFocus={handleOriginFocus}
                />
                {origin && (
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setOrigin("")}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <div className="relative flex-grow md:w-1/4">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="To: Destination"
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={handleDestinationFocus}
                />
                {destination && (
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setDestination("")}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <button
                className="relative flex-grow md:w-1/4 pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left"
                onClick={handleDateClick}
              >
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {dateRange.from && dateRange.to ? (
                  <span>
                    {dateRange.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {' '}
                    {dateRange.to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                ) : (
                  <span className="text-gray-500">Select dates</span>
                )}
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </button>
              
              <button
                className="relative flex-grow md:w-1/6 pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left"
                onClick={handleTravelersClick}
              >
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <span>{travelers} Traveler{travelers !== 1 ? 's' : ''}</span>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </button>
              
              <button
                onClick={handleSearch}
                className="flex-grow md:w-auto bg-teal-500 hover:bg-teal-600 text-white font-medium py-4 px-8 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          )}
          
          {/* Location search dropdown */}
          <AnimatePresence>
            {showLocationSearch && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
              >
                <LocationSearchPanel 
                  onSelect={handleLocationSelect}
                  searchQuery={activeTab === "flights" || activeTab === "vacation-rentals" ? (origin === "" ? origin : destination) : searchQuery}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Date picker dropdown */}
          <AnimatePresence>
            {showDatePicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
              >
                <DateRangePicker 
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  onClose={() => setShowDatePicker(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Travelers selector dropdown */}
          <AnimatePresence>
            {showTravelersSelector && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-72"
              >
                <TravelersSelector 
                  travelers={travelers}
                  onTravelersChange={setTravelers}
                  onClose={() => setShowTravelersSelector(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
