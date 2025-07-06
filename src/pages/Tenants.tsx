import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";
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
  Building,
  Home,
  Upload as UploadIcon,
  User,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  unit: string;
  propertyName: string;
  moveInDate: string;
  monthlyRent: string;
  advance: string;
  status: "verified" | "pending" | "rejected";
  avatar: string;
  badges: string[];
  personalInfo: {
    aadhaarNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
    permanentAddress: string;
    occupation: string;
    monthlyIncome: string;
  };
  identityProofs: UploadedFile[];
  agreementDocuments: UploadedFile[];
}

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    unit: "",
    propertyName: "",
    monthlyRent: "",
    advance: "",
    occupancyDate: "",
    aadhaarNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    permanentAddress: "",
    occupation: "",
    monthlyIncome: "",
  });

  const [identityProofs, setIdentityProofs] = useState<UploadedFile[]>([]);
  const [agreementDocs, setAgreementDocs] = useState<UploadedFile[]>([]);

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: 1,
      name: "Raj Kumar",
      email: "raj.kumar@email.com",
      phone: "+91 9876543210",
      unit: "A-101",
      propertyName: "Sunrise Apartments",
      moveInDate: "Since Jun 2023",
      monthlyRent: "₹25,000",
      advance: "₹50,000",
      status: "verified",
      avatar: "",
      badges: ["Agreement", "Payments", "KYC"],
      personalInfo: {
        aadhaarNumber: "1234-5678-9012",
        emergencyContactName: "Sita Kumar",
        emergencyContactPhone: "+91 9876543211",
        emergencyContactRelation: "Wife",
        permanentAddress: "123 Home Street, Chennai",
        occupation: "Software Engineer",
        monthlyIncome: "₹85,000",
      },
      identityProofs: [
        {
          id: "1",
          name: "aadhaar-card.pdf",
          size: 500000,
          type: "application/pdf",
          url: "#",
        },
        {
          id: "2",
          name: "pan-card.jpg",
          size: 300000,
          type: "image/jpeg",
          url: "#",
        },
      ],
      agreementDocuments: [
        {
          id: "3",
          name: "rental-agreement.pdf",
          size: 800000,
          type: "application/pdf",
          url: "#",
        },
      ],
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543212",
      unit: "B-201",
      propertyName: "Green Valley Residency",
      moveInDate: "Since Jan 2024",
      monthlyRent: "₹22,000",
      advance: "₹44,000",
      status: "pending",
      avatar: "",
      badges: ["Agreement", "Payments"],
      personalInfo: {
        aadhaarNumber: "5678-9012-3456",
        emergencyContactName: "Ravi Sharma",
        emergencyContactPhone: "+91 9876543213",
        emergencyContactRelation: "Husband",
        permanentAddress: "456 Main Road, Bangalore",
        occupation: "Marketing Manager",
        monthlyIncome: "₹70,000",
      },
      identityProofs: [],
      agreementDocuments: [],
    },
  ]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();

    const newTenant: Tenant = {
      id: tenants.length + 1,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      unit: formData.unit,
      propertyName: formData.propertyName,
      moveInDate: `Since ${new Date(formData.occupancyDate).toLocaleDateString(
        "en-US",
        { month: "short", year: "numeric" },
      )}`,
      monthlyRent: `₹${formData.monthlyRent}`,
      advance: `₹${formData.advance}`,
      status: "pending",
      avatar: "",
      badges: ["Agreement"],
      personalInfo: {
        aadhaarNumber: formData.aadhaarNumber,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        emergencyContactRelation: formData.emergencyContactRelation,
        permanentAddress: formData.permanentAddress,
        occupation: formData.occupation,
        monthlyIncome: formData.monthlyIncome,
      },
      identityProofs: identityProofs,
      agreementDocuments: agreementDocs,
    };

    setTenants((prev) => [...prev, newTenant]);
    setIsAddModalOpen(false);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      unit: "",
      propertyName: "",
      monthlyRent: "",
      advance: "",
      occupancyDate: "",
      aadhaarNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      permanentAddress: "",
      occupation: "",
      monthlyIncome: "",
    });
    setIdentityProofs([]);
    setAgreementDocs([]);
  };

  const handleEditTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant) return;

    const updatedTenant: Tenant = {
      ...selectedTenant,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      unit: formData.unit,
      propertyName: formData.propertyName,
      monthlyRent: `₹${formData.monthlyRent}`,
      advance: `₹${formData.advance}`,
      personalInfo: {
        aadhaarNumber: formData.aadhaarNumber,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        emergencyContactRelation: formData.emergencyContactRelation,
        permanentAddress: formData.permanentAddress,
        occupation: formData.occupation,
        monthlyIncome: formData.monthlyIncome,
      },
      identityProofs: identityProofs,
      agreementDocuments: agreementDocs,
    };

    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === selectedTenant.id ? updatedTenant : tenant,
      ),
    );

    setIsEditModalOpen(false);
    setSelectedTenant(null);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      unit: "",
      propertyName: "",
      monthlyRent: "",
      advance: "",
      occupancyDate: "",
      aadhaarNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      permanentAddress: "",
      occupation: "",
      monthlyIncome: "",
    });
    setIdentityProofs([]);
    setAgreementDocs([]);
  };

  const viewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsViewModalOpen(true);
  };

  const editTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setFormData({
      fullName: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      unit: tenant.unit,
      propertyName: tenant.propertyName,
      monthlyRent: tenant.monthlyRent.replace("₹", ""),
      advance: tenant.advance.replace("₹", ""),
      occupancyDate: "",
      aadhaarNumber: tenant.personalInfo.aadhaarNumber,
      emergencyContactName: tenant.personalInfo.emergencyContactName,
      emergencyContactPhone: tenant.personalInfo.emergencyContactPhone,
      emergencyContactRelation: tenant.personalInfo.emergencyContactRelation,
      permanentAddress: tenant.personalInfo.permanentAddress,
      occupation: tenant.personalInfo.occupation,
      monthlyIncome: tenant.personalInfo.monthlyIncome,
    });
    // Deep copy the existing documents to avoid reference issues
    setIdentityProofs([...tenant.identityProofs]);
    setAgreementDocs([...tenant.agreementDocuments]);
    setIsEditModalOpen(true);
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.propertyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/tenants" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Tenants"
          subtitle="Manage tenant profiles and documentation"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tenants..."
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
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tenant
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Tenant</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddTenant} className="space-y-6">
                    <Tabs defaultValue="personal" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="rental">Rental Info</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="emergency">Emergency</TabsTrigger>
                      </TabsList>

                      <TabsContent value="personal" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <Label htmlFor="aadhaarNumber">
                              Aadhaar Number
                            </Label>
                            <Input
                              id="aadhaarNumber"
                              name="aadhaarNumber"
                              placeholder="Enter Aadhaar number"
                              value={formData.aadhaarNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input
                              id="occupation"
                              name="occupation"
                              placeholder="Enter occupation"
                              value={formData.occupation}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyIncome">
                              Monthly Income
                            </Label>
                            <Input
                              id="monthlyIncome"
                              name="monthlyIncome"
                              placeholder="Enter monthly income"
                              value={formData.monthlyIncome}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="permanentAddress">
                            Permanent Address
                          </Label>
                          <Textarea
                            id="permanentAddress"
                            name="permanentAddress"
                            placeholder="Enter permanent address"
                            value={formData.permanentAddress}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="rental" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="propertyName">Property Name</Label>
                            <Select
                              value={formData.propertyName}
                              onValueChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  propertyName: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select property" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Sunrise Apartments">
                                  Sunrise Apartments
                                </SelectItem>
                                <SelectItem value="Green Valley Residency">
                                  Green Valley Residency
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Input
                              id="unit"
                              name="unit"
                              placeholder="e.g., A-101"
                              value={formData.unit}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyRent">Monthly Rent</Label>
                            <Input
                              id="monthlyRent"
                              name="monthlyRent"
                              type="number"
                              placeholder="Enter monthly rent"
                              value={formData.monthlyRent}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="advance">Security Deposit</Label>
                            <Input
                              id="advance"
                              name="advance"
                              type="number"
                              placeholder="Enter security deposit"
                              value={formData.advance}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="occupancyDate">Move-in Date</Label>
                            <Input
                              id="occupancyDate"
                              name="occupancyDate"
                              type="date"
                              value={formData.occupancyDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="documents" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-base font-medium">
                              Identity Proofs
                            </Label>
                            <p className="text-sm text-gray-600 mb-3">
                              Upload Aadhaar card, PAN card, passport, etc.
                            </p>
                            <FileUpload
                              accept="image/*,.pdf"
                              maxFiles={5}
                              maxSize={5}
                              uploadType="documents"
                              onFilesChange={setIdentityProofs}
                              initialFiles={identityProofs}
                            />
                          </div>
                          <div>
                            <Label className="text-base font-medium">
                              Agreement Documents
                            </Label>
                            <p className="text-sm text-gray-600 mb-3">
                              Upload rental agreements, NOC, etc.
                            </p>
                            <FileUpload
                              accept=".pdf,.doc,.docx"
                              maxFiles={3}
                              maxSize={10}
                              uploadType="documents"
                              onFilesChange={setAgreementDocs}
                              initialFiles={agreementDocs}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="emergency" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyContactName">
                              Emergency Contact Name
                            </Label>
                            <Input
                              id="emergencyContactName"
                              name="emergencyContactName"
                              placeholder="Enter emergency contact name"
                              value={formData.emergencyContactName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyContactPhone">
                              Emergency Contact Phone
                            </Label>
                            <Input
                              id="emergencyContactPhone"
                              name="emergencyContactPhone"
                              placeholder="Enter emergency contact phone"
                              value={formData.emergencyContactPhone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyContactRelation">
                              Relationship
                            </Label>
                            <Select
                              value={formData.emergencyContactRelation}
                              onValueChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  emergencyContactRelation: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Father">Father</SelectItem>
                                <SelectItem value="Mother">Mother</SelectItem>
                                <SelectItem value="Spouse">Spouse</SelectItem>
                                <SelectItem value="Sibling">Sibling</SelectItem>
                                <SelectItem value="Friend">Friend</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tenant
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={tenant.avatar} />
                      <AvatarFallback>
                        {tenant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{tenant.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusVariant(tenant.status)}>
                          {getStatusIcon(tenant.status)}
                          <span className="ml-1 capitalize">
                            {tenant.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{tenant.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{tenant.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="truncate">
                        {tenant.unit} • {tenant.propertyName}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{tenant.moveInDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">{tenant.monthlyRent}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewTenant(tenant)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editTenant(tenant)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {tenant.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Tenant Modal */}
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              {selectedTenant && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {selectedTenant.name}
                      <Badge variant={getStatusVariant(selectedTenant.status)}>
                        {getStatusIcon(selectedTenant.status)}
                        <span className="ml-1 capitalize">
                          {selectedTenant.status}
                        </span>
                      </Badge>
                    </DialogTitle>
                  </DialogHeader>

                  <Tabs defaultValue="personal" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="rental">Rental Details</TabsTrigger>
                      <TabsTrigger value="documents">
                        Documents (
                        {selectedTenant.identityProofs.length +
                          selectedTenant.agreementDocuments.length}
                        )
                      </TabsTrigger>
                      <TabsTrigger value="emergency">
                        Emergency Contact
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Email
                          </Label>
                          <p className="mt-1">{selectedTenant.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Phone
                          </Label>
                          <p className="mt-1">{selectedTenant.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Aadhaar Number
                          </Label>
                          <p className="mt-1">
                            {selectedTenant.personalInfo.aadhaarNumber}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Occupation
                          </Label>
                          <p className="mt-1">
                            {selectedTenant.personalInfo.occupation}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Monthly Income
                          </Label>
                          <p className="mt-1">
                            {selectedTenant.personalInfo.monthlyIncome}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Permanent Address
                        </Label>
                        <p className="mt-1">
                          {selectedTenant.personalInfo.permanentAddress}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="rental" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Property
                          </Label>
                          <p className="mt-1">{selectedTenant.propertyName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Unit
                          </Label>
                          <p className="mt-1">{selectedTenant.unit}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Monthly Rent
                          </Label>
                          <p className="mt-1">{selectedTenant.monthlyRent}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Security Deposit
                          </Label>
                          <p className="mt-1">{selectedTenant.advance}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Move-in Date
                          </Label>
                          <p className="mt-1">{selectedTenant.moveInDate}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-3">Identity Proofs</h4>
                          {selectedTenant.identityProofs.length > 0 ? (
                            <div className="space-y-2">
                              {selectedTenant.identityProofs.map((doc) => (
                                <div
                                  key={doc.id}
                                  className="flex items-center gap-3 p-3 border rounded"
                                >
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div className="flex-1">
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">
                              No identity proofs uploaded
                            </p>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">
                            Agreement Documents
                          </h4>
                          {selectedTenant.agreementDocuments.length > 0 ? (
                            <div className="space-y-2">
                              {selectedTenant.agreementDocuments.map((doc) => (
                                <div
                                  key={doc.id}
                                  className="flex items-center gap-3 p-3 border rounded"
                                >
                                  <FileText className="w-5 h-5 text-green-600" />
                                  <div className="flex-1">
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">
                              No agreement documents uploaded
                            </p>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="emergency" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Contact Name
                          </Label>
                          <p className="mt-1">
                            {selectedTenant.personalInfo.emergencyContactName}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Contact Phone
                          </Label>
                          <p className="mt-1">
                            {selectedTenant.personalInfo.emergencyContactPhone}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Relationship
                          </Label>
                          <p className="mt-1">
                            {
                              selectedTenant.personalInfo
                                .emergencyContactRelation
                            }
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Tenant Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Tenant - {selectedTenant?.name}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditTenant} className="space-y-6">
                <Tabs defaultValue="personal" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="rental">Rental Info</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-fullName">Full Name</Label>
                        <Input
                          id="edit-fullName"
                          name="fullName"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Phone</Label>
                        <Input
                          id="edit-phone"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-aadhaarNumber">
                          Aadhaar Number
                        </Label>
                        <Input
                          id="edit-aadhaarNumber"
                          name="aadhaarNumber"
                          placeholder="Enter Aadhaar number"
                          value={formData.aadhaarNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-occupation">Occupation</Label>
                        <Input
                          id="edit-occupation"
                          name="occupation"
                          placeholder="Enter occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-monthlyIncome">
                          Monthly Income
                        </Label>
                        <Input
                          id="edit-monthlyIncome"
                          name="monthlyIncome"
                          placeholder="Enter monthly income"
                          value={formData.monthlyIncome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-permanentAddress">
                        Permanent Address
                      </Label>
                      <Textarea
                        id="edit-permanentAddress"
                        name="permanentAddress"
                        placeholder="Enter permanent address"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="rental" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-propertyName">Property Name</Label>
                        <Select
                          value={formData.propertyName}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              propertyName: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sunrise Apartments">
                              Sunrise Apartments
                            </SelectItem>
                            <SelectItem value="Green Valley Residency">
                              Green Valley Residency
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-unit">Unit</Label>
                        <Input
                          id="edit-unit"
                          name="unit"
                          placeholder="e.g., A-101"
                          value={formData.unit}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-monthlyRent">Monthly Rent</Label>
                        <Input
                          id="edit-monthlyRent"
                          name="monthlyRent"
                          type="number"
                          placeholder="Enter monthly rent"
                          value={formData.monthlyRent}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-advance">Security Deposit</Label>
                        <Input
                          id="edit-advance"
                          name="advance"
                          type="number"
                          placeholder="Enter security deposit"
                          value={formData.advance}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-occupancyDate">Move-in Date</Label>
                        <Input
                          id="edit-occupancyDate"
                          name="occupancyDate"
                          type="date"
                          value={formData.occupancyDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">
                          Identity Proofs
                        </Label>
                        <p className="text-sm text-gray-600 mb-3">
                          Upload Aadhaar card, PAN card, passport, etc.
                        </p>
                        <FileUpload
                          accept="image/*,.pdf"
                          maxFiles={5}
                          maxSize={5}
                          uploadType="documents"
                          onFilesChange={setIdentityProofs}
                          initialFiles={identityProofs}
                        />
                      </div>
                      <div>
                        <Label className="text-base font-medium">
                          Agreement Documents
                        </Label>
                        <p className="text-sm text-gray-600 mb-3">
                          Upload rental agreements, NOC, etc.
                        </p>
                        <FileUpload
                          accept=".pdf,.doc,.docx"
                          maxFiles={3}
                          maxSize={10}
                          uploadType="documents"
                          onFilesChange={setAgreementDocs}
                          initialFiles={agreementDocs}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="emergency" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-emergencyContactName">
                          Emergency Contact Name
                        </Label>
                        <Input
                          id="edit-emergencyContactName"
                          name="emergencyContactName"
                          placeholder="Enter emergency contact name"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-emergencyContactPhone">
                          Emergency Contact Phone
                        </Label>
                        <Input
                          id="edit-emergencyContactPhone"
                          name="emergencyContactPhone"
                          placeholder="Enter emergency contact phone"
                          value={formData.emergencyContactPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-emergencyContactRelation">
                          Relationship
                        </Label>
                        <Select
                          value={formData.emergencyContactRelation}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              emergencyContactRelation: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Father">Father</SelectItem>
                            <SelectItem value="Mother">Mother</SelectItem>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                            <SelectItem value="Friend">Friend</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Tenant
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Tenants;
