'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Card } from "./ui/card";

export default function TravelPlanner() {
  // Animation state for the gradient orbs
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const [offset3, setOffset3] = useState(0);

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
            <Button 
              className="inline-flex items-center rounded-full gap-2 px-6 py-6 text-lg font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
              size="lg"
            >
              <Wand2 className="w-5 h-5" />
              <span>Start a trip with AI</span>
            </Button>
          </div>
        </div>

      </div>
    </Card>
  );
}