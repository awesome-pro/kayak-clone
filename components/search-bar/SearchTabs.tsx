"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, Landmark, UtensilsCrossed, Plane, Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TabType } from "./SearchBar";

interface SearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isSticky?: boolean;
}

export default function SearchTabs({ activeTab, onTabChange, isSticky = false }: SearchTabsProps) {
  const tabs = [
    { id: "search-all", label: "Search All", icon: <Home className="w-5 h-5" /> },
    { id: "hotels", label: "Hotels", icon: <Building2 className="w-5 h-5" /> },
    { id: "things-to-do", label: "Things to Do", icon: <Landmark className="w-5 h-5" /> },
    { id: "restaurants", label: "Restaurants", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { id: "flights", label: "Flights", icon: <Plane className="w-5 h-5" /> },
    { id: "vacation-rentals", label: "Vacation Rentals", icon: <HomeIcon className="w-5 h-5" /> },
  ];

  return (
    <div className={cn(
      "flex justify-center",
      isSticky ? "mb-2" : "mb-4"
    )}>
      <div className="inline-flex border-b border-gray-200 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium relative",
              activeTab === tab.id
                ? "text-black"
                : "text-gray-500 hover:text-gray-800"
            )}
            onClick={() => onTabChange(tab.id as TabType)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
