"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Heart, User, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';

const navigationItems = [
  { name: 'Flights', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
    </svg>
  ), href: '/flights' },
  { name: 'Stays', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22h20"></path>
      <path d="M6 12v4"></path>
      <path d="M18 12v4"></path>
      <path d="M12 12v4"></path>
      <path d="M22 7H2v5h20V7z"></path>
      <path d="M22 2H2v5h20V2z"></path>
      <path d="M17 12v10"></path>
      <path d="M7 12v10"></path>
    </svg>
  ), href: '/stays' },
  { name: 'Cars', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
      <circle cx="7" cy="17" r="2"></circle>
      <path d="M9 17h6"></path>
      <circle cx="17" cy="17" r="2"></circle>
    </svg>
  ), href: '/cars' },
  { name: 'Packages', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.29 7 12 12 20.71 7"></polyline>
      <line x1="12" y1="22" x2="12" y2="12"></line>
    </svg>
  ), href: '/packages' },
  { name: 'KAYAK.ai', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ), href: '/kayak-ai' },
];

export default function Header() {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Navigation Bar */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* KAYAK Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex">
                {['K', 'A', 'Y', 'A', 'K'].map((letter, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 flex items-center justify-center text-white font-bold bg-[#FF690F]"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </Link>
            
            {/* Browser-like URL bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-96">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 truncate">kayak.com</span>
            </div>
          </div>
          
          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" className="flex gap-2 font-medium">
              <User className="w-4 h-4" />
              <span>Sign in</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Service Navigation Tabs */}
      <div className="bg-gray-100 px-4 py-1">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar gap-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === item.name.toLowerCase() ? 'bg-[#FF690F] text-white' : 'bg-white text-gray-800'}`}
                onClick={() => setActiveTab(item.name.toLowerCase())}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-5 h-5">{item.icon}</span>
                {item.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="absolute top-5 left-4">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px]">
          <div className="flex flex-col h-full py-6">
            <div className="mb-8 flex items-center">
              <div className="flex">
                {['K', 'A', 'Y', 'A', 'K'].map((letter, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 flex items-center justify-center text-white font-bold bg-[#FF690F] text-xs"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
            
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-base ${activeTab === item.name.toLowerCase() ? 'bg-gray-100 text-[#FF690F]' : 'text-gray-700'}`}
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-200">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="w-4 h-4" />
                Sign in
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}