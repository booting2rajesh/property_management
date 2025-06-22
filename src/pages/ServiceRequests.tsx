import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Filter,
  Wrench,
  Zap,
  Car,
  Users,
  Star,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
} from "lucide-react";

const ServiceRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("service-requests");

  const [serviceRequests, setServiceRequests] = useState([
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
        "There is a water leakage under the bathroom sink. Water is dripping continuously.",
      createdDate: "2024-01-15T10:30:00Z",
      assignedTo: "John Maintenance",
      estimatedResolution: "2024-01-17",
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
      title: "Power outlet not working",
      description:
        "The power outlet in the kitchen is not working. Need electrician to check.",
      createdDate: "2024-01-14T14:20:00Z",
      assignedTo: "Mike Electrician",
      estimatedResolution: "2024-01-16",
    },
    {
      id: 3,
      ticketNumber: "SR-2024-003",
      tenant: {
        name: "Amit Patel",
        email: "amit.patel@email.com",
        avatar: "",
      },
      unit: "B-201",
      property: "Green Valley Residency",
      category: "parking",
      priority: "low",
      status: "resolved",
      title: "Parking space allocation issue",
      description: "Need clarification on assigned parking space number.",
      createdDate: "2024-01-10T09:15:00Z",
      assignedTo: "Property Manager",
      estimatedResolution: "2024-01-11",
      resolvedDate: "2024-01-11T16:30:00Z",
    },
  ]);

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      tenant: {
        name: "Raj Kumar",
        email: "raj.kumar@email.com",
        avatar: "",
      },
      unit: "A-101",
      property: "Sunrise Apartments",
      rating: 5,
      category: "maintenance",
      title: "Excellent maintenance service",
      message:
        "The maintenance team was very prompt and professional. Fixed the issue within hours.",
      submittedDate: "2024-01-12T11:00:00Z",
      status: "reviewed",
    },
    {
      id: 2,
      tenant: {
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        avatar: "",
      },
      unit: "A-102",
      property: "Sunrise Apartments",
      rating: 4,
      category: "amenities",
      title: "Good facilities",
      message:
        "The gym and swimming pool facilities are well maintained. Could use better equipment in gym.",
      submittedDate: "2024-01-10T15:30:00Z",
      status: "pending",
    },
    {
      id: 3,
      tenant: {
        name: "Sita Devi",
        email: "sita.devi@email.com",
        avatar: "",
      },
      unit: "B-202",
      property: "Green Valley Residency",
      rating: 3,
      category: "security",
      title: "Security concerns",
      message:
        "Night security could be improved. Sometimes gate is left unattended.",
      submittedDate: "2024-01-08T20:45:00Z",
      status: "pending",
    },
  ]);

  const categoryIcons = {
    plumbing: Wrench,
    electrical: Zap,
    parking: Car,
    co_tenant: Users,
    maintenance: Wrench,
    amenities: Users,
    security: AlertCircle,
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
      case "pending":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "reviewed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
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

  const filteredRequests = serviceRequests.filter((request) => {
    const matchesSearch =
      request.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || request.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch =
      item.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/service-requests" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Service Requests & Feedback"
          subtitle="Manage maintenance requests and collect tenant feedback"
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
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                  <SelectItem value="co_tenant">Co-tenant</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="amenities">Amenities</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />

        <main className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="service-requests"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Service Requests
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Tenant Feedback
              </TabsTrigger>
            </TabsList>

            <TabsContent value="service-requests" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {filteredRequests.map((request) => (
                  <Card key={request.id}>
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
                                  ? "In Progress"
                                  : request.status.toUpperCase()}
                              </Badge>
                              <Badge
                                className={getPriorityColor(request.priority)}
                              >
                                {request.priority.toUpperCase()} PRIORITY
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
                                  {formatDate(request.createdDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Assigned To</p>
                                <p className="font-medium">
                                  {request.assignedTo}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">
                                  {request.status === "resolved"
                                    ? "Resolved"
                                    : "Est. Resolution"}
                                </p>
                                <p className="font-medium">
                                  {request.resolvedDate
                                    ? formatDate(request.resolvedDate)
                                    : new Date(
                                        request.estimatedResolution,
                                      ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Update
                          </Button>
                          {request.status !== "resolved" && (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No service requests found for the selected filters.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {filteredFeedback.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={item.tenant.avatar}
                              alt={item.tenant.name}
                            />
                            <AvatarFallback className="bg-primary text-white">
                              {item.tenant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">
                                {item.title}
                              </h3>
                              {renderStars(item.rating)}
                              <Badge className={getStatusColor(item.status)}>
                                {item.status.toUpperCase()}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                              <div>
                                <p className="text-gray-500">Tenant</p>
                                <p className="font-medium">
                                  {item.tenant.name}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Unit</p>
                                <p className="font-medium">{item.unit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Category</p>
                                <p className="font-medium capitalize">
                                  {item.category}
                                </p>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">{item.message}</p>

                            <div className="text-sm">
                              <p className="text-gray-500">Submitted</p>
                              <p className="font-medium">
                                {formatDate(item.submittedDate)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Respond
                          </Button>
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark Reviewed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFeedback.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No feedback found for the selected filters.
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

export default ServiceRequests;
