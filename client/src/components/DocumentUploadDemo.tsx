import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const documentCategories = [
  {
    title: "Safety Certs",
    count: 5,
    icon: "🛡️",
    color: "bg-green-100 text-green-600",
    documents: [
      { name: "White Card", status: "verified", expiry: "Valid until Dec 2025", statusColor: "bg-green-500" },
      { name: "First Aid", status: "expiring", expiry: "Expires in 30 days", statusColor: "bg-yellow-500" },
    ]
  },
  {
    title: "Trade Quals",
    count: 3,
    icon: "🎓",
    color: "bg-primary/10 text-primary",
    documents: [
      { name: "Cert III Carpentry", status: "verified", expiry: "Permanent", statusColor: "bg-green-500" },
    ]
  },
  {
    title: "Licenses",
    count: 2,
    icon: "📄",
    color: "bg-yellow-100 text-yellow-600",
    documents: [
      { name: "EWP License", status: "expiring", expiry: "Expires Mar 2024", statusColor: "bg-red-500" },
    ]
  },
];

export default function DocumentUploadDemo() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 mb-6">
            Smart Document
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}Management
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upload, organize, and manage all your construction documents with our intelligent system that automatically categorizes and tracks expiration dates.
          </p>
        </div>

        {/* Upload Interface Demo */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardContent className="p-8">
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center mb-8 bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Drop your documents here</h3>
                <p className="text-slate-600 mb-4">or click to browse files</p>
                <p className="text-sm text-slate-500">Supports PDF, JPG, PNG up to 10MB</p>
              </div>

              {/* Document Categories */}
              <div className="grid md:grid-cols-3 gap-6">
                {documentCategories.map((category, index) => (
                  <Card key={index} className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center mr-3 text-xl`}>
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{category.title}</div>
                          <div className="text-sm text-slate-500">{category.count} documents</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Document List */}
                      <div className="space-y-3">
                        {category.documents.map((document, docIndex) => (
                          <div key={docIndex} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 text-sm">
                              📄
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-slate-900">{document.name}</div>
                              <div className={`text-xs ${
                                document.status === 'verified' ? 'text-green-600' : 
                                document.status === 'expiring' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {document.expiry}
                              </div>
                            </div>
                            <div className={`w-6 h-6 ${document.statusColor} rounded-full flex items-center justify-center text-white text-xs`}>
                              {document.status === 'verified' ? '✓' : document.status === 'expiring' ? '⚠' : '!'}
                            </div>
                          </div>
                        ))}
                        
                        {/* Add More Button */}
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center text-slate-400 hover:border-primary/30 hover:text-primary cursor-pointer transition-colors">
                          <div className="text-lg mb-1">+</div>
                          <div className="text-xs">Add more {category.title.toLowerCase()}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
