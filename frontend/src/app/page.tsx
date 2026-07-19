import React from "react";
import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import RoadmapCard from "@/components/RoadmapCard";
import Footer from "@/components/Footer";
import { FEATURES, STATS, ROADMAP } from "@/data/mockData";

export interface HomeProps {}

export default function Home({}: Readonly<HomeProps>) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-on-surface">
      <TopNavBar />

      <main className="mt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative py-xl px-margin flex flex-col items-center text-center overflow-hidden">
          {/* Subtle Radial Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10 h-[500px]"></div>
          <div className="max-w-4xl mx-auto space-y-md">
            <span className="inline-block px-sm py-xs bg-surface-container-low border border-outline-variant rounded-full font-label-sm text-label-sm text-primary uppercase tracking-widest">
              Version 2.0 Now Live
            </span>
            <h1 className="font-display text-display md:text-[72px] text-white leading-tight">
              Tailor Your Resume with AI
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Upload your resume and a job description to generate an ATS-optimized resume, personalized cover letter, and qualification analysis in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center pt-base">
              <Link href="/dashboard" className="bg-primary px-lg py-md rounded-lg text-black font-bold text-body-lg active:scale-95 transition-all hover:opacity-90 inline-block text-center">
                Get Started for Free
              </Link>
              <Link href="/dashboard" className="border border-outline-variant bg-transparent hover:bg-surface-container-low px-lg py-md rounded-lg text-white font-medium text-body-lg active:scale-95 transition-all inline-block text-center">
                View Demo
              </Link>
            </div>
          </div>

          {/* Dashboard Mockup Placeholder */}
          <div className="mt-xl w-full max-w-container-max glass-card rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-surface-container h-10 border-b border-outline-variant flex items-center px-md gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary/40"></div>
            </div>
            <div className="p-md md:p-lg bg-surface-container-lowest h-64 md:h-[480px] relative">
              <div
                className="w-full h-full bg-cover bg-center rounded-lg opacity-80"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZY6JI5pD_2b8akqrt-Q6Jd-pcwwnxfGAsseDMR-dipxBvahzsYqoMkatejmQNB6l0b2PEGodgh4ZtUKw4Xpz_LWVxs7b4ZEFvi9A0J2FKanbS0JcbESNVQHl4d_K9fdTDJy0giZivsI8FMniw7pRW8SOZL8D9pDBmsvZW50PwomzmVBEvjyfJbFeGHDpojTmgRG2Zkt4eOHCeZ2LohEpg8yZdR2ZMX9EgQh4McxMerSSdfsq6y5_K3Dm8cTU981Sg6BkQrgXXwtM')",
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-xl px-margin bg-black" id="features">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-lg space-y-xs">
              <h2 className="font-display text-headline-lg text-white">Features designed for job seekers</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Precision tools to navigate the modern job market.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-xl px-margin bg-black" id="about">
          <div className="max-w-container-max mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-xl space-y-md">
              <h2 className="font-display text-headline-lg text-white">Our Mission</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                We believe job searching should be empowering, not exhausting. CareerPilot AI was built to level the playing field for job seekers by giving them access to the same advanced AI technology used by top recruiting agencies, ensuring every application stands out.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {STATS.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="py-xl px-margin bg-surface-container-lowest" id="roadmap">
          <div className="max-w-container-max mx-auto">
            <div className="mb-lg space-y-xs">
              <h2 className="font-display text-headline-lg text-white">Product Roadmap</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Our vision for the future of job hunting.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
              {/* Line decoration for desktop */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-outline-variant -z-10"></div>
              {ROADMAP.map((milestone) => (
                <RoadmapCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA Section */}
        <section className="py-xl px-margin bg-black text-center" id="pricing">
          <div className="max-w-2xl mx-auto glass-card p-lg rounded-xl border-primary/20 bg-[radial-gradient(circle_at_top_right,_#10B98115,_transparent_50%)]">
            <h2 className="font-display text-headline-lg text-white mb-md font-bold">Ready to land your dream job?</h2>
            <p className="font-body-lg text-on-surface-variant mb-lg">Join thousands of professionals using CareerPilot AI to secure interviews at top tech companies.</p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <Link href="/dashboard" className="bg-primary px-lg py-md rounded-lg text-black font-bold active:scale-95 transition-all text-center">
                Get Started Now
              </Link>
              <Link href="/dashboard" className="border border-outline-variant bg-transparent px-lg py-md rounded-lg text-white font-medium active:scale-95 transition-all text-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
