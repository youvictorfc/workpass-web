import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorkReadinessMeter from "./WorkReadinessMeter";

const categoryData = [
  {
    title: "Safety",
    percentage: 100,
    icon: "🛡️",
    color: "bg-green-50 text-green-600",
    bgColor: "bg-green-500",
    description: "All certifications current",
  },
  {
    title: "Trade Skills",
    percentage: 95,
    icon: "🔧",
    color: "bg-primary/10 text-primary",
    bgColor: "bg-primary",
    description: "1 certification pending",
  },
  {
    title: "Medical",
    percentage: 75,
    icon: "❤️",
    color: "bg-yellow-50 text-yellow-600",
    bgColor: "bg-yellow-500",
    description: "Health check due soon",
  },
  {
    title: "Licenses",
    percentage: 80,
    icon: "📄",
    color: "bg-purple-50 text-purple-600",
    bgColor: "bg-purple-500",
    description: "EWP renewal required",
  },
];

const recentActivity = [
  {
    icon: "📜",
    title: "High Risk Work License uploaded",
    time: "2 hours ago",
    iconBg: "bg-green-100 text-green-600",
  },
  {
    icon: "💼",
    title: "Job application submitted",
    time: "1 day ago",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: "🔔",
    title: "First Aid renewal reminder",
    time: "3 days ago",
    iconBg: "bg-yellow-100 text-yellow-600",
  },
];

const upcomingRenewals = [
  {
    name: "EWP License",
    daysLeft: 15,
    status: "urgent",
    statusColor: "bg-red-50 text-red-600",
    iconBg: "bg-red-500",
  },
  {
    name: "First Aid",
    daysLeft: 45,
    status: "warning",
    statusColor: "bg-yellow-50 text-yellow-600",
    iconBg: "bg-yellow-500",
  },
];

const matchedJobs = [
  {
    title: "Senior Electrician",
    company: "Barangaroo Construction",
    match: 98,
  },
  {
    title: "Site Supervisor",
    company: "Western Sydney Airport",
    match: 89,
  },
];

export default function DashboardPreview() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 mb-6">
            Your Construction
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}Command Center
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get a comprehensive view of your construction career with our intelligent dashboard that tracks 
            your work readiness, upcoming renewals, and career opportunities.
          </p>
        </div>

        {/* Dashboard Interface */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardContent className="p-8">
            {/* Dashboard Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" 
                    alt="Construction worker profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Marcus Thompson</h3>
                  <p className="text-slate-600">Senior Electrician • 8 years experience</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Work Readiness Score</div>
                <div className="text-4xl font-black text-green-500">87%</div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Work Readiness Meter */}
              <div className="lg:col-span-2">
                <Card className="bg-white shadow-lg mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">Work Readiness Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Circular Progress */}
                    <div className="flex items-center justify-center mb-8">
                      <WorkReadinessMeter score={87} />
                    </div>

                    {/* Category Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      {categoryData.map((category, index) => (
                        <div key={index} className={`${category.color} rounded-xl p-4`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{category.title}</div>
                              <div className="text-2xl font-bold">{category.percentage}%</div>
                            </div>
                            <div className={`w-10 h-10 ${category.bgColor} rounded-xl flex items-center justify-center text-white text-xl`}>
                              {category.icon}
                            </div>
                          </div>
                          <div className="mt-2 text-xs opacity-75">{category.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-10 h-10 ${activity.iconBg} rounded-xl flex items-center justify-center text-lg`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">{activity.title}</div>
                            <div className="text-xs text-slate-500">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Renewals */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900">Upcoming Renewals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingRenewals.map((renewal, index) => (
                        <div key={index} className={`flex items-center space-x-3 p-3 ${renewal.statusColor} rounded-xl`}>
                          <div className={`w-8 h-8 ${renewal.iconBg} rounded-lg flex items-center justify-center text-white text-sm`}>
                            !
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">{renewal.name}</div>
                            <div className="text-xs">Expires in {renewal.daysLeft} days</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
                      Schedule Renewals
                    </Button>
                  </CardContent>
                </Card>

                {/* Job Opportunities */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900">Matched Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {matchedJobs.map((job, index) => (
                        <div key={index} className="p-3 border border-slate-200 rounded-xl hover:border-primary/30 transition-colors cursor-pointer">
                          <div className="text-sm font-medium text-slate-900">{job.title}</div>
                          <div className="text-xs text-slate-500">{job.company}</div>
                          <div className="text-xs text-green-600 mt-1">{job.match}% match</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                      View All Jobs
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Document
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Share Profile
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
