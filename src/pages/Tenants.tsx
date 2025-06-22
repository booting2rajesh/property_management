import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Edit,
  FileText,
  CreditCard,
  UserCheck,
} from "lucide-react";

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    unit: "",
    monthlyRent: "",
    advance: "",
    occupancyDate: "",
    aadhaarNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
  });

  const tenants = [
    {
      id: 1,
      name: "Raj Kumar",
      email: "raj.kumar@email.com",
      phone: "+91 9876543210",
      unit: "Unit A-101 • Sunrise Apartments",
      moveInDate: "Since Jun 2023",
      monthlyRent: "₹25,000",
      advance: "₹50,000",
      status: "verified",
      avatar: "",
      badges: ["Agreement", "Payments", "KYC"],
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543212",
      unit: "Unit B-201 • Green Valley Residency",
      moveInDate: "Since Jan 2024",
      monthlyRent: "₹22,000",
      advance: "₹44,000",
      status: "pending",
      avatar: "",
      badges: ["Agreement", "Payments", "KYC"],
    },
  ];

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone.includes(searchTerm),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Add tenant:", formData);
    setIsAddModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      unit: "",
      monthlyRent: "",
      advance: "",
      occupancyDate: "",
      aadhaarNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/tenants" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Tenant Management"
          subtitle="Manage tenant profiles and documentation"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tenants by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tenant
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Tenant</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={formData.unit}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, unit: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A-101">
                              A-101 - Sunrise Apartments
                            </SelectItem>
                            <SelectItem value="A-102">
                              A-102 - Sunrise Apartments
                            </SelectItem>
                            <SelectItem value="B-201">
                              B-201 - Green Valley
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                        <Input
                          id="monthlyRent"
                          name="monthlyRent"
                          placeholder="Enter monthly rent"
                          value={formData.monthlyRent}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="advance">Advance (₹)</Label>
                        <Input
                          id="advance"
                          name="advance"
                          placeholder="Enter advance amount"
                          value={formData.advance}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupancyDate">Occupancy Date</Label>
                        <Input
                          id="occupancyDate"
                          name="occupancyDate"
                          type="date"
                          value={formData.occupancyDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                        <Input
                          id="aadhaarNumber"
                          name="aadhaarNumber"
                          placeholder="Enter Aadhaar number"
                          value={formData.aadhaarNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base font-medium">
                        Emergency Contact
                      </Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactName">Name</Label>
                          <Input
                            id="emergencyContactName"
                            name="emergencyContactName"
                            placeholder="Contact name"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactPhone">Phone</Label>
                          <Input
                            id="emergencyContactPhone"
                            name="emergencyContactPhone"
                            placeholder="Contact phone"
                            value={formData.emergencyContactPhone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactRelation">
                            Relation
                          </Label>
                          <Input
                            id="emergencyContactRelation"
                            name="emergencyContactRelation"
                            placeholder="Relation"
                            value={formData.emergencyContactRelation}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsAddModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Add Tenant
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTenants.map((tenant) => (
              <Card key={tenant.id} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={tenant.avatar} alt={tenant.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {tenant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {tenant.name}
                          </h3>
                          <Badge
                            className={`mt-1 ${
                              tenant.status === "verified"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }`}
                          >
                            {tenant.status === "verified"
                              ? "✓ Verified"
                              : "⏳ Pending"}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{tenant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{tenant.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{tenant.moveInDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Rent</p>
                      <p className="font-semibold text-gray-900">
                        {tenant.monthlyRent}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Advance</p>
                      <p className="font-semibold text-gray-900">
                        {tenant.advance}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {tenant.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {badge === "Agreement" && (
                          <FileText className="w-3 h-3 mr-1" />
                        )}
                        {badge === "Payments" && (
                          <CreditCard className="w-3 h-3 mr-1" />
                        )}
                        {badge === "KYC" && (
                          <UserCheck className="w-3 h-3 mr-1" />
                        )}
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tenants found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Tenants;
