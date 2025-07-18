import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import OTPInput from "@/components/OTPInput";
import FileUpload from "@/components/FileUpload";

const registrationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.string().min(1, "Please select your role"),
  trade: z.string().optional(),
  experienceLevel: z.string().min(1, "Please select your experience level"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const steps = [
  { id: 1, title: "Basic Info", description: "Tell us about yourself" },
  { id: 2, title: "Verification", description: "Verify your details" },
  { id: 3, title: "Documents", description: "Upload credentials" },
  { id: 4, title: "Complete", description: "All set!" },
];

const roles = [
  { value: "tradesperson", label: "Tradesperson", icon: "🔧" },
  { value: "supervisor", label: "Supervisor", icon: "📋" },
  { value: "foreman", label: "Foreman", icon: "👷" },
  { value: "apprentice", label: "Apprentice", icon: "🎓" },
];

const trades = [
  { value: "electrician", label: "Electrician" },
  { value: "carpenter", label: "Carpenter" },
  { value: "plumber", label: "Plumber" },
  { value: "painter", label: "Painter" },
  { value: "tiler", label: "Tiler" },
  { value: "other", label: "Other" },
];

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email');
  const { toast } = useToast();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      phone: "",
      role: "",
      trade: "",
      experienceLevel: "",
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (data: { identifier: string; type: string }) => {
      return apiRequest("POST", "/api/send-otp", data);
    },
    onSuccess: () => {
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your ${verificationMethod}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { identifier: string; code: string; type: string }) => {
      return apiRequest("POST", "/api/verify-otp", data);
    },
    onSuccess: () => {
      setCurrentStep(3);
      toast({
        title: "Verified",
        description: "Your details have been verified successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      form.handleSubmit(onBasicInfoSubmit)();
    }
  };

  const onBasicInfoSubmit = (data: RegistrationForm) => {
    setCurrentStep(2);
  };

  const handleSendOtp = () => {
    const formData = form.getValues();
    const identifier = verificationMethod === 'email' ? formData.email : formData.phone;
    
    sendOtpMutation.mutate({
      identifier,
      type: verificationMethod,
    });
  };

  const handleVerifyOtp = (code: string) => {
    const formData = form.getValues();
    const identifier = verificationMethod === 'email' ? formData.email : formData.phone;
    
    verifyOtpMutation.mutate({
      identifier,
      code,
      type: verificationMethod,
    });
  };

  const handleDocumentUpload = () => {
    setCurrentStep(4);
    setTimeout(() => {
      window.location.href = '/api/login';
    }, 2000);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              W
            </div>
            <h1 className="text-2xl font-bold text-slate-900">WorkPass Australia</h1>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Your Construction Passport</h2>
          <p className="text-slate-600">Get site-ready in under 24 hours</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <div className="text-xs text-slate-500 mt-1 text-center">
                  <div className="font-medium">{step.title}</div>
                  <div className="hidden sm:block">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <form className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...form.register("email")}
                    className="h-12"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+61 4XX XXX XXX"
                    {...form.register("phone")}
                    className="h-12"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label>Your Construction Role</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => form.setValue("role", role.value)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
                          form.watch("role") === role.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200 hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        <div className="text-2xl mb-1">{role.icon}</div>
                        {role.label}
                      </button>
                    ))}
                  </div>
                  {form.formState.errors.role && (
                    <p className="text-sm text-red-600">{form.formState.errors.role.message}</p>
                  )}
                </div>

                {/* Trade (conditional) */}
                {form.watch("role") === "tradesperson" && (
                  <div className="space-y-2">
                    <Label htmlFor="trade">Trade Specialization</Label>
                    <Select onValueChange={(value) => form.setValue("trade", value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your trade" />
                      </SelectTrigger>
                      <SelectContent>
                        {trades.map((trade) => (
                          <SelectItem key={trade.value} value={trade.value}>
                            {trade.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select onValueChange={(value) => form.setValue("experienceLevel", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.experienceLevel && (
                    <p className="text-sm text-red-600">{form.formState.errors.experienceLevel.message}</p>
                  )}
                </div>

                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  className="w-full h-12 text-lg"
                  disabled={!form.formState.isValid}
                >
                  Continue
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>

                {/* OAuth Option */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => window.location.href = '/api/login'}
                  className="w-full h-12"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </form>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Verify Your Details</h3>
                  <p className="text-slate-600">Choose how you'd like to verify your account</p>
                </div>

                {/* Verification Method Selection */}
                {!otpSent && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setVerificationMethod('email')}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          verificationMethod === 'email'
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-2xl mb-2">📧</div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-slate-500">{form.getValues("email")}</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setVerificationMethod('sms')}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          verificationMethod === 'sms'
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-2xl mb-2">📱</div>
                        <div className="font-medium">SMS</div>
                        <div className="text-sm text-slate-500">{form.getValues("phone")}</div>
                      </button>
                    </div>
                    
                    <Button 
                      onClick={handleSendOtp}
                      disabled={sendOtpMutation.isPending}
                      className="w-full h-12"
                    >
                      {sendOtpMutation.isPending ? "Sending..." : `Send Verification Code`}
                    </Button>
                  </div>
                )}

                {/* OTP Input */}
                {otpSent && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-slate-600 mb-4">
                        Enter the 6-digit code sent to your {verificationMethod}
                      </p>
                    </div>
                    
                    <OTPInput
                      length={6}
                      onComplete={handleVerifyOtp}
                      disabled={verifyOtpMutation.isPending}
                    />
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setOtpSent(false)}
                      className="w-full"
                    >
                      Change Verification Method
                    </Button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Upload Your Documents</h3>
                  <p className="text-slate-600">Start with your essential construction credentials</p>
                </div>

                <FileUpload 
                  onUpload={handleDocumentUpload}
                  acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png']}
                  maxSize={10 * 1024 * 1024} // 10MB
                />

                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={handleDocumentUpload}
                    className="w-full"
                  >
                    Skip for Now - Complete Later
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                    You can upload documents anytime from your dashboard
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome to WorkPass!</h3>
                  <p className="text-slate-600">
                    Your construction passport is ready. You'll be redirected to your dashboard shortly.
                  </p>
                </div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
