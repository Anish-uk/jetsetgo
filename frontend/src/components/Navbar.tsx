"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Plane,
  Hotel,
  Globe,
  Menu,
  X,
  User,
  Bell,
  ChevronDown,
  Heart,
  Compass,
  Settings,
  HelpCircle,
  LogOut,
  Luggage,
  Calendar,
} from "lucide-react";

const navItems = [
  {
    name: "Explore",
    href: "/explore",
    icon: <Compass size={18} />,
    badge: "AI",
  },
  { name: "Flights", href: "/flights", icon: <Plane size={18} /> },
  { name: "Hotels", href: "/hotels", icon: <Hotel size={18} /> },
  { name: "Destinations", href: "/destinations", icon: <Globe size={18} /> },
  { name: "My Trips", href: "/trips", icon: <Luggage size={18} /> },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-[#222831]/5"
          : "bg-gradient-to-b from-black/50 via-black/20 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-[#00ADB5]/30 group-hover:shadow-[#00ADB5]/50 transition-all duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="JetSetGo Logo"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? "text-[#222831]" : "text-white"}`}
              >
                JetSetGo
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${isScrolled ? "text-[#393E46]" : "text-white/70"}`}
              >
                AI Travel Companion
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#00ADB5] text-white shadow-lg shadow-[#00ADB5]/30"
                      : isScrolled
                        ? "text-[#393E46] hover:bg-[#222831]/5 hover:text-[#222831]"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "animate-bounce-soft" : ""}>
                    {item.icon}
                  </span>
                  {item.name}
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#00ADB5] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              className={`hidden md:flex relative p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#00ADB5] rounded-full border-2 border-white animate-pulse" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
                  isScrolled ? "hover:bg-[#222831]/5" : "hover:bg-white/10"
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#222831] to-[#393E46] rounded-xl flex items-center justify-center shadow-md">
                  <User size={20} className="text-[#00ADB5]" />
                </div>
                <div className="text-left">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-[#222831]" : "text-white"}`}
                  >
                    Guest User
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${isScrolled ? "text-[#393E46]" : "text-white/70"}`}
                  >
                    Free Plan
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-all duration-300 ${isProfileOpen ? "rotate-180" : ""} ${isScrolled ? "text-[#393E46]" : "text-white/70"}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-[#222831]/10 border border-[#EEEEEE] overflow-hidden animate-scale-in">
                  <div className="p-4 bg-gradient-to-r from-[#222831] to-[#393E46]">
                    <p className="font-medium text-white">Guest User</p>
                    <p className="text-sm text-[#EEEEEE]/70">
                      guest@jetsetgo.com
                    </p>
                  </div>
                  <div className="p-2">
                    {[
                      {
                        icon: <User size={16} />,
                        label: "My Profile",
                        href: "/settings",
                      },
                      {
                        icon: <Heart size={16} />,
                        label: "Wishlist",
                        href: "/wishlist",
                      },
                      {
                        icon: <Calendar size={16} />,
                        label: "Bookings",
                        href: "/bookings",
                      },
                      {
                        icon: <Settings size={16} />,
                        label: "Settings",
                        href: "/settings",
                      },
                      {
                        icon: <HelpCircle size={16} />,
                        label: "Help Center",
                        href: "/help",
                      },
                    ].map((item, i) => (
                      <Link
                        key={`profile-${i}`}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/5 rounded-xl transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t border-[#EEEEEE]">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-3 rounded-xl transition-colors ${
                isScrolled
                  ? "text-[#222831] hover:bg-[#222831]/5"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EEEEEE] animate-slide-down">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-[#00ADB5] text-white"
                      : "text-[#393E46] hover:bg-[#222831]/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                  {item.badge && (
                    <span
                      className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#00ADB5] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#EEEEEE] mt-4">
              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 text-[#393E46] hover:bg-[#222831]/5 rounded-xl"
              >
                <Settings size={18} />
                Settings
              </Link>
              <Link
                href="/help"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 text-[#393E46] hover:bg-[#222831]/5 rounded-xl"
              >
                <HelpCircle size={18} />
                Help Center
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
