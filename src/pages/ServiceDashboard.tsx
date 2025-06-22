import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Wrench,
  Zap,
  Car,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

const ServiceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("pending-requests");

  // Mock service request data
  const pendingRequests = [
    {
      id: 1,
      ticketNumber: "SR-2024-001",
      tenant: {
        name: "Raj Kumar",
        email: "raj.kumar@email.com",
        avatar: "",
      },
      unit: "A-101",
      property: "Sunrise Apartments",
      category: "plumbing",
      priority: "high",
      status: "open",
      title: "Water leakage in bathroom",
      description:
        "Continuous water dripping under bathroom sink needs immediate attention",
      createdDate: "2024-01-15T10:30:00Z",
      assignedTo: "John Maintenance",
      estimatedResolution: "2024-01-17",
      daysOpen: 2,
    },
    {
      id: 2,
      ticketNumber: "SR-2024-002",
      tenant: {
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        avatar: "",
      },
      unit: "A-102",
      property: "Sunrise Apartments",
      category: "electrical",
      priority: "medium",
      status: "in_progress",
      title: "Power outlet not working in kitchen",
      description:
        "Kitchen power outlet stopped working, need electrician check",
      createdDate: "2024-01-14T14:20:00Z",
      assignedTo: "Mike Electrician",
      estimatedResolution: "2024-01-16",
      daysOpen: 3,
    },
    {
      id: 3,
      ticketNumber: "SR-2024-004",
      tenant: {
        name: "Sita Devi",
        email: "sita.devi@email.com",
        avatar: "",
      },
      unit: "B-202",
      property: "Green Valley Residency",
      category: "parking",
      priority: "low",
      status: "open",
      title: "Parking space marking faded",
      description: "Need to repaint parking space number markings",
      createdDate: "2024-01-12T16:45:00Z",
      assignedTo: "Property Manager",
      estimatedResolution: "2024-01-20",
      daysOpen: 5,
    },
  ];

  const upcomingMaintenance = [
    {
      id: 1,
      type: "Preventive Maintenance",
      property: "Sunrise Apartments",
      area: "Elevator Service",
      scheduledDate: "2024-01-25",
      contractor: "Elevator Tech Solutions",
      estimatedDuration: "4 hours",
      cost: "₹15,000",
      status: "scheduled",
    },
    {
      id: 2,
      type: "Routine Inspection",
      property: "Green Valley Residency",
      area: "Fire Safety Systems",
      scheduledDate: "2024-01-28",
      contractor: "SafeGuard Systems",
      estimatedDuration: "2 hours",
      cost: "₹8,000",
      status: "scheduled",
    },
    {
      id: 3,
      type: "Preventive Maintenance",
      property: "Sunrise Apartments",
      area: "Water Tank Cleaning",
      scheduledDate: "2024-02-01",
      contractor: "AquaClean Services",
      estimatedDuration: "6 hours",
      cost: "₹12,000",
      status: "pending_approval",
    },
    {
      id: 4,
      type: "Routine Maintenance",
      property: "Green Valley Residency",
      area: "Garden & Landscaping",
      scheduledDate: "2024-02-05",
      contractor: "Green Thumb Landscaping",
      estimatedDuration: "8 hours",
      cost: "₹20,000",
      status: "scheduled",
    },
  ];

  const categoryIcons = {
    plumbing: Wrench,
    electrical: Zap,
    parking: Car,
    co_tenant: Users,
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent =
      categoryIcons[category as keyof typeof categoryIcons] || AlertCircle;
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "pending_approval":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = pendingRequests.filter((request) => {
    const matchesSearch =
      request.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || request.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredMaintenance = upcomingMaintenance.filter((maintenance) => {
    const matchesSearch =
      maintenance.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.contractor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || maintenance.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/service-dashboard" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Service Request Dashboard"
          subtitle="Monitor pending requests and upcoming maintenance work"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending_approval">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Requests
                    </p>
                    <p className="text-3xl font-bold text-red-700 mt-2">
                      {
                        pendingRequests.filter((r) => r.status === "open")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      In Progress
                    </p>
                    <p className="text-3xl font-bold text-yellow-700 mt-2">
                      {
                        pendingRequests.filter(
                          (r) => r.status === "in_progress",
                        ).length
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Upcoming Maintenance
                    </p>
                    <p className="text-3xl font-bold text-blue-700 mt-2">
                      {
                        upcomingMaintenance.filter(
                          (m) => m.status === "scheduled",
                        ).length
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Response Time
                    </p>
                    <p className="text-3xl font-bold text-green-700 mt-2">
                      2.5
                    </p>
                    <p className="text-sm text-gray-500">hours</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="pending-requests"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Pending Requests ({filteredRequests.length})
              </TabsTrigger>
              <TabsTrigger
                value="upcoming-maintenance"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Upcoming Maintenance ({filteredMaintenance.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending-requests" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {filteredRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="border-l-4 border-l-red-500"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(request.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">
                                {request.title}
                              </h3>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status === "in_progress"
                                  ? "IN PROGRESS"
                                  : "OPEN"}
                              </Badge>
                              <Badge
                                className={getPriorityColor(request.priority)}
                              >
                                {request.priority.toUpperCase()} PRIORITY
                              </Badge>
                              <Badge variant="outline" className="text-red-600">
                                {request.daysOpen} days open
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                              <div>
                                <p className="text-gray-500">Ticket #</p>
                                <p className="font-medium">
                                  {request.ticketNumber}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Tenant</p>
                                <p className="font-medium">
                                  {request.tenant.name}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Unit</p>
                                <p className="font-medium">{request.unit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Category</p>
                                <p className="font-medium capitalize">
                                  {request.category}
                                </p>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">
                              {request.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Created</p>
                                <p className="font-medium">
                                  {formatDateTime(request.createdDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Assigned To</p>
                                <p className="font-medium">
                                  {request.assignedTo}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Est. Resolution</p>
                                <p className="font-medium">
                                  {formatDate(request.estimatedResolution)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                          >
                            Update Status
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No pending requests found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming-maintenance" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {filteredMaintenance.map((maintenance) => (
                  <Card
                    key={maintenance.id}
                    className="border-l-4 border-l-blue-500"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">
                                {maintenance.area}
                              </h3>
                              <Badge
                                className={getStatusColor(maintenance.status)}
                              >
                                {maintenance.status === "pending_approval"
                                  ? "PENDING APPROVAL"
                                  : "SCHEDULED"}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                              <div>
                                <p className="text-gray-500">Type</p>
                                <p className="font-medium">
                                  {maintenance.type}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Property</p>
                                <p className="font-medium">
                                  {maintenance.property}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Scheduled Date</p>
                                <p className="font-medium">
                                  {formatDate(maintenance.scheduledDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Duration</p>
                                <p className="font-medium">
                                  {maintenance.estimatedDuration}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Contractor</p>
                                <p className="font-medium">
                                  {maintenance.contractor}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Estimated Cost</p>
                                <p className="font-medium text-green-600">
                                  {maintenance.cost}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {maintenance.status === "pending_approval" && (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              Approve
                            </Button>
                          )}
                          {maintenance.status === "scheduled" && (
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMaintenance.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No upcoming maintenance found.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ServiceDashboard;
