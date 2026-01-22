"use client";

// Home Components
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import ImageGallery from "@/components/home/ImageGallery";
import TravelInspiration from "@/components/home/TravelInspiration";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section with Stats */}
      <FeaturesSection />

      {/* Find Your Perfect Escape */}
      <TravelInspiration />

      {/* Popular Destinations */}
      <DestinationsSection />

      {/* Wanderlust Gallery */}
      <ImageGallery />
    </div>
  );
}
