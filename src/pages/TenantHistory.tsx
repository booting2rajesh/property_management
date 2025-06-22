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
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react";

const TenantHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for tenant history
  const tenantHistory = [
    {
      id: 1,
      unit: "A-101",
      property: "Sunrise Apartments",
      tenants: [
        {
          id: 1,
          name: "Raj Kumar",
          email: "raj.kumar@email.com",
          phone: "+91 9876543210",
          moveInDate: "2023-06-15",
          moveOutDate: null,
          status: "current",
          monthlyRent: 25000,
          deposit: 50000,
          totalStayed: "8 months",
          avatar: "",
        },
        {
          id: 2,
          name: "Amit Sharma",
          email: "amit.sharma@email.com",
          phone: "+91 9876543211",
          moveInDate: "2022-01-10",
          moveOutDate: "2023-05-30",
          status: "moved_out",
          monthlyRent: 23000,
          deposit: 46000,
          totalStayed: "1 year 4 months",
          avatar: "",
          reason: "Job relocation",
        },
        {
          id: 3,
          name: "Sunita Devi",
          email: "sunita.devi@email.com",
          phone: "+91 9876543212",
          moveInDate: "2021-03-01",
          moveOutDate: "2021-12-15",
          status: "moved_out",
          monthlyRent: 22000,
          deposit: 44000,
          totalStayed: "9 months",
          avatar: "",
          reason: "Property purchase",
        },
      ],
    },
    {
      id: 2,
      unit: "A-102",
      property: "Sunrise Apartments",
      tenants: [
        {
          id: 4,
          name: "Priya Sharma",
          email: "priya.sharma@email.com",
          phone: "+91 9876543213",
          moveInDate: "2024-01-15",
          moveOutDate: null,
          status: "current",
          monthlyRent: 28000,
          deposit: 56000,
          totalStayed: "3 months",
          avatar: "",
        },
        {
          id: 5,
          name: "Vikram Singh",
          email: "vikram.singh@email.com",
          phone: "+91 9876543214",
          moveInDate: "2023-03-01",
          moveOutDate: "2023-12-31",
          status: "moved_out",
          monthlyRent: 26000,
          deposit: 52000,
          totalStayed: "10 months",
          avatar: "",
          reason: "Family expansion",
        },
      ],
    },
    {
      id: 3,
      unit: "B-201",
      property: "Green Valley Residency",
      tenants: [
        {
          id: 6,
          name: "Apartment Vacant",
          status: "vacant",
          moveInDate: null,
          moveOutDate: null,
          totalStayed: "0 months",
        },
        {
          id: 7,
          name: "Ravi Patel",
          email: "ravi.patel@email.com",
          phone: "+91 9876543215",
          moveInDate: "2022-08-01",
          moveOutDate: "2023-11-30",
          status: "moved_out",
          monthlyRent: 24000,
          deposit: 48000,
          totalStayed: "1 year 3 months",
          avatar: "",
          reason: "Better opportunity",
        },
      ],
    },
  ];

  const filteredHistory = tenantHistory.filter((unit) => {
    const matchesUnit = unitFilter === "all" || unit.unit === unitFilter;
    const matchesSearch =
      unit.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.tenants.some((tenant) =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    let matchesStatus = true;
    if (statusFilter === "current") {
      matchesStatus = unit.tenants.some(
        (tenant) => tenant.status === "current",
      );
    } else if (statusFilter === "vacant") {
      matchesStatus = unit.tenants.some((tenant) => tenant.status === "vacant");
    } else if (statusFilter === "moved_out") {
      matchesStatus = unit.tenants.some(
        (tenant) => tenant.status === "moved_out",
      );
    }

    return matchesUnit && matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "moved_out":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "vacant":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/tenant-history" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Tenant History"
          subtitle="Track tenant movements and unit occupancy history"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search units or tenants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={unitFilter} onValueChange={setUnitFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="A-101">A-101</SelectItem>
                  <SelectItem value="A-102">A-102</SelectItem>
                  <SelectItem value="B-201">B-201</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="moved_out">Moved Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />

        <main className="p-6">
          <div className="space-y-6">
            {filteredHistory.map((unit) => (
              <Card key={unit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        Unit {unit.unit} - {unit.property}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {unit.tenants.length} tenant(s) in history
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {unit.property}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {unit.tenants
                      .sort((a, b) => {
                        // Sort current tenants first, then by move-in date (newest first)
                        if (a.status === "current") return -1;
                        if (b.status === "current") return 1;
                        return (
                          new Date(b.moveInDate || "").getTime() -
                          new Date(a.moveInDate || "").getTime()
                        );
                      })
                      .map((tenant, index) => (
                        <div
                          key={tenant.id}
                          className="border rounded-lg p-4 bg-white"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={tenant.avatar}
                                  alt={tenant.name}
                                />
                                <AvatarFallback className="bg-primary text-white">
                                  {tenant.status === "vacant"
                                    ? "V"
                                    : tenant.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-lg">
                                    {tenant.name}
                                  </h4>
                                  <Badge
                                    className={getStatusColor(tenant.status)}
                                  >
                                    {tenant.status === "current"
                                      ? "Current Tenant"
                                      : tenant.status === "vacant"
                                        ? "Vacant"
                                        : "Moved Out"}
                                  </Badge>
                                </div>

                                {tenant.status !== "vacant" && (
                                  <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                      <div>
                                        <p className="text-gray-500">Email</p>
                                        <p className="font-medium">
                                          {tenant.email}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500">Phone</p>
                                        <p className="font-medium">
                                          {tenant.phone}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500">
                                          Monthly Rent
                                        </p>
                                        <p className="font-medium">
                                          ₹
                                          {tenant.monthlyRent?.toLocaleString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500">Deposit</p>
                                        <p className="font-medium">
                                          ₹{tenant.deposit?.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-6 mt-3 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                        <span>
                                          <span className="text-gray-500">
                                            Move In:
                                          </span>{" "}
                                          <span className="font-medium">
                                            {formatDate(tenant.moveInDate)}
                                          </span>
                                        </span>
                                      </div>

                                      {tenant.moveOutDate && (
                                        <div className="flex items-center gap-2">
                                          <ArrowRight className="w-4 h-4 text-gray-400" />
                                          <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-red-600" />
                                            <span>
                                              <span className="text-gray-500">
                                                Move Out:
                                              </span>{" "}
                                              <span className="font-medium">
                                                {formatDate(tenant.moveOutDate)}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span>
                                          <span className="text-gray-500">
                                            Duration:
                                          </span>{" "}
                                          <span className="font-medium">
                                            {tenant.totalStayed}
                                          </span>
                                        </span>
                                      </div>
                                    </div>

                                    {tenant.reason && (
                                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm">
                                          <span className="text-gray-500">
                                            Reason for leaving:
                                          </span>{" "}
                                          <span className="font-medium">
                                            {tenant.reason}
                                          </span>
                                        </p>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            {tenant.status !== "vacant" && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <FileText className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                                {tenant.status === "current" && (
                                  <Button size="sm" variant="outline">
                                    <User className="w-4 h-4 mr-1" />
                                    Move Out
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No tenant history found for the selected filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TenantHistory;
