"use client"

import { useState } from "react"
import { Search, MapPin, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<Date>()
  const [guests, setGuests] = useState("2")

  return (
    <div className="w-full rounded-full bg-white p-1 shadow-lg">
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20 rounded-full p-1">
          <TabsTrigger value="hotels" className="rounded-full data-[state=active]:bg-white">
            Hotels
          </TabsTrigger>
          <TabsTrigger value="things-to-do" className="rounded-full data-[state=active]:bg-white">
            Things to Do
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="rounded-full data-[state=active]:bg-white">
            Restaurants
          </TabsTrigger>
          <TabsTrigger value="vacation-rentals" className="rounded-full data-[state=active]:bg-white">
            Vacation Rentals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hotels" className="mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Where to?"
                className="w-full rounded-full pl-10 pr-4 py-6 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto justify-start text-left font-normal rounded-full"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Check in - Check out"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="range" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="w-full sm:w-[140px] rounded-full">
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
              <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="things-to-do" className="mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Find things to do"
                className="w-full rounded-full pl-10 pr-4 py-6 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="restaurants" className="mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Find restaurants"
                className="w-full rounded-full pl-10 pr-4 py-6 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="vacation-rentals" className="mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Find vacation rentals"
                className="w-full rounded-full pl-10 pr-4 py-6 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto justify-start text-left font-normal rounded-full"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Check in - Check out"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="range" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Button className="rounded-full bg-[#34e0a1] hover:bg-[#2bc889] text-black">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
