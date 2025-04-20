"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { popularDestinations, sponsoredContent } from "./SearchBar";

interface LocationSearchPanelProps {
  onSelect: (location: string) => void;
  searchQuery: string;
}

export default function LocationSearchPanel({ onSelect, searchQuery }: LocationSearchPanelProps) {
  const [filteredDestinations, setFilteredDestinations] = useState(popularDestinations);
  
  // Filter destinations based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredDestinations(popularDestinations);
      return;
    }
    
    const filtered = popularDestinations.filter(
      dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredDestinations(filtered);
  }, [searchQuery]);

  return (
    <div className="p-4 max-h-[70vh] overflow-y-auto">
      {/* Nearby option */}
      <div 
        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        onClick={() => onSelect("Nearby")}
      >
        <div className="bg-gray-100 p-2 rounded-full">
          <MapPin className="w-5 h-5 text-gray-600" />
        </div>
        <span className="font-medium">Nearby</span>
      </div>
      
      {/* Sponsored content */}
      <div className="mt-4">
        <div 
          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => onSelect(sponsoredContent.title)}
        >
          <div className="relative w-12 h-12 overflow-hidden rounded-lg">
            <Image 
              src={sponsoredContent.image} 
              alt={sponsoredContent.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{sponsoredContent.title}</div>
            <div className="text-xs text-gray-500">Sponsored by {sponsoredContent.sponsor}</div>
          </div>
        </div>
      </div>
      
      {/* Popular destinations */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Destinations</h3>
        <div className="space-y-1">
          {filteredDestinations.map((destination) => (
            <div 
              key={destination.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onSelect(destination.name)}
            >
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image 
                  src={destination.image} 
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{destination.name}</div>
                <div className="text-xs text-gray-500">{destination.region}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* No results state */}
      {searchQuery && filteredDestinations.length === 0 && (
        <div className="py-4 text-center text-gray-500">
          No destinations found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
