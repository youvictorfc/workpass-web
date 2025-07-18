import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = [
  { value: "tradesperson", label: "Tradesperson", icon: "🔧" },
  { value: "supervisor", label: "Supervisor", icon: "📋" },
];

const features = [
  {
    icon: "📱",
    title: "SMS & Email OTP",
    description: "Secure verification with modern code input interface and automatic detection.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "🛣️",
    title: "Role-Based Pathways",
    description: "Personalized onboarding flow based on your construction role and experience.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: "☁️",
    title: "Smart Document Upload",
    description: "Drag-and-drop interface with preview, automatic categorization, and progress tracking.",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function RegistrationDemo() {
  const [selectedRole, setSelectedRole] = useState("supervisor");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  return (
    <section className="py-24 px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Demo Content */}
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-6">
              Modern Registration
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}Experience
              </span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Experience our streamlined registration process with modern OTP verification, 
              role-based pathways, and intuitive document upload capabilities.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form Demo */}
          <div className="relative">
            {/* Phone Mockup */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">Welcome to WorkPass</CardTitle>
                <p className="text-slate-600">Create your construction passport</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Progress Steps */}
                <div className="flex justify-center space-x-2 mb-8">
                  <div className="w-8 h-2 bg-primary rounded-full"></div>
                  <div className="w-8 h-2 bg-primary/30 rounded-full"></div>
                  <div className="w-8 h-2 bg-slate-200 rounded-full"></div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Input
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="peer h-12 bg-white/50 backdrop-blur border-slate-200 focus:border-primary"
                  />
                  <label className="absolute left-3 top-3 text-slate-500 transition-all duration-200 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary bg-white px-2 rounded">
                    Email Address
                  </label>
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="peer h-12 bg-white/50 backdrop-blur border-slate-200 focus:border-primary"
                  />
                  <label className="absolute left-3 top-3 text-slate-500 transition-all duration-200 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary bg-white px-2 rounded">
                    Phone Number
                  </label>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Your Construction Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setSelectedRole(role.value)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
                          selectedRole === role.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200 hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        <div className="text-2xl mb-1">{role.icon}</div>
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Continue Button */}
                <Button 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
                >
                  Continue
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>

                {/* OAuth Options */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  className="w-full h-12 border-slate-200 bg-white hover:bg-slate-50"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce" style={{animationDelay: '2s'}}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
