import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 animate-fade-in-up">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              W
            </div>
            <span className="text-xl font-bold text-white">WorkPass Australia</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200">Features</a>
            <a href="#process" className="text-slate-300 hover:text-white transition-colors duration-200">How it Works</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-200">Pricing</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors duration-200">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hidden sm:block text-slate-300 hover:text-white hover:bg-white/10"
              onClick={() => window.location.href = '/api/login'}
            >
              Sign In
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              onClick={() => window.location.href = '/api/login'}
            >
              Get Started
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#process" className="text-slate-300 hover:text-white transition-colors duration-200">How it Works</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-200">Pricing</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors duration-200">Contact</a>
              <div className="pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  className="w-full mb-2 border-white/20 text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
