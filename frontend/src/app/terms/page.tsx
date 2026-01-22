"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowLeft, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/dubai.jpg"
            alt="Terms background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <FileText size={16} />
            Legal Agreement
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              By accessing and using JetSetGo, you accept and agree to be bound
              by the terms and provisions of this agreement. If you do not agree
              to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              2. Description of Services
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              JetSetGo provides an AI-powered travel planning platform that
              helps users discover destinations, plan itineraries, book flights,
              hotels, and experiences. We act as an intermediary between you and
              travel service providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              3. User Accounts
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              When you create an account with us, you must:
            </p>
            <ul className="list-disc list-inside text-[#393E46] space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              4. Booking and Payments
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              When making a booking:
            </p>
            <ul className="list-disc list-inside text-[#393E46] space-y-2 ml-4">
              <li>You agree to pay all charges at the prices in effect</li>
              <li>You authorize us to charge your payment method</li>
              <li>Prices are subject to change without notice</li>
              <li>
                All payments are processed securely through third-party
                providers
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              5. Cancellation Policy
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              Cancellation policies vary by booking type and provider.
              Generally, bookings can be cancelled within 24 hours for a full
              refund. After this period, cancellation fees may apply as
              specified in your booking confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              JetSetGo acts as an intermediary and is not responsible for the
              actions, errors, omissions, or failures of third-party travel
              providers. Our liability is limited to the fees you paid to us
              directly for our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              All content on JetSetGo, including text, graphics, logos, and
              software, is the property of JetSetGo or its licensors and is
              protected by intellectual property laws. You may not reproduce,
              distribute, or create derivative works without our permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              8. Modifications
            </h2>
            <p className="text-[#393E46] leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              notify users of significant changes via email or through our
              platform. Continued use of our services after changes constitutes
              acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#222831] mb-4">
              9. Contact Us
            </h2>
            <p className="text-[#393E46] leading-relaxed mb-4">
              For questions about these Terms of Service:
            </p>
            <div className="flex items-center gap-2 text-[#00ADB5]">
              <Mail size={20} />
              <a href="mailto:legal@jetsetgo.com" className="hover:underline">
                legal@jetsetgo.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
