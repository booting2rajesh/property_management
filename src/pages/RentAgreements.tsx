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
  FileText,
  Download,
  Send,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Signature,
} from "lucide-react";

const RentAgreements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateAgreementOpen, setIsCreateAgreementOpen] = useState(false);
  const [agreementFormData, setAgreementFormData] = useState({
    tenant: "",
    unit: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    deposit: "",
    agreementType: "",
    specialTerms: "",
  });

  const [agreements, setAgreements] = useState([
    {
      id: 1,
      agreementNumber: "AGR-2024-001",
      tenant: {
        name: "Raj Kumar",
        email: "raj.kumar@email.com",
        avatar: "",
      },
      unit: "A-101",
      property: "Sunrise Apartments",
      startDate: "2023-06-15",
      endDate: "2024-06-14",
      monthlyRent: 25000,
      deposit: 50000,
      status: "active",
      signedDate: "2023-06-10",
      agreementType: "11-month",
      createdDate: "2023-06-01",
    },
    {
      id: 2,
      agreementNumber: "AGR-2024-002",
      tenant: {
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        avatar: "",
      },
      unit: "A-102",
      property: "Sunrise Apartments",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      monthlyRent: 28000,
      deposit: 56000,
      status: "pending_signature",
      signedDate: null,
      agreementType: "11-month",
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      agreementNumber: "AGR-2023-015",
      tenant: {
        name: "Amit Sharma",
        email: "amit.sharma@email.com",
        avatar: "",
      },
      unit: "A-101",
      property: "Sunrise Apartments",
      startDate: "2022-01-10",
      endDate: "2023-01-09",
      monthlyRent: 23000,
      deposit: 46000,
      status: "expired",
      signedDate: "2022-01-05",
      agreementType: "11-month",
      createdDate: "2021-12-20",
    },
  ]);

  const filteredAgreements = agreements.filter((agreement) => {
    const matchesSearch =
      agreement.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.agreementNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      agreement.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.property.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || agreement.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateAgreement = (e: React.FormEvent) => {
    e.preventDefault();

    const newAgreement = {
      id: agreements.length + 1,
      agreementNumber: `AGR-2024-${String(agreements.length + 1).padStart(3, "0")}`,
      tenant: {
        name: agreementFormData.tenant,
        email: "tenant@email.com",
        avatar: "",
      },
      unit: agreementFormData.unit,
      property: "Sunrise Apartments",
      startDate: agreementFormData.startDate,
      endDate: agreementFormData.endDate,
      monthlyRent: parseInt(agreementFormData.monthlyRent),
      deposit: parseInt(agreementFormData.deposit),
      status: "draft",
      signedDate: null,
      agreementType: agreementFormData.agreementType,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setAgreements((prev) => [newAgreement, ...prev]);
    setIsCreateAgreementOpen(false);
    setAgreementFormData({
      tenant: "",
      unit: "",
      startDate: "",
      endDate: "",
      monthlyRent: "",
      deposit: "",
      agreementType: "",
      specialTerms: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending_signature":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "draft":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "expired":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "pending_signature":
        return <Clock className="w-4 h-4" />;
      case "draft":
        return <Edit className="w-4 h-4" />;
      case "expired":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sendForSignature = async (agreementId: number) => {
    // Here you would integrate with Zoho Sign API
    setAgreements((prev) =>
      prev.map((agreement) =>
        agreement.id === agreementId
          ? { ...agreement, status: "pending_signature" }
          : agreement,
      ),
    );

    alert("Agreement sent for signature via Zoho Sign!");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/rent-agreements" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Rent Agreements"
          subtitle="Create and manage digital rent agreements with e-signature"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search agreements..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending_signature">Pending</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Dialog
                open={isCreateAgreementOpen}
                onOpenChange={setIsCreateAgreementOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Agreement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Rent Agreement</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateAgreement} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tenant">Tenant</Label>
                        <Select
                          value={agreementFormData.tenant}
                          onValueChange={(value) =>
                            setAgreementFormData((prev) => ({
                              ...prev,
                              tenant: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Tenant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Raj Kumar">Raj Kumar</SelectItem>
                            <SelectItem value="Priya Sharma">
                              Priya Sharma
                            </SelectItem>
                            <SelectItem value="Amit Patel">
                              Amit Patel
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={agreementFormData.unit}
                          onValueChange={(value) =>
                            setAgreementFormData((prev) => ({
                              ...prev,
                              unit: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A-101">A-101</SelectItem>
                            <SelectItem value="A-102">A-102</SelectItem>
                            <SelectItem value="B-201">B-201</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={agreementFormData.startDate}
                          onChange={(e) =>
                            setAgreementFormData((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={agreementFormData.endDate}
                          onChange={(e) =>
                            setAgreementFormData((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                        <Input
                          id="monthlyRent"
                          placeholder="Enter monthly rent"
                          value={agreementFormData.monthlyRent}
                          onChange={(e) =>
                            setAgreementFormData((prev) => ({
                              ...prev,
                              monthlyRent: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deposit">Security Deposit (₹)</Label>
                        <Input
                          id="deposit"
                          placeholder="Enter security deposit"
                          value={agreementFormData.deposit}
                          onChange={(e) =>
                            setAgreementFormData((prev) => ({
                              ...prev,
                              deposit: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agreementType">Agreement Type</Label>
                      <Select
                        value={agreementFormData.agreementType}
                        onValueChange={(value) =>
                          setAgreementFormData((prev) => ({
                            ...prev,
                            agreementType: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select agreement type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="11-month">
                            11 Month Agreement
                          </SelectItem>
                          <SelectItem value="yearly">
                            Yearly Agreement
                          </SelectItem>
                          <SelectItem value="monthly">
                            Monthly Agreement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialTerms">
                        Special Terms & Conditions
                      </Label>
                      <Textarea
                        id="specialTerms"
                        placeholder="Enter any special terms, conditions, or clauses..."
                        value={agreementFormData.specialTerms}
                        onChange={(e) =>
                          setAgreementFormData((prev) => ({
                            ...prev,
                            specialTerms: e.target.value,
                          }))
                        }
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsCreateAgreementOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Create Agreement
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredAgreements.map((agreement) => (
              <Card key={agreement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={agreement.tenant.avatar}
                          alt={agreement.tenant.name}
                        />
                        <AvatarFallback className="bg-primary text-white">
                          {agreement.tenant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {agreement.agreementNumber}
                          </h3>
                          <Badge className={getStatusColor(agreement.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(agreement.status)}
                              {agreement.status.replace("_", " ").toUpperCase()}
                            </div>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Tenant</p>
                            <p className="font-medium">
                              {agreement.tenant.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Unit</p>
                            <p className="font-medium">
                              {agreement.unit} - {agreement.property}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Monthly Rent
                            </p>
                            <p className="font-medium">
                              ₹{agreement.monthlyRent.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Security Deposit
                            </p>
                            <p className="font-medium">
                              ₹{agreement.deposit.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Agreement Period</p>
                            <p className="font-medium">
                              {formatDate(agreement.startDate)} -{" "}
                              {formatDate(agreement.endDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Type</p>
                            <p className="font-medium">
                              {agreement.agreementType}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Created</p>
                            <p className="font-medium">
                              {formatDate(agreement.createdDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Signed</p>
                            <p className="font-medium">
                              {agreement.signedDate
                                ? formatDate(agreement.signedDate)
                                : "Not signed"}
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
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      {agreement.status === "draft" && (
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => sendForSignature(agreement.id)}
                        >
                          <Signature className="w-4 h-4 mr-1" />
                          Send for Signature
                        </Button>
                      )}
                      {agreement.status === "pending_signature" && (
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4 mr-1" />
                          Resend
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAgreements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No agreements found for the selected filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RentAgreements;
