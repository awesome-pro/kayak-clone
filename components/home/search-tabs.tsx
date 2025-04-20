"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Plane, Hotel, Car, Package, Calendar, MapPin, Users, Search 
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

const locations = [
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "Rome, Italy",
  "Sydney, Australia",
  "Dubai, UAE",
  "Singapore",
];

export default function SearchTabs() {
  const [selectedTab, setSelectedTab] = useState('flights');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [adults, setAdults] = useState(1);

  return (
    <div className="relative -mt-20 z-20 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mx-auto max-w-5xl">
        <Tabs 
          defaultValue="flights" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="flights" onClick={() => setSelectedTab('flights')}>
              <Plane className="h-4 w-4 mr-2" />
              <span>Flights</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" onClick={() => setSelectedTab('hotels')}>
              <Hotel className="h-4 w-4 mr-2" />
              <span>Hotels</span>
            </TabsTrigger>
            <TabsTrigger value="cars" onClick={() => setSelectedTab('cars')}>
              <Car className="h-4 w-4 mr-2" />
              <span>Cars</span>
            </TabsTrigger>
            <TabsTrigger value="packages" onClick={() => setSelectedTab('packages')}>
              <Package className="h-4 w-4 mr-2" />
              <span>Packages</span>
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="flights" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from" className="text-sm font-medium">From</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="from"
                          placeholder="City or airport"
                          className="pl-9"
                          list="from-locations"
                        />
                        <datalist id="from-locations">
                          {locations.map((location) => (
                            <option key={location} value={location} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="to" className="text-sm font-medium">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="to"
                          placeholder="City or airport"
                          className="pl-9"
                          list="to-locations"
                        />
                        <datalist id="to-locations">
                          {locations.map((location) => (
                            <option key={location} value={location} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="depart" className="text-sm font-medium">Depart</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={fromDate}
                              onSelect={setFromDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="return" className="text-sm font-medium">Return</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={toDate}
                              onSelect={setToDate}
                              initialFocus
                              fromDate={fromDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="travelers" className="text-sm font-medium">Travelers</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            {adults} {adults === 1 ? 'Adult' : 'Adults'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Adults</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setAdults(Math.max(1, adults - 1))}
                                >
                                  -
                                </Button>
                                <span>{adults}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setAdults(adults + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" size="lg">
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="hotels" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="destination" className="text-sm font-medium">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        id="destination"
                        placeholder="City, neighborhood, or hotel"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="check-in" className="text-sm font-medium">Check in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={fromDate}
                              onSelect={setFromDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="check-out" className="text-sm font-medium">Check out</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={toDate}
                              onSelect={setToDate}
                              initialFocus
                              fromDate={fromDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="guests" className="text-sm font-medium">Guests</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            {adults} {adults === 1 ? 'Guest' : 'Guests'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Guests</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setAdults(Math.max(1, adults - 1))}
                                >
                                  -
                                </Button>
                                <span>{adults}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setAdults(adults + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" size="lg">
                    <Search className="mr-2 h-4 w-4" />
                    Search Hotels
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="cars" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup" className="text-sm font-medium">Pick-up location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="pickup"
                          placeholder="City or airport"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dropoff" className="text-sm font-medium">Drop-off location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="dropoff"
                          placeholder="Same as pick-up"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup-date" className="text-sm font-medium">Pick-up date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={fromDate}
                            onSelect={setFromDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="dropoff-date" className="text-sm font-medium">Drop-off date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                            initialFocus
                            fromDate={fromDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" size="lg">
                    <Search className="mr-2 h-4 w-4" />
                    Search Cars
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="packages" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="package-from" className="text-sm font-medium">From</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="package-from"
                          placeholder="City or airport"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="package-to" className="text-sm font-medium">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="package-to"
                          placeholder="City or airport"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="package-depart" className="text-sm font-medium">Depart</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={fromDate}
                              onSelect={setFromDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="package-return" className="text-sm font-medium">Return</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={toDate}
                              onSelect={setToDate}
                              initialFocus
                              fromDate={fromDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="package-travelers" className="text-sm font-medium">Travelers</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            {adults} {adults === 1 ? 'Traveler' : 'Travelers'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Travelers</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setAdults(Math.max(1, adults - 1))}
                                >
                                  -
                                </Button>
                                <span>{adults}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setAdults(adults + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" size="lg">
                    <Search className="mr-2 h-4 w-4" />
                    Search Packages
                  </Button>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}