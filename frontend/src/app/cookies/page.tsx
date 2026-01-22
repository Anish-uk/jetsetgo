"use client";

import Image from "next/image";
import Link from "next/link";
import { Cookie, ArrowLeft, Mail, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: true,
  });

  const toggleCookie = (key: keyof typeof cookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveCookiePreferences = () => {
    // In a real app, this would save to localStorage and update cookie consent
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(cookiePreferences),
    );
    alert("Cookie preferences saved successfully!");
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/amsterdam.jpg"
            alt="Cookies background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Cookie size={16} />
            Cookie Settings
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Cookie Policy
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto">
            Last updated: January 22, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#00ADB5] hover:text-[#00ADB5]/80 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="card p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              What Are Cookies?
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit our website. They help us provide you
              with a better experience by remembering your preferences,
              analyzing how you use our site, and personalizing content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              Types of Cookies We Use
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-[#EEEEEE] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#222831]">
                    Essential Cookies
                  </h3>
                  <button
                    className="flex items-center gap-2 text-[#00ADB5] cursor-not-allowed opacity-60"
                    disabled
                  >
                    <ToggleRight size={32} />
                    <span className="text-sm">Always On</span>
                  </button>
                </div>
                <p className="text-sm text-[#393E46]">
                  Required for the website to function properly. These cannot be
                  disabled as they handle basic functions like page navigation
                  and secure access.
                </p>
              </div>

              <div className="p-4 bg-[#EEEEEE] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#222831]">
                    Analytics Cookies
                  </h3>
                  <button
                    onClick={() => toggleCookie("analytics")}
                    className="flex items-center gap-2 text-[#00ADB5] hover:opacity-80 transition-opacity"
                  >
                    {cookiePreferences.analytics ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} className="text-[#393E46]" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-[#393E46]">
                  Help us understand how visitors interact with our website by
                  collecting and reporting information anonymously.
                </p>
              </div>

              <div className="p-4 bg-[#EEEEEE] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#222831]">
                    Marketing Cookies
                  </h3>
                  <button
                    onClick={() => toggleCookie("marketing")}
                    className="flex items-center gap-2 text-[#00ADB5] hover:opacity-80 transition-opacity"
                  >
                    {cookiePreferences.marketing ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} className="text-[#393E46]" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-[#393E46]">
                  Used to track visitors across websites to display relevant
                  advertisements based on your interests.
                </p>
              </div>

              <div className="p-4 bg-[#EEEEEE] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#222831]">
                    Personalization Cookies
                  </h3>
                  <button
                    onClick={() => toggleCookie("personalization")}
                    className="flex items-center gap-2 text-[#00ADB5] hover:opacity-80 transition-opacity"
                  >
                    {cookiePreferences.personalization ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} className="text-[#393E46]" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-[#393E46]">
                  Remember your preferences and settings to provide a more
                  personalized experience, including AI travel recommendations.
                </p>
              </div>
            </div>

            <button
              onClick={saveCookiePreferences}
              className="mt-6 px-6 py-3 bg-[#00ADB5] text-white rounded-xl hover:bg-[#00ADB5]/90 transition-colors"
            >
              Save Cookie Preferences
            </button>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              Managing Cookies
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              You can control and/or delete cookies as you wish. You can delete
              all cookies that are already on your computer and you can set most
              browsers to prevent them from being placed. However, if you do
              this, you may have to manually adjust some preferences every time
              you visit a site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              In some special cases, we also use cookies provided by trusted
              third parties including Google Analytics, social media platforms,
              and payment processors. These third-party cookies are governed by
              their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              Contact Us
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              If you have questions about our Cookie Policy:
            </p>
            <div className="flex items-center gap-2 text-[#00ADB5]">
              <Mail size={20} />
              <a href="mailto:privacy@jetsetgo.com" className="hover:underline">
                privacy@jetsetgo.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
