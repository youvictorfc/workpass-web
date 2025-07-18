import { Button } from "@/components/ui/button";

const trustIndicators = [
  { icon: "⭐", text: "4.9/5 rating" },
  { icon: "👥", text: "50,000+ users" },
  { icon: "🛡️", text: "Bank-level security" },
  { icon: "🕒", text: "24/7 support" },
];

export default function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-primary via-blue-600 to-blue-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {" "}Construction Career?
          </span>
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
          Join thousands of construction professionals who have already digitized their careers with WorkPass Australia. 
          Start your journey today and unlock new opportunities.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            onClick={() => window.location.href = '/api/login'}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Started Free
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Book a Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-xl">{indicator.icon}</span>
              <span className="font-semibold">{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
