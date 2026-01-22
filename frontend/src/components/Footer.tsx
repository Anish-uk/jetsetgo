"use client";

import Link from "next/link";
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#222831] text-[#EEEEEE]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#009ca3] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00ADB5]/30">
                <Plane size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">JetSetGo</h2>
                <p className="text-xs text-[#EEEEEE]/60">AI Travel Companion</p>
              </div>
            </Link>
            <p className="text-[#EEEEEE]/70 mb-6 leading-relaxed">
              Your intelligent travel partner. We use cutting-edge AI to plan
              personalized journeys, find the best deals, and create
              unforgettable experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, href: "#" },
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={`social-${i}`}
                  href={social.href}
                  className="w-10 h-10 bg-[#393E46] hover:bg-[#00ADB5] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Plan Your Trip", href: "/" },
                { name: "Browse Flights", href: "/flights" },
                { name: "Find Hotels", href: "/hotels" },
                { name: "Popular Destinations", href: "/destinations" },
                { name: "Travel Deals", href: "/deals" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#00ADB5] transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                { name: "Help Center", href: "/help" },
                { name: "FAQs", href: "/help" },
                { name: "Contact Us", href: "/help" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#00ADB5] transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Stay Updated
            </h3>
            <p className="text-[#EEEEEE]/70 mb-4">
              Subscribe to get exclusive travel deals, tips, and inspiration
              delivered to your inbox.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#393E46] text-white placeholder-[#EEEEEE]/50 rounded-xl border border-[#393E46] focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all outline-none pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#00ADB5] hover:bg-[#009ca3] rounded-lg flex items-center justify-center transition-colors">
                <Send size={14} className="text-white" />
              </button>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-[#EEEEEE]/70">
                <Mail size={16} className="text-[#00ADB5]" />
                <span>hello@jetsetgo.ai</span>
              </div>
              <div className="flex items-center gap-3 text-[#EEEEEE]/70">
                <Phone size={16} className="text-[#00ADB5]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-[#EEEEEE]/70">
                <MapPin size={16} className="text-[#00ADB5]" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#393E46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#EEEEEE]/50 text-sm">
              © 2026 JetSetGo. All rights reserved. Made with ❤️ for travelers.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
