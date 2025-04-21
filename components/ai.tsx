'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, Mic, X, Send, Loader2, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the SpeechRecognition interface for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
    item(index: number): any;
    length: number;
  };
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: Event) => void;
}

interface Window {
  webkitSpeechRecognition: new () => SpeechRecognition;
}

// Mock trip data
const mockTrips = [
  {
    destination: "Bali, Indonesia",
    duration: "7 days",
    budget: "$1,500 - $2,500",
    activities: [
      { day: 1, title: "Arrival & Beach Relaxation", description: "Check in to your hotel in Seminyak and enjoy the sunset at Seminyak Beach" },
      { day: 2, title: "Ubud Cultural Tour", description: "Visit the Monkey Forest, Ubud Palace, and traditional art markets" },
      { day: 3, title: "Tegallalang Rice Terraces & Coffee Plantation", description: "Morning at the famous rice terraces followed by Balinese coffee tasting" },
      { day: 4, title: "Uluwatu Temple & Kecak Dance", description: "Visit the clifftop temple and watch the traditional Kecak fire dance at sunset" },
      { day: 5, title: "Nusa Penida Island Tour", description: "Day trip to Nusa Penida to see Kelingking Beach and Angel's Billabong" },
      { day: 6, title: "Mount Batur Sunrise Trek", description: "Early morning hike to catch the sunrise from an active volcano" },
      { day: 7, title: "Spa Day & Departure", description: "Morning spa treatment before afternoon departure" }
    ],
    accommodation: "Mix of boutique hotels and traditional Balinese villas",
    transportation: "Private driver and scooter rental",
    highlights: ["Pristine beaches", "Rich cultural experiences", "Lush rice terraces", "Vibrant nightlife", "Spiritual temples"]
  },
  {
    destination: "Kyoto, Japan",
    duration: "5 days",
    budget: "$2,000 - $3,000",
    activities: [
      { day: 1, title: "Arrival & Gion District", description: "Check in and evening stroll through the historic Gion district" },
      { day: 2, title: "Temple Tour", description: "Visit Kinkaku-ji (Golden Pavilion) and Fushimi Inari Shrine" },
      { day: 3, title: "Arashiyama Bamboo Grove & Monkey Park", description: "Morning at the bamboo forest and afternoon with Japanese macaques" },
      { day: 4, title: "Traditional Tea Ceremony & Nishiki Market", description: "Experience a traditional tea ceremony and explore the food market" },
      { day: 5, title: "Day Trip to Nara", description: "Visit Nara Park, Todai-ji Temple, and feed the sacred deer" }
    ],
    accommodation: "Traditional ryokan with tatami rooms and onsen",
    transportation: "Japan Rail Pass and local buses",
    highlights: ["Historic temples and shrines", "Traditional Japanese cuisine", "Cherry blossoms (spring) or autumn foliage", "Cultural experiences", "Peaceful gardens"]
  },
  {
    destination: "Santorini, Greece",
    duration: "6 days",
    budget: "$2,200 - $3,500",
    activities: [
      { day: 1, title: "Arrival & Oia Sunset", description: "Check in and watch the famous sunset from Oia" },
      { day: 2, title: "Fira to Oia Hike", description: "Scenic hike along the caldera from Fira to Oia" },
      { day: 3, title: "Catamaran Cruise", description: "Day cruise around the island with swimming stops and BBQ lunch" },
      { day: 4, title: "Wine Tasting Tour", description: "Visit local wineries and taste Santorini's unique volcanic wines" },
      { day: 5, title: "Beach Day", description: "Relax at Red Beach or Perissa Black Sand Beach" },
      { day: 6, title: "Ancient Akrotiri & Departure", description: "Morning visit to the archaeological site before departure" }
    ],
    accommodation: "Cave hotel with caldera view and private terrace",
    transportation: "Rental car or ATV",
    highlights: ["Breathtaking sunsets", "Whitewashed villages", "Volcanic beaches", "Aegean cuisine", "Stunning caldera views"]
  }
];

export default function TravelPlanner() {
  // Animation state for the gradient orbs
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const [offset3, setOffset3] = useState(0);
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedTrip, setGeneratedTrip] = useState<typeof mockTrips[0] | null>(null);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // Now TypeScript knows about webkitSpeechRecognition
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef!.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(Array.from(event.results))
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          setPrompt(transcript);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  // Focus input when dialog opens
  useEffect(() => {
    if (isDialogOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isDialogOpen]);
  
  // Handle microphone toggle
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setPrompt('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  // Handle trip generation
  const generateTrip = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGenerationStep(0);
    setGeneratedTrip(null);
    
    // Simulate AI thinking and generating content with steps
    const totalSteps = 5;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setGenerationStep(currentStep);
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        // Select a random mock trip
        const randomTrip = mockTrips[Math.floor(Math.random() * mockTrips.length)];
        setGeneratedTrip(randomTrip);
        setIsGenerating(false);
      }
    }, 1200);
  };
  
  // Reset the dialog state
  const resetDialog = () => {
    setPrompt('');
    setIsGenerating(false);
    setGenerationStep(0);
    setGeneratedTrip(null);
  };
  
  // Close dialog and reset state
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetDialog();
  };

  useEffect(() => {
    // Create smooth floating animations for gradient elements
    const animation1 = setInterval(() => {
      setOffset1(prev => (prev + 0.5) % 100);
    }, 50);
    
    const animation2 = setInterval(() => {
      setOffset2(prev => (prev + 0.3) % 100);
    }, 50);
    
    const animation3 = setInterval(() => {
      setOffset3(prev => (prev + 0.7) % 100);
    }, 50);

    return () => {
      clearInterval(animation1);
      clearInterval(animation2);
      clearInterval(animation3);
    };
  }, []);

  return (
    <>
      <Card className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl py-0">
        {/* Enhanced background with animated gradients */}
        <div className="relative h-[500px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 overflow-hidden">
        
        {/* Northern lights effect - animated gradient layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-transparent to-emerald-500/10 animate-pulse"
          style={{animationDuration: '8s'}}
        ></div>
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-500/20 animate-pulse"
          style={{animationDuration: '12s'}}
        ></div>
        
        {/* Animated floating orbs */}
        <div 
          className="absolute right-24 top-24 w-64 h-64 rounded-full bg-gradient-to-r from-teal-400/30 to-cyan-300/20 blur-3xl"
          style={{
            transform: `translate(${Math.sin(offset1 * 0.05) * 20}px, ${Math.cos(offset1 * 0.05) * 20}px)`,
          }}
        ></div>
        <div 
          className="absolute right-48 top-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-400/10 blur-3xl"
          style={{
            transform: `translate(${Math.sin(offset2 * 0.03) * 30}px, ${Math.cos(offset2 * 0.04) * 15}px)`,
          }}
        ></div>
        <div 
          className="absolute left-24 bottom-12 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/5 to-emerald-400/10 blur-3xl"
          style={{
            transform: `translate(${Math.sin(offset3 * 0.06) * 15}px, ${Math.cos(offset3 * 0.03) * 25}px)`,
          }}
        ></div>
        
        {/* Content */}
        <div className="relative flex flex-col justify-between h-full p-10 text-white z-10">
          {/* Header */}
          <div>
            <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
              <span className="mr-2">Powered by AI</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-white text-black rounded-full">BETA</span>
            </div>
          </div>
          
          {/* Main content */}
          <div className="z-10 max-w-lg mb-20">
            <h1 className="mb-4 text-6xl font-bold tracking-tight">
              Plan your kind of trip
            </h1>
            <p className="mb-8 text-3xl font-normal">
              Get custom recs for all the things you're into with AI trip builder.
            </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
                className="inline-flex items-center rounded-full gap-2 px-6 py-6 text-lg font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
                size="lg"
                onClick={() => setIsDialogOpen(true)}
              >
                <Wand2 className="w-5 h-5" />
                <span>Start a trip with AI</span>
              </Button>
              <Button 
                variant={'outline'}
                className="inline-flex items-center rounded-full gap-2 px-6 py-6 text-lg font-medium transition-all duration-500 bg-transparent ring-1 ring-white"
                size="lg"
                onClick={() => setIsDialogOpen(true)}
              >
                <Sparkles />
                <span>Search in your words</span>
              </Button>
          </div>
          </div>
        </div>

      </div>
      </Card>
      
      {/* AI Trip Planner Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] sm:max-h-[80vh] flex flex-col">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 p-6 relative overflow-hidden">
            {/* Background animations */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute right-10 top-10 w-32 h-32 rounded-full bg-gradient-to-r from-teal-400/30 to-cyan-300/20 blur-2xl"
                style={{
                  transform: `translate(${Math.sin(offset1 * 0.05) * 10}px, ${Math.cos(offset1 * 0.05) * 10}px)`,
                }}
              ></div>
              <div 
                className="absolute left-10 bottom-5 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-400/10 blur-2xl"
                style={{
                  transform: `translate(${Math.sin(offset2 * 0.03) * 15}px, ${Math.cos(offset2 * 0.04) * 8}px)`,
                }}
              ></div>
            </div>
            
            {/* Header */}
            <div className="flex justify-between items-center relative z-10 mb-4">
              <h2 className="text-xl font-bold text-white">AI Trip Planner</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCloseDialog}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Input area */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2 pl-5">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Describe your dream trip..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-white/60 focus:outline-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateTrip()}
                  disabled={isGenerating}
                />
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full text-white hover:bg-white/10",
                      isListening && "text-red-400 animate-pulse"
                    )}
                    onClick={toggleListening}
                    disabled={isGenerating}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/20 text-white hover:bg-white/30"
                    onClick={generateTrip}
                    disabled={!prompt.trim() || isGenerating}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <div className="relative">
                    {/* Pulsing circles animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-blue-500/20"
                          initial={{ width: 40, height: 40, opacity: 0 }}
                          animate={{
                            width: [40, 120],
                            height: [40, 120],
                            opacity: [0.7, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Center loader */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <Loader2 className="h-10 w-10 text-blue-500" />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-medium mb-2">Creating your perfect trip</h3>
                    <p className="text-gray-500">
                      {generationStep === 0 && "Analyzing your preferences..."}
                      {generationStep === 1 && "Searching for destinations..."}
                      {generationStep === 2 && "Finding the best activities..."}
                      {generationStep === 3 && "Optimizing your itinerary..."}
                      {generationStep === 4 && "Finalizing your custom trip plan..."}
                    </p>
                  </motion.div>
                </motion.div>
              ) : generatedTrip ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">{generatedTrip.destination}</h2>
                    <div className="flex justify-center gap-4 text-sm text-gray-500">
                      <span>{generatedTrip.duration}</span>
                      <span>•</span>
                      <span>{generatedTrip.budget}</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Trip Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedTrip.highlights.map((highlight, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Itinerary</h3>
                    <div className="space-y-4">
                      {generatedTrip.activities.map((activity) => (
                        <motion.div 
                          key={activity.day}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: activity.day * 0.1 }}
                          className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                              {activity.day}
                            </div>
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Accommodation</h3>
                      <p className="text-gray-600">{generatedTrip.accommodation}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Transportation</h3>
                      <p className="text-gray-600">{generatedTrip.transportation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Button 
                      className="rounded-full"
                      onClick={resetDialog}
                    >
                      Plan another trip
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Wand2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Tell me about your dream trip</h3>
                  <p className="text-gray-500 max-w-sm">
                    Try something like "Plan a relaxing beach vacation in Bali" or "Weekend getaway to wine country"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}