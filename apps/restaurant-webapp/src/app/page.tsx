import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@restaurant-webapp/components/ui/button'
import { ChevronRight, UserPlus, ArrowRight } from 'lucide-react'
import HeroSection from '@restaurant-webapp/components/home/HeroSection'
import { WhyPartner } from '@restaurant-webapp/components/home/WhyPartner'
import { HowItWorks } from '@restaurant-webapp/components/home/HowItWorks'
import { WhatYouGet } from '@restaurant-webapp/components/home/WhatYouGet'
import { SuccessStories } from '@restaurant-webapp/components/home/SuccessStories'
import { FAQ } from '@restaurant-webapp/components/home/FAQ'
import { SupportCTA } from '@restaurant-webapp/components/home/SupportCTA'
import { FinalCTA } from '@restaurant-webapp/components/home/FinalCTA'
import { Navbar } from '@restaurant-webapp/components/home/Navbar'
import Footer from '@restaurant-webapp/components/home/Footer'

export const metadata: Metadata = {
  title: 'Dashboard - Restaurant & Kitchen Dashboard',
  description: 'Manage your restaurant or commercial kitchen',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex flex-col">
      <Navbar/>
      <HeroSection/>
      <WhyPartner/>
      <HowItWorks/>
      <WhatYouGet/>
      <SuccessStories/>
      <FAQ/>
      <SupportCTA/>
      <FinalCTA/>
      <Footer/>
    </div>
  );
}