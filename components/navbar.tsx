"use client"

import { useState } from "react"
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
  Search
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-lg">
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
              <Button size="lg" className="hidden md:flex rounded-full bg-black text-white">
                Sign in
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="items-center text-center">
                <Image 
                   src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
                   alt="TripAdvisor" 
                  width={60} 
                  height={60} 
                  className="mx-auto mb-4" 
                />
                <DialogTitle className="text-xl font-bold">Sign in to unlock the best of Tripadvisor.</DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-col gap-3 py-4">
                <Button variant="outline" className="w-full justify-start gap-2 h-12">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width={20} height={20} />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-12">
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
                    className="w-full rounded-full"
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
