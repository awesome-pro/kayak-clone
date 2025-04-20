// /components/sections/FAQSection.tsx
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I find the cheapest flights on KAYAK?",
    answer: "KAYAK searches hundreds of travel sites to help you find the cheapest flights. You can also use our Price Forecast tool to predict whether the price of a flight will change within 7 days, helping you decide whether to book now or wait."
  },
  {
    question: "What is the best day to buy airline tickets?",
    answer: "According to our data, the best day to book flights is typically on Tuesday or Wednesday. However, prices can vary depending on your destination, the time of year, and how far in advance you're booking."
  },
  {
    question: "How does KAYAK find such cheap flights?",
    answer: "KAYAK searches hundreds of travel sites at once to find the information you need to make the right decisions on flights, hotels, rental cars and vacation packages."
  },
  {
    question: "Does KAYAK charge a fee?",
    answer: "No, KAYAK does not charge any fees for using our service. We're a free travel search engine that helps you find the best prices on flights, hotels, rental cars, and vacation packages."
  },
  {
    question: "Can I cancel my flight booked through KAYAK?",
    answer: "KAYAK is a travel search engine, not a booking agent. When you find a flight you want to book, we redirect you to the airline or travel agent to complete your purchase. Cancellation policies will depend on the rules of the airline or travel agent you book with."
  }
]

export default function FAQSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-8">Frequently asked questions</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}