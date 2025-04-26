"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Hotel, 
  Utensils, 
  Ticket, 
  Coffee, 
  MapPin,
  Search,
  Navigation
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Language and region options
const regions = [
  { name: "United States", language: "English", code: "en-US" },
  { name: "United Kingdom", language: "English", code: "en-GB" },
  { name: "Argentina", language: "Español", code: "es-AR" },
  { name: "Australia", language: "English", code: "en-AU" },
  { name: "België", language: "Nederlands", code: "nl-BE" },
  { name: "Belgique", language: "Français", code: "fr-BE" },
  { name: "Brazil", language: "Português", code: "pt-BR" },
  { name: "Canada (English)", language: "English", code: "en-CA" },
  { name: "Canada (Français)", language: "Français", code: "fr-CA" },
  { name: "Chile", language: "Español", code: "es-CL" },
  { name: "Colombia", language: "Español", code: "es-CO" },
]

export default function Navbar() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentRegion, setCurrentRegion] = useState({ name: "United States", language: "English", code: "en-US" })
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  
  // Listen for scroll to show/hide the search bar
  useEffect(() => {
    const handleScroll = () => {
      const searchBarElement = document.getElementById('main-search-bar')
      if (searchBarElement) {
        const searchBarPosition = searchBarElement.getBoundingClientRect().top
        setIsSearchVisible(searchBarPosition < 0)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white backdrop-blur-lg">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
              alt="TripAdvisor" 
              width={150} 
              height={40} 
              className="h-10 w-auto" 
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="font-medium hover:text-gray-600 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors flex items-center gap-1">
            <span>Discover</span>
          </Link>
          <Link href="#" className="font-medium hover:text-gray-600 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors flex items-center gap-1">
            <span>Trips</span>
          </Link>
          <Link href="#" className="font-medium hover:text-gray-600 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors flex items-center gap-1">
            <span>Review</span>
          </Link>
          <Link href="#" className="font-medium hover:text-gray-600 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors flex items-center gap-1">
            <span>More</span>
          </Link>
        </nav>
        
        {/* Sticky Search Bar (appears when scrolled) */}
        {isSearchVisible && (
          <div className="hidden md:flex flex-1 mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Where to?"
                className="w-full h-10 rounded-full pl-10 pr-4 border focus-visible:ring-0 focus-visible:border-black text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
            </div>
            
            {/* Search Dropdown */}
            {isSearchFocused && (
              <>
                {/* Fixed overlay that covers the entire page */}
                <div 
                  className="fixed inset-0 bg-black/60 z-[100] w-screen h-screen" 
                  onClick={() => setIsSearchFocused(false)}
                  style={{ pointerEvents: 'auto' }}
                />
                {/* Search dialog */}
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white shadow-xl rounded-xl border z-[101] max-h-[70vh] overflow-y-auto">
                  <div className="p-4 border-b">
                    <div className="relative w-full">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <Input
                        placeholder="Where to?"
                        className="w-full rounded-full pl-10 pr-4 py-6 border-2 focus-visible:ring-0 focus-visible:border-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  
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
                        <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center">
                          <Navigation className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">Nearby</span>
                          <span className="text-xs text-gray-500">Use current location</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <h3 className="font-medium">Popular Destinations</h3>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {[
                        { name: "Dubai", location: "United Arab Emirates", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/78/84/94/dubai-aquarium-underwater.jpg?w=200&h=200&s=1" },
                        { name: "London", location: "United Kingdom", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/af/70/3c/the-white-tower-the-norman.jpg?w=200&h=-1&s=1" },
                        { name: "Paris", location: "France", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=200&h=200&s=1" }
                      ].map((destination, index) => (
                        <button
                          key={index}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer w-full"
                          onClick={() => {
                            setSearchQuery(destination.name)
                            setIsSearchFocused(false)
                          }}
                        >
                          <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
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
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Currency/Region Selector */}
          <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change region</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Preferences</DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="region" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="region" className="text-base">Region and Language</TabsTrigger>
                  <TabsTrigger value="currency" className="text-base">Currency</TabsTrigger>
                </TabsList>
                
                <TabsContent value="region" className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium mb-3">Choose a region and language</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {regions.map((region) => (
                        <button
                          key={region.code}
                          className={cn(
                            "p-3 border rounded-xl text-left hover:bg-gray-50 transition-colors cursor-pointer",
                            currentRegion.code === region.code && "bg-black text-white hover:bg-black/90"
                          )}
                          onClick={() => setCurrentRegion(region)}
                        >
                          <p className="font-medium">{region.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{region.language}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Any changes to the preferences are optional, and will persist through your user session.
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 flex justify-end">
                <DialogClose asChild>
                  <Button className="rounded-full bg-green-600">Save</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Sign In Dialog */}
          <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="hidden md:flex rounded-full bg-black text-white hover:bg-black/80">
                Sign in
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader className="items-center text-center">
                <Image 
                  src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_Logo_dark-bg_circle-green_horizontal-lockup_registered_RGB.svg" 
                  alt="Tripadvisor" 
                  width={250} 
                  height={250} 
                  className="mx-auto mb-4" 
                />
                <DialogTitle className="text-xl font-bold">Sign in to unlock the best of Tripadvisor.</DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-col gap-3 py-4 md:mb-48">
                <Button variant="outline" className="w-full font-semibold justify-start gap-2 h-12 rounded-full border-2 border-black">
                  <Image src="https://static.tacdn.com/img2/google/G_color_40x40.png" alt="Google" width={20} height={20} />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full font-semibold justify-start gap-2 h-12 rounded-full border-2 border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Continue with email
                </Button>
              </div>
              
              <div className="text-xs text-center text-gray-500 mt-4">
                <p>
                  By proceeding, you agree to our Terms of Use and confirm you have read our Privacy and Cookie Statement.
                </p>
                <p className="mt-2">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      <span>Hotels</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      <span>Restaurants</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      <span>Things to Do</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      <span>Vacation Rentals</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Travel Stories</span>
                    </Link>
                  </Button>
                </div>
                
                <div className="border-t pt-4 flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <span>Review</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <span>Trips</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <span>Alerts</span>
                    </Link>
                  </Button>
                </div>
                
                <div className="border-t pt-4 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-between w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsPreferencesOpen(true)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{currentRegion.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full hover:bg-black/80"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsSignInOpen(true)
                    }}
                  >
                    Sign in
                  </Button>
                  
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
