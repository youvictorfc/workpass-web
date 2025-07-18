import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Platform",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Security", href: "#security" },
      { name: "Integrations", href: "#integrations" },
      { name: "API", href: "#api" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Training", href: "#training" },
      { name: "Webinars", href: "#webinars" },
      { name: "Status", href: "#status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Compliance", href: "#compliance" },
      { name: "Accessibility", href: "#accessibility" },
    ],
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "💼",
    href: "#linkedin",
  },
  {
    name: "Twitter",
    icon: "🐦",
    href: "#twitter",
  },
  {
    name: "Facebook",
    icon: "📘",
    href: "#facebook",
  },
  {
    name: "Instagram",
    icon: "📷",
    href: "#instagram",
  },
];

const certifications = [
  { name: "ASQA Approved", icon: "🛡️" },
  { name: "ISO 27001 Certified", icon: "🔒" },
  { name: "Industry Recognized", icon: "🏆" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                W
              </div>
              <span className="text-xl font-bold">WorkPass Australia</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Empowering construction professionals across Australia with digital credentials, 
              smart job matching, and comprehensive career management tools.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all duration-200"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-slate-400 text-sm">
            © 2024 WorkPass Australia. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-400">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-lg">{cert.icon}</span>
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
