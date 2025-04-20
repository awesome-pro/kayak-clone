"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };
  
  return (
    <section className="py-12 mb-12 bg-blue-600 rounded-xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white/5 transform -skew-y-2"></div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/5 transform skew-y-2"></div>
      <div className="absolute top-1/4 left-0 w-24 h-24 rounded-full bg-white/10 -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-32 h-32 rounded-full bg-white/10 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Travel Deals & Inspiration
            </h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter and be the first to know about exclusive deals, seasonal specials, and travel tips.
            </p>
            
            <div className="mb-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-blue-100 focus:border-white"
                  />
                  <Button type="submit" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Send className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/20 rounded-md p-4 inline-flex items-center text-white"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2 text-white" />
                  Thank you for subscribing!
                </motion.div>
              )}
            </div>
            
            <p className="text-xs text-blue-200">
              By subscribing, you agree to receive marketing emails from KAYAK. You can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}