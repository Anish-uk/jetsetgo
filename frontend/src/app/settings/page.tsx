"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Settings,
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Shield,
  Mail,
  Sparkles,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deals: false,
    updates: true,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/singapore.jpg"
            alt="Settings background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">⚙️</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">🔧</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Settings size={16} />
            Preferences
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Settings
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto">
            Customize your JetSetGo experience
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <div
          className="card p-6 mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "0s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#00ADB5]/10 rounded-xl">
              <User size={20} className="text-[#00ADB5]" />
            </div>
            <h2 className="text-xl font-bold text-[#222831]">Profile</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#393E46] mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Traveler"
                className="w-full px-4 py-3 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#393E46] mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-4 py-3 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="card p-6 mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#00ADB5]/10 rounded-xl">
              <Bell size={20} className="text-[#00ADB5]" />
            </div>
            <h2 className="text-xl font-bold text-[#222831]">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                key: "email",
                label: "Email Notifications",
                desc: "Receive booking confirmations via email",
              },
              {
                key: "push",
                label: "Push Notifications",
                desc: "Get real-time updates on your device",
              },
              {
                key: "deals",
                label: "Deals & Offers",
                desc: "Be notified about special travel deals",
              },
              {
                key: "updates",
                label: "Trip Updates",
                desc: "Receive updates about your upcoming trips",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-3 border-b border-[#EEEEEE] last:border-0"
              >
                <div>
                  <p className="font-medium text-[#222831]">{item.label}</p>
                  <p className="text-sm text-[#393E46]">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]:
                        !notifications[item.key as keyof typeof notifications],
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-all relative ${notifications[item.key as keyof typeof notifications] ? "bg-[#00ADB5]" : "bg-gray-300"}`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[item.key as keyof typeof notifications] ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div
          className="card p-6 mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#00ADB5]/10 rounded-xl">
              <Globe size={20} className="text-[#00ADB5]" />
            </div>
            <h2 className="text-xl font-bold text-[#222831]">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#EEEEEE]">
              <div>
                <p className="font-medium text-[#222831]">Currency</p>
                <p className="text-sm text-[#393E46]">
                  Select your preferred currency
                </p>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-2 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (Pound)</option>
                <option value="INR">INR (Rupee)</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon size={20} className="text-[#00ADB5]" />
                ) : (
                  <Sun size={20} className="text-[#00ADB5]" />
                )}
                <div>
                  <p className="font-medium text-[#222831]">Dark Mode</p>
                  <p className="text-sm text-[#393E46]">Toggle dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? "bg-[#00ADB5]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? "right-1" : "left-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div
          className="card p-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#00ADB5]/10 rounded-xl">
              <Shield size={20} className="text-[#00ADB5]" />
            </div>
            <h2 className="text-xl font-bold text-[#222831]">Security</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-[#EEEEEE] rounded-xl hover:bg-[#00ADB5]/10 transition-all group">
              <div className="flex items-center gap-3">
                <Lock
                  size={18}
                  className="text-[#393E46] group-hover:text-[#00ADB5]"
                />
                <span className="text-[#222831]">Change Password</span>
              </div>
              <span className="text-[#393E46]"></span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-[#EEEEEE] rounded-xl hover:bg-[#00ADB5]/10 transition-all group">
              <div className="flex items-center gap-3">
                <CreditCard
                  size={18}
                  className="text-[#393E46] group-hover:text-[#00ADB5]"
                />
                <span className="text-[#222831]">Payment Methods</span>
              </div>
              <span className="text-[#393E46]"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
