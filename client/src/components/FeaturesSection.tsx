import { Card, CardContent } from "@/components/ui/card";

const mainFeatures = [
  {
    icon: "💼",
    title: "Digital Credential Wallet",
    description: "Store, manage, and share all your construction certifications, licenses, and qualifications in one secure digital wallet. Never lose an important document again.",
    features: ["Secure blockchain storage", "Instant verification", "Mobile access anywhere"],
    bgColor: "bg-gradient-to-br from-primary/10 to-primary/20",
    borderColor: "border-primary/20",
  },
  {
    icon: "🎯",
    title: "Smart Job Matching",
    description: "AI-powered job matching connects you with opportunities that match your skills, certifications, and career goals. Get matched with the perfect projects.",
    features: ["AI-powered matching", "Real-time opportunities", "Skill-based filtering"],
    bgColor: "bg-gradient-to-br from-green-50 to-green-100",
    borderColor: "border-green-200",
  },
  {
    icon: "🛡️",
    title: "Compliance Tracking",
    description: "Never miss a renewal deadline again. Our intelligent system tracks all your certifications and sends proactive reminders before they expire.",
    features: ["Automatic reminders", "Renewal assistance", "Compliance reports"],
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    borderColor: "border-yellow-200",
  },
];

const additionalFeatures = [
  {
    icon: "📱",
    title: "Mobile First",
    description: "Access everything from your smartphone with our native mobile app",
    color: "text-primary",
  },
  {
    icon: "📊",
    title: "Career Analytics",
    description: "Track your career progress with detailed analytics and insights",
    color: "text-green-500",
  },
  {
    icon: "🤝",
    title: "Network Building",
    description: "Connect with industry professionals and build valuable relationships",
    color: "text-yellow-500",
  },
  {
    icon: "🎓",
    title: "Skill Development",
    description: "Access training courses and development programs to advance your career",
    color: "text-primary",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-slate-900 mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}Construction Success
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform streamlines every aspect of your construction career, 
            from certifications to job matching, all in one secure digital ecosystem.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className={`group ${feature.bgColor} ${feature.borderColor} border transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            >
              <CardContent className="p-8 h-full">
                <div className="text-4xl mb-6 group-hover:rotate-6 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
