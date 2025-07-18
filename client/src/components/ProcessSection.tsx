import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Create Account",
    description: "Sign up with your email or Google account. Choose your trade and experience level to personalize your journey.",
    features: ["Email or Google OAuth", "OTP verification"],
    color: "from-primary to-blue-600",
  },
  {
    number: 2,
    title: "Upload Credentials",
    description: "Drag and drop your certificates, licenses, and qualifications. Our AI will automatically categorize and verify them.",
    features: ["Drag & drop interface", "AI document processing"],
    color: "from-green-500 to-green-600",
  },
  {
    number: 3,
    title: "Get Verified",
    description: "Our verification team reviews your documents and confirms your credentials with issuing authorities.",
    features: ["Expert review process", "Authority confirmation"],
    color: "from-yellow-500 to-yellow-600",
  },
  {
    number: 4,
    title: "Start Working",
    description: "Access job opportunities, share your verified credentials with employers, and advance your construction career.",
    features: ["Job marketplace access", "Instant credential sharing"],
    color: "from-purple-500 to-purple-600",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 px-6 lg:px-8 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-slate-900 mb-6">
            Get Started in
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of construction professionals who have already transformed their careers with WorkPass Australia.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-primary/30 to-slate-200 z-0"></div>

          {steps.map((step, index) => (
            <div key={step.number} className="relative z-10 group">
              <Card className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:scale-105 transition-all duration-500 h-full shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-2 text-sm text-slate-500">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
