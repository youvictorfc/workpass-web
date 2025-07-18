import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import WorkReadinessMeter from "@/components/WorkReadinessMeter";

export default function Home() {
  const { user, isLoading } = useAuth();

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                W
              </div>
              <h1 className="text-xl font-bold text-slate-900">WorkPass Australia</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Welcome back, {user?.firstName || 'User'}</span>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Welcome Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center space-x-4">
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
                    Welcome back, {user?.firstName || 'User'}!
                  </h2>
                  <p className="text-blue-100">
                    {dashboardData?.profile?.role || 'Construction Professional'} • 
                    {dashboardData?.profile?.yearsExperience || 0} years experience
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Link href="/dashboard">
                  <Button variant="secondary" className="w-full">
                    View Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Upload Document
                </Button>
              </div>
            </div>

            {/* Work Readiness */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Work Readiness Score
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {dashboardData?.workReadinessScore || 0}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={dashboardData?.workReadinessScore || 0} className="h-3" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {dashboardData?.credentials?.filter(c => c.category === 'safety').length || 0}
                      </div>
                      <div className="text-sm text-slate-500">Safety Certs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {dashboardData?.credentials?.filter(c => c.category === 'trade').length || 0}
                      </div>
                      <div className="text-sm text-slate-500">Trade Quals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {dashboardData?.credentials?.filter(c => c.category === 'medical').length || 0}
                      </div>
                      <div className="text-sm text-slate-500">Medical</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {dashboardData?.credentials?.filter(c => c.category === 'license').length || 0}
                      </div>
                      <div className="text-sm text-slate-500">Licenses</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recentActivity?.length > 0 ? (
                    dashboardData.recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={activity.id} className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
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
                    <p className="text-slate-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expiring Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Renewals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData?.expiringCredentials?.length > 0 ? (
                    dashboardData.expiringCredentials.slice(0, 3).map((credential) => (
                      <div key={credential.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
                          !
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">{credential.name}</div>
                          <div className="text-xs text-red-600">
                            Expires {credential.expiryDate ? new Date(credential.expiryDate).toLocaleDateString() : 'Soon'}
                          </div>
                        </div>
                      </div>
                    ))
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
