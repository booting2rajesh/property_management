import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Filter,
  Clock,
  MapPin,
  Phone,
  User,
} from "lucide-react";

interface TenantActivity {
  id: number;
  tenantName: string;
  unitNumber: string;
  propertyName: string;
  action: "move_in" | "move_out" | "rent_paid" | "maintenance_request";
  date: string;
  amount?: string;
  status: "completed" | "pending" | "overdue";
}

interface TimelineFilter {
  period: string;
  startDate: string;
  endDate: string;
}

const Dashboard = () => {
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>({
    period: "last_30_days",
    startDate: "",
    endDate: "",
  });

  const [activities] = useState<TenantActivity[]>([
    {
      id: 1,
      tenantName: "Raj Kumar",
      unitNumber: "A-101",
      propertyName: "Sunrise Apartments",
      action: "rent_paid",
      date: "2024-01-15",
      amount: "₹25,000",
      status: "completed",
    },
    {
      id: 2,
      tenantName: "Priya Sharma",
      unitNumber: "B-201",
      propertyName: "Green Valley Residency",
      action: "move_in",
      date: "2024-01-10",
      status: "completed",
    },
    {
      id: 3,
      tenantName: "Amit Patel",
      unitNumber: "A-102",
      propertyName: "Sunrise Apartments",
      action: "move_out",
      date: "2024-01-05",
      status: "completed",
    },
    {
      id: 4,
      tenantName: "Sita Devi",
      unitNumber: "C-301",
      propertyName: "Green Valley Residency",
      action: "maintenance_request",
      date: "2024-01-12",
      status: "pending",
    },
    {
      id: 5,
      tenantName: "Ravi Reddy",
      unitNumber: "B-201",
      propertyName: "Sunrise Apartments",
      action: "rent_paid",
      date: "2024-01-08",
      amount: "₹24,000",
      status: "completed",
    },
  ]);

  const getFilteredActivities = () => {
    const now = new Date();
    let startDate: Date;
    let endDate = now;

    switch (timelineFilter.period) {
      case "last_7_days":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "last_30_days":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "last_90_days":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "custom":
        if (timelineFilter.startDate && timelineFilter.endDate) {
          startDate = new Date(timelineFilter.startDate);
          endDate = new Date(timelineFilter.endDate);
        } else {
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      return activityDate >= startDate && activityDate <= endDate;
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "move_in":
        return <Home className="w-4 h-4 text-green-600" />;
      case "move_out":
        return <Home className="w-4 h-4 text-red-600" />;
      case "rent_paid":
        return <DollarSign className="w-4 h-4 text-blue-600" />;
      case "maintenance_request":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "move_in":
        return "Moved In";
      case "move_out":
        return "Moved Out";
      case "rent_paid":
        return "Rent Paid";
      case "maintenance_request":
        return "Maintenance Request";
      default:
        return action;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredActivities = getFilteredActivities();

  // Calculate timeline-based statistics
  const timelineStats = {
    moveIns: filteredActivities.filter((a) => a.action === "move_in").length,
    moveOuts: filteredActivities.filter((a) => a.action === "move_out").length,
    rentCollected: filteredActivities
      .filter((a) => a.action === "rent_paid")
      .reduce(
        (sum, a) => sum + parseInt(a.amount?.replace(/[₹,]/g, "") || "0"),
        0,
      ),
    maintenanceRequests: filteredActivities.filter(
      (a) => a.action === "maintenance_request",
    ).length,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Dashboard"
          subtitle="Welcome back! Here's your property overview with timeline insights."
          actions={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <Select
                  value={timelineFilter.period}
                  onValueChange={(value) =>
                    setTimelineFilter((prev) => ({ ...prev, period: value }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {timelineFilter.period === "custom" && (
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={timelineFilter.startDate}
                    onChange={(e) =>
                      setTimelineFilter((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-40"
                  />
                  <span className="text-sm text-gray-500">to</span>
                  <Input
                    type="date"
                    value={timelineFilter.endDate}
                    onChange={(e) =>
                      setTimelineFilter((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-40"
                  />
                </div>
              )}
              <Button className="bg-primary hover:bg-primary/90">
                Generate Report
              </Button>
            </div>
          }
        />

        <main className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          39
                        </p>
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
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          39
                        </p>
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
                          ₹9.8L
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">
                            +8.1% vs last month
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => (window.location.href = "/tenants")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Active Tenants
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          92
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">
                            +3.2% vs last month
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline-based Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Move-ins (Selected Period)
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {timelineStats.moveIns}
                        </p>
                      </div>
                      <Home className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Move-outs (Selected Period)
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          {timelineStats.moveOuts}
                        </p>
                      </div>
                      <Home className="w-8 h-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Rent Collected
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{(timelineStats.rentCollected / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Maintenance Requests
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          {timelineStats.maintenanceRequests}
                        </p>
                      </div>
                      <AlertCircle className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Tenant Activity Timeline
                  </h3>
                  <Badge variant="outline">
                    {filteredActivities.length} activities
                  </Badge>
                </div>

                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {getActionIcon(activity.action)}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {activity.tenantName}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {activity.unitNumber}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                  {getActionText(activity.action)}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{activity.propertyName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                                    {new Date(
                                      activity.date,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                {activity.amount && (
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="w-3 h-3" />
                                    <span className="font-medium text-green-600">
                                      {activity.amount}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={getStatusBadgeVariant(activity.status)}
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredActivities.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">
                      No activities found for the selected period
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Current Occupancy
                        </span>
                        <span className="text-2xl font-bold">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                      <div className="text-sm text-gray-600">
                        39 of 45 units occupied
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tenant Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Average Stay Duration
                        </span>
                        <span className="text-2xl font-bold">18 months</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Based on {timelineFilter.period.replace("_", " ")} data
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
