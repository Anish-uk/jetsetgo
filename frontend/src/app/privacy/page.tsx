"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, ArrowLeft, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/singapore.jpg"
            alt="Privacy background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Shield size={16} />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              Welcome to JetSetGo. We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our travel planning platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              2. Information We Collect
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-[#393E46] space-y-2 ml-4">
              <li>Name, email address, and contact information</li>
              <li>Travel preferences and destination searches</li>
              <li>Booking history and itinerary details</li>
              <li>
                Payment information (processed securely through third-party
                providers)
              </li>
              <li>Communications with our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-[#393E46] space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your bookings and transactions</li>
              <li>Send you travel confirmations and updates</li>
              <li>Personalize your travel recommendations using AI</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send promotional communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              4. Information Sharing
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              We do not sell your personal information. We may share your
              information with trusted third-party service providers who assist
              us in operating our platform, including airlines, hotels, and
              payment processors, solely to fulfill your bookings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              5. Data Security
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information, including encryption, secure servers, and
              regular security audits. However, no method of transmission over
              the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              6. Your Rights
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-[#393E46] space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify or update your personal information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              7. Contact Us
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact
              us:
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
