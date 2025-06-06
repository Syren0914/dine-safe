"use client"
import React from "react"
import HeroHeader from "../navbar/page"
import Lightning from "../Backgrounds/Lightning/Lightning"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Footer } from "../components/Footer/Footer"
import SchemaCard from "@/components/schema-card/schema-card"
import { Pricing } from "@/components/pricing"
import AnimatedGradientBackground from "@/components/animated-gradient/animated-gradient"
import InteractiveNeuralVortex from "@/components/vortex/vortex"


const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

function About() {
  return (
    <div className="relative min-h-screen  text-white overflow-x-hidden">
      <HeroHeader />

      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
      <InteractiveNeuralVortex />
      {/* <AnimatedGradientBackground 
        gradientColors={["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]}
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        animationSpeed={0.02}
        breathingRange={5}
        containerClassName="bg-gradient-to-b from-black to-indigo-950"
      /> */}
        
        
      </div>

      


      {/* Content */}
      <main className="pt-[100px] container mx-auto px-4">

      <Pricing 
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
      />
        
      
        
        
      </main>
      <Footer/>
    </div>
    
  )
}

export default About
