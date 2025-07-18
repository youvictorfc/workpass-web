import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkReadinessMeter from "@/components/WorkReadinessMeter";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  const { data: credentials = [] } = useQuery({
    queryKey: ["/api/credentials"],
    enabled: !!user,
  });

  const { data: jobApplications = [] } = useQuery({
    queryKey: ["/api/job-applications"],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const workReadinessScore = dashboardData?.workReadinessScore || 0;
  const expiringCredentials = dashboardData?.expiringCredentials || [];
  const recentActivity = dashboardData?.recentActivity || [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer">
                  W
                </div>
              </Link>
              <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {user?.firstName?.[0] || 'U'}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-blue-100">
                  {dashboardData?.profile?.role || 'Construction Professional'} • 
                  {dashboardData?.profile?.yearsExperience || 0} years experience
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-blue-100 mb-1">Work Readiness Score</div>
              <div className="text-4xl font-black">{workReadinessScore}%</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Work Readiness Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Work Readiness Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-8">
                  <WorkReadinessMeter score={workReadinessScore} />
                </div>

                {/* Category Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-green-800">Safety</div>
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round((credentials.filter(c => c.category === 'safety' && c.verificationStatus === 'verified').length / Math.max(credentials.filter(c => c.category === 'safety').length, 1)) * 100)}%
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                        🛡️
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-green-700">
                      {credentials.filter(c => c.category === 'safety').length} certifications
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-blue-800">Trade Skills</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((credentials.filter(c => c.category === 'trade' && c.verificationStatus === 'verified').length / Math.max(credentials.filter(c => c.category === 'trade').length, 1)) * 100)}%
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                        🔧
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-blue-700">
                      {credentials.filter(c => c.category === 'trade').length} qualifications
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-yellow-800">Medical</div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {Math.round((credentials.filter(c => c.category === 'medical' && c.verificationStatus === 'verified').length / Math.max(credentials.filter(c => c.category === 'medical').length, 1)) * 100)}%
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-white">
                        ❤️
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-yellow-700">
                      {credentials.filter(c => c.category === 'medical').length} checks
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-purple-800">Licenses</div>
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round((credentials.filter(c => c.category === 'license' && c.verificationStatus === 'verified').length / Math.max(credentials.filter(c => c.category === 'license').length, 1)) * 100)}%
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                        📄
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-purple-700">
                      {credentials.filter(c => c.category === 'license').length} licenses
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed views */}
            <Tabs defaultValue="credentials" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="jobs">Job Applications</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="credentials">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      My Credentials
                      <Button size="sm">
                        Upload New
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {credentials.length > 0 ? (
                        credentials.map((credential) => (
                          <div key={credential.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                              📄
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{credential.name}</div>
                              <div className="text-sm text-slate-500">
                                {credential.issuingAuthority} • 
                                {credential.expiryDate ? ` Expires ${new Date(credential.expiryDate).toLocaleDateString()}` : ' Permanent'}
                              </div>
                            </div>
                            <Badge 
                              variant={
                                credential.verificationStatus === 'verified' ? 'default' :
                                credential.verificationStatus === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {credential.verificationStatus}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-slate-400 mb-2">📄</div>
                          <p className="text-slate-500">No credentials uploaded yet</p>
                          <Button className="mt-4">Upload Your First Credential</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="jobs">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobApplications.length > 0 ? (
                        jobApplications.map((application) => (
                          <div key={application.id} className="p-4 border border-slate-200 rounded-xl">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-slate-900">{application.job.title}</h4>
                                <p className="text-sm text-slate-500">{application.job.company}</p>
                                <p className="text-sm text-slate-500">{application.job.location}</p>
                              </div>
                              <div className="text-right">
                                <Badge 
                                  variant={
                                    application.status === 'accepted' ? 'default' :
                                    application.status === 'pending' ? 'secondary' : 'destructive'
                                  }
                                >
                                  {application.status}
                                </Badge>
                                {application.matchScore && (
                                  <div className="text-sm text-slate-500 mt-1">
                                    {application.matchScore}% match
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-slate-400 mb-2">💼</div>
                          <p className="text-slate-500">No job applications yet</p>
                          <Button className="mt-4">Browse Jobs</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.length > 0 ? (
                        recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">
                                {activity.description}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(activity.createdAt!).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-slate-400 mb-2">📋</div>
                          <p className="text-slate-500">No recent activity</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Renewals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Renewals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expiringCredentials.length > 0 ? (
                    expiringCredentials.slice(0, 3).map((credential) => {
                      const daysUntilExpiry = credential.expiryDate 
                        ? Math.ceil((new Date(credential.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        : null;
                      
                      return (
                        <div key={credential.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
                            !
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">{credential.name}</div>
                            <div className="text-xs text-red-600">
                              {daysUntilExpiry !== null 
                                ? `Expires in ${daysUntilExpiry} days`
                                : 'Expired'
                              }
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-slate-500 text-center py-4">All credentials current</p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Schedule Renewals
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
