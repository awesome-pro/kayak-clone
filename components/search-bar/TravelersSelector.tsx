"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";

interface TravelersSelectorProps {
  travelers: number;
  onTravelersChange: (count: number) => void;
  onClose: () => void;
}

export default function TravelersSelector({ travelers, onTravelersChange, onClose }: TravelersSelectorProps) {
  const handleIncrement = () => {
    onTravelersChange(travelers + 1);
  };

  const handleDecrement = () => {
    if (travelers > 1) {
      onTravelersChange(travelers - 1);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Travelers</h3>
      
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="font-medium">Adults</p>
          <p className="text-sm text-gray-500">Ages 18+</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            disabled={travelers <= 1}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-8 text-center">{travelers}</span>
          
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
        >
          Done
        </button>
      </div>
    </div>
  );
}
