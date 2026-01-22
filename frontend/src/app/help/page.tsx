"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Book,
  Headphones,
  FileText,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    q: "How do I book a flight?",
    a: "Use our AI-powered search on the home page. Simply enter your destination, dates, and budget, and our AI will find the best options for you.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Yes! Most bookings can be cancelled within 24 hours for a full refund. Check the specific cancellation policy on your booking confirmation.",
  },
  {
    q: "How does the AI trip planner work?",
    a: "Our AI analyzes your preferences, budget, and travel dates to create personalized itineraries with flights, hotels, and activities tailored just for you.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. We use bank-level encryption and never store your full card details on our servers.",
  },
  {
    q: "Can I modify my itinerary?",
    a: "Yes, you can modify your itinerary at any time before your trip. Changes may be subject to availability and price adjustments.",
  },
];

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Chat with our support team 24/7",
    action: "Start Chat",
    color: "#00ADB5",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Get a response within 24 hours",
    action: "Send Email",
    color: "#393E46",
  },
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Call us Mon-Fri, 9AM-6PM",
    action: "+1 (800) 123-4567",
    color: "#222831",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/dubai.jpg"
            alt="Help background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">💬</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">❓</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <HelpCircle size={16} />
            We are here to help
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Help Center
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto mb-8">
            Find answers to common questions or reach out to our support team
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E46]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-[#222831] placeholder-[#393E46]/50 shadow-xl focus:ring-4 focus:ring-[#00ADB5]/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Book, title: "Getting Started", desc: "Learn the basics" },
            { icon: FileText, title: "Documentation", desc: "Detailed guides" },
            {
              icon: Headphones,
              title: "Contact Support",
              desc: "Reach our team",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card p-6 text-center card-hover opacity-0 animate-slide-up cursor-pointer group"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="w-14 h-14 bg-[#00ADB5]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00ADB5] transition-all">
                <item.icon
                  size={24}
                  className="text-[#00ADB5] group-hover:text-white transition-all"
                />
              </div>
              <h3 className="text-lg font-bold text-[#222831] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-[#393E46]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#222831] mb-6 flex items-center gap-2">
            <Sparkles size={24} className="text-[#00ADB5]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden opacity-0 animate-slide-up"
                style={{
                  animationDelay: `${index * 0.05 + 0.3}s`,
                  animationFillMode: "forwards",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-[#222831]">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-[#00ADB5] shrink-0" />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-[#393E46] shrink-0"
                    />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-[#393E46] border-t border-[#EEEEEE] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div>
          <h2 className="text-2xl font-bold text-[#222831] mb-6">
            Contact Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, i) => (
              <div
                key={i}
                className="card p-6 card-hover opacity-0 animate-slide-up"
                style={{
                  animationDelay: `${i * 0.1 + 0.5}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${option.color}20` }}
                >
                  <option.icon size={22} style={{ color: option.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#222831] mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-[#393E46] mb-4">{option.desc}</p>
                <button className="text-[#00ADB5] font-medium text-sm hover:underline">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
