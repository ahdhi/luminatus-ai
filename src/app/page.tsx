// src/app/page.tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Features from '@/components/sections/Features'
import TechStack from '@/components/sections/TechStack'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-black" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 space-y-0">
        <Hero />
        <About />
        <Services />
        <Features />
        <TechStack />
        <Contact />
        <Footer />
      </div>

      {/* Floating Particles Effect - Hidden on mobile for performance */}
      <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float animation-delay-400" />
      </div>
    </main>
  )
}