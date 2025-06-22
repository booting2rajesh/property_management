import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Building,
  Users,
  IndianRupee,
  AlertCircle,
  Home,
  DollarSign,
  Send,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Dashboard"
          subtitle="Welcome back! Here's your property overview."
          actions={
            <Button className="bg-primary hover:bg-primary/90">
              Generate Report
            </Button>
          }
        />

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = "/properties")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Properties
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">39</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600">
                        +2.5% vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = "/units")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Occupied Units
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">39</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600">
                        +5.2% vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = "/billing")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly Revenue
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ₹30K
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600">
                        +12.3% vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = "/billing")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Payments
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-red-600">-8.1% vs last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Occupancy Status */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Occupancy Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg
                        className="w-32 h-32 transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#f3f4f6"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#ef4444"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${78 * 2.51} ${(100 - 78) * 2.51}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">
                          78%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Occupancy Rate</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Home className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold text-green-700">
                            39
                          </p>
                          <p className="text-sm text-green-600">
                            Occupied Units
                          </p>
                          <p className="text-xs text-green-500 mt-1">
                            Action Required
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Home className="w-8 h-8 text-red-600" />
                        <div>
                          <p className="text-2xl font-bold text-red-700">11</p>
                          <p className="text-sm text-red-600">Vacant Units</p>
                          <p className="text-xs text-red-500 mt-1">
                            Action Required
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Vacant</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Pending Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-yellow-800">
                          Payment Reminders
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          1 tenants have pending payments
                        </p>
                        <Button
                          size="sm"
                          className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          Send Reminders
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-red-800">
                          Service Requests
                        </h4>
                        <p className="text-sm text-red-700 mt-1">
                          1 open service requests
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() =>
                            (window.location.href = "/service-dashboard")
                          }
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-800">
                          Monthly Reports
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Generate and send monthly reports
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800">
                          Upcoming Renewals
                        </h4>
                        <p className="text-sm text-green-700 mt-1">
                          3 lease agreements expiring soon
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-green-300 text-green-700 hover:bg-green-50"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
