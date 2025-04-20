"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  X, 
  Send, 
  ChevronDown, 
  Paperclip, 
  Image as ImageIcon, 
  Smile,
  User,
  Bot
} from "lucide-react";

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    message: "👋 Hi there! Welcome to TripAdvisor. I'm your virtual travel assistant. How can I help plan your next adventure?",
    timestamp: new Date(Date.now() - 1000 * 60 * 2) // 2 minutes ago
  },
  {
    id: 2,
    sender: "bot",
    message: "I can help you discover destinations, find hotels and restaurants, read reviews, or plan activities for your trip.",
    timestamp: new Date(Date.now() - 1000 * 60 * 1) // 1 minute ago
  }
];

// Quick reply suggestions
const quickReplies = [
  "Recommend a destination",
  "Find hotels near me",
  "Best restaurants in Paris",
  "Things to do in New York"
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate a response based on the user's message
      let botResponse = "";
      const userMsg = newMessage.toLowerCase();
      
      if (userMsg.includes("destination") || userMsg.includes("recommend") || userMsg.includes("where")) {
        botResponse = "Based on current trends, I'd recommend exploring Bali, Portugal, or Japan. These destinations offer amazing experiences for various budgets. Would you like specific recommendations for any of these places?";
      } else if (userMsg.includes("hotel") || userMsg.includes("stay") || userMsg.includes("accommodation")) {
        botResponse = "I can help you find the perfect hotel! Our Travelers' Choice hotels are rated based on millions of reviews. Do you have a specific location or budget in mind?";
      } else if (userMsg.includes("restaurant") || userMsg.includes("food") || userMsg.includes("eat")) {
        botResponse = "Finding great restaurants is one of our specialties! TripAdvisor has millions of restaurant reviews from travelers worldwide. Which cuisine are you interested in?";
      } else if (userMsg.includes("things to do") || userMsg.includes("activities") || userMsg.includes("attractions")) {
        botResponse = "From guided tours to hidden gems, I can help you discover the best activities for your trip. Many experiences can be booked directly through TripAdvisor with free cancellation options.";
      } else if (userMsg.includes("review") || userMsg.includes("rating")) {
        botResponse = "TripAdvisor has over 1 billion reviews from travelers around the world. These authentic experiences can help you make informed decisions about where to stay, eat, and what to do.";
      } else if (userMsg.includes("flight") || userMsg.includes("fly")) {
        botResponse = "You can compare flights on TripAdvisor to find the best prices. We search hundreds of airlines and travel sites to help you find great deals. When are you planning to travel?";
      } else {
        botResponse = "Thanks for your message! I'm here to help plan your perfect trip. Whether you need destination ideas, hotel recommendations, or activity suggestions, just let me know what you're looking for.";
      }
      
      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        message: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    // Focus the input after selecting a quick reply
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat bubble button */}
      <motion.button
        className="bg-[#34e0a1] text-black rounded-full p-4 shadow-lg hover:bg-[#2bc889] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>

      {/* Notification badge */}
      {!isOpen && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white rounded-full">
          2
        </Badge>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Chat header */}
            <div className="bg-[#34e0a1] text-black p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-1.5">
                  <MessageSquare className="h-5 w-5 text-[#34e0a1]" />
                </div>
                <div>
                  <h3 className="font-semibold">TripAdvisor Assistant</h3>
                  <div className="flex items-center text-xs text-gray-700">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-black hover:bg-[#2bc889]"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-black hover:bg-[#2bc889]"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-[350px] overflow-y-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex items-start gap-2 max-w-[80%] ${
                              msg.sender === "user" ? "flex-row-reverse" : ""
                            }`}
                          >
                            <div className="flex-shrink-0 mt-1">
                              {msg.sender === "user" ? (
                                <div className="bg-gray-100 rounded-full p-1">
                                  <User className="h-5 w-5 text-gray-600" />
                                </div>
                              ) : (
                                <div className="bg-[#34e0a1] rounded-full p-1">
                                  <Bot className="h-5 w-5 text-black" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div
                                className={`p-3 rounded-2xl ${
                                  msg.sender === "user"
                                    ? "bg-[#34e0a1] text-black rounded-tr-none"
                                    : "bg-white border border-gray-200 rounded-tl-none"
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                              </div>
                              <div
                                className={`text-xs mt-1 text-gray-500 ${
                                  msg.sender === "user" ? "text-right" : ""
                                }`}
                              >
                                {formatTime(msg.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-2 max-w-[80%]">
                            <div className="flex-shrink-0 mt-1">
                              <div className="bg-[#34e0a1] rounded-full p-1">
                                <Bot className="h-5 w-5 text-black" />
                              </div>
                            </div>
                            <div>
                              <div className="p-3 rounded-2xl bg-white border border-gray-200 rounded-tl-none">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Quick replies */}
                  {messages.length <= 3 && (
                    <div className="p-3 bg-white border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Suggested replies:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs bg-gray-100 hover:bg-[#e6f9f1] text-gray-800 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat input */}
                  <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1 border-gray-300 focus-visible:ring-[#34e0a1]"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-[#34e0a1] hover:bg-[#2bc889] text-black rounded-full p-2 h-10 w-10"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-[#34e0a1] transition-colors">
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-[#34e0a1] transition-colors">
                          <ImageIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-[#34e0a1] transition-colors">
                          <Smile className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Powered by TripAdvisor AI</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;
