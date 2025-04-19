"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Search, ShoppingCart, Menu, X, ChevronDown, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Health & Fitness",
    "Music",
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  // Mock search suggestions
  const searchSuggestions = [
    { id: 1, title: "React JS - Complete Guide 2025", category: "Development", students: "1.2M+ students", image: "https://img-c.udemycdn.com/course/50x50/1362070_b9a1_2.jpg" },
    { id: 2, title: "Python for Data Science and Machine Learning", category: "Data Science", students: "890K+ students", image: "https://img-c.udemycdn.com/course/50x50/950390_270f_3.jpg" },
    { id: 3, title: "Complete Web Development Bootcamp", category: "Web Development", students: "750K+ students", image: "https://img-c.udemycdn.com/course/50x50/1565838_e54e_16.jpg" },
    { id: 4, title: "JavaScript - The Complete Guide", category: "Programming", students: "680K+ students", image: "https://img-c.udemycdn.com/course/50x50/851712_fc61_6.jpg" },
  ];

  const topSearches = [
    "javascript", "react", "python", "web development", "data science", "machine learning", "aws", "excel"
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out bg-white border-b border-gray-200",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="mr-4 flex-shrink-0 group">
          <h1 className="text-2xl font-bold text-[#1c1d1f] group-hover:text-[#a435f0] transition-colors duration-200">udemy</h1>
        </Link>

        {/* Categories dropdown - desktop only */}
        <div className="hidden md:block">
          <Select>
            <SelectTrigger className="w-auto border-none hover:bg-gray-100 focus:ring-0">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search bar - grows to fill space */}
        <div className="hidden md:flex flex-1 mx-4 relative" ref={searchRef}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search for anything"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:border-[#a435f0] focus:ring-[#a435f0]/20"
              onFocus={() => setIsSearchFocused(true)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Search suggestions dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="p-4">
                    {searchQuery ? (
                      <>
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">Suggested for you</h3>
                        <ul className="space-y-3">
                          {searchSuggestions.map((suggestion) => (
                            <li key={suggestion.id}>
                              <Link href="#" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors">
                                <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden">
                                  <Image 
                                    src={suggestion.image} 
                                    alt={suggestion.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                                  <p className="text-xs text-gray-500">{suggestion.category} • {suggestion.students}</p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">Top Searches</h3>
                        <div className="flex flex-wrap gap-2">
                          {topSearches.map((term, index) => (
                            <Link 
                              key={index} 
                              href="#" 
                              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            >
                              {term}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 border-t border-gray-200">
                    <Link href="#" className="text-[#a435f0] text-sm font-medium hover:text-[#8710d8] transition-colors">
                      Browse all courses
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Business link - desktop only */}
        <div className="hidden lg:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="mx-4 text-sm font-medium text-gray-800 hover:text-[#a435f0] transition-colors"
                >
                  Udemy Business
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p className="text-xs">Solutions for organizations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Teach on Udemy - desktop only */}
        <div className="hidden lg:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="mx-4 text-sm font-medium text-gray-800 hover:text-[#a435f0] transition-colors"
                >
                  Teach on Udemy
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p className="text-xs">Share your knowledge</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* My Learning - desktop only */}
        <div className="hidden lg:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="mx-4 text-sm font-medium text-gray-800 hover:text-[#a435f0] transition-colors"
                >
                  My Learning
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p className="text-xs">Access your courses</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Shopping cart with badge */}
        <div className="relative mx-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#" className="relative group">
                  <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-[#a435f0] transition-colors" />
                  <Badge className="absolute -top-2 -right-2 bg-[#a435f0] text-white px-1.5 py-0.5 text-xs rounded-full">
                    2
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p className="text-xs">Shopping Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Login and Signup buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            className="font-medium border-gray-700 text-gray-700 hover:bg-gray-100 hover:border-[#a435f0] hover:text-[#a435f0] transition-colors"
            size="sm"
          >
            Log in
          </Button>
          <Button 
            className="font-medium bg-[#a435f0] text-white hover:bg-[#8710d8] transition-colors"
            size="sm"
          >
            Sign up
          </Button>
        </div>

        {/* Language selector */}
        <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-2 border-gray-700 text-gray-700 hover:bg-gray-100 hover:border-[#a435f0] hover:text-[#a435f0] transition-colors group"
            >
              <Globe className="h-5 w-5 group-hover:text-[#a435f0] transition-colors" />
            </Button>
          </DialogTrigger>
          <DialogContent className=" rounded-2xl ">
            <DialogHeader>
              <DialogTitle className="text-center">Choose a language</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-md transition-colors",
                    selectedLanguage.code === language.code
                      ? "bg-[#a435f0]/10 text-[#a435f0]"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsLanguageDialogOpen(false);
                  }}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="flex-1 text-left">{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <Check className="h-4 w-4 text-[#a435f0]" />
                  )}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
        >
          <div className="container mx-auto px-4">
            {/* Mobile search */}
            <div className="relative my-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for anything"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:border-[#a435f0] focus:ring-[#a435f0]/20"
              />
            </div>

            {/* Mobile categories */}
            <div className="space-y-2 my-4">
              <h3 className="font-bold text-gray-800 mb-2">Categories</h3>
              {categories.map((category) => (
                <Link
                  key={category}
                  href="#"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* Mobile business and teach links */}
            <div className="space-y-2 my-4 border-t border-gray-200 pt-4">
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Udemy Business
              </Link>
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Teach on Udemy
              </Link>
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                My Learning
              </Link>
            </div>

            {/* Mobile login/signup */}
            <div className="flex flex-col gap-2 my-4 border-t border-gray-200 pt-4">
              <Button
                variant="outline"
                className="w-full font-medium border-gray-700 text-gray-700 hover:border-[#a435f0] hover:text-[#a435f0] transition-colors"
              >
                Log in
              </Button>
              <Button className="w-full font-medium bg-[#a435f0] text-white hover:bg-[#8710d8] transition-colors">
                Sign up
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;