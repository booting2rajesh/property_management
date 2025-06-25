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
  const [isViewAgreementOpen, setIsViewAgreementOpen] = useState(false);
  const [isEditAgreementOpen, setIsEditAgreementOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [editingAgreement, setEditingAgreement] = useState(null);

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

  const [agreementTemplates, setAgreementTemplates] = useState([
    {
      id: 1,
      name: "Standard Chennai Rental Agreement",
      type: "11-month",
      content: `RENTAL AGREEMENT
This Rental Agreement is made on this <Date of agreement signing in this format 26th day of Sep 2024> at Chennai.
<Lessor Name> <relation> of <relative name>. , aged about 54 years residing at <Lessor Address> herein after called the " LESSOR" which term shall mean and include whatever the context so admits and permits his/her legal heirs, legal representative, executors, administrators and assigns of ONE PART
                                    AND
<Lessee Name> D/O of <Father Name>, residing at <Lessee Permanent Address> herein after called the "LESSEE" which term shall mean and include whatever the heirs, legal representative, executors, administrators and assigns of OTHER PART.

<div class="lessor-lessee-parallel">
<div>LESSOR</div>
<div>LESSEE</div>
</div>

WHEREAS the LESSOR herein is the sole and absolute owner of all that piece and parcel of the residential flat bearing No. <Rental Unit address> situated in Thiruneermalai Village, Alandur Taluk, Kancheepuram District, within the Registration District of Chennai south and sub-Registration District of Pammal.
AND WHEREAS THE LESSEE has approached the LESSOR to demise the SCHEDULE mentioned house on monthly rental basis for Residential purpose for a period of 11 months on the terms and conditions hereinafter mentioned and the LESSOR has also hereby agreed to demise the SCHEDULE mentioned house to the LESSEE on a Monthly rental on the following terms and conditions.
NOW THIS LEASE AGREEMENT WITNESSTH AS FOLLOWS:
1. The Lease shall be initially for a period of 11 months, commencing from <Agreement signing date in this format - 26.09.2024> upon completion of 11 months
2. The LESSEE is strictly for residential purposes to accommodate the occupier of the LESSEE. The Lease is according to the English calendar Month.
3.The LESSEE has agreed to pay the Monthly Amenity Charges on or before 5th day of every Succeeding month for the demised Property more fully described in the SCHEDULE hereunder in the following manner: -
i.) Rs.<Rent in this format- 13,000>/-per month (Rupees -<Amount in this format Thirteen Thousand Five Hundred only>)
ii.) Rs.<Rent in this format-40,000>/- (Rupees -<Amount in this format Forty Thousand only>) as one time interest free deposit to be paid by the LESSEE at the time of taking possession of the Premises and refunded by the LESSOR at the time of receiving vacant possession of the premises.
iii.) In case of LESSEE opting for Car Parking, extra charge of Rs,1000 for hatchback or sedan and Rs.1500 for SUV needs to be paid along with the rent
4. The LESSEE shall pay Electricity Charges regularly as applicable to his/her Portion of the premises without default to the EB.

<div style="display: flex; justify-content: space-between; margin: 20px 0; page-break-after: always;">
<div>LESSOR</div>
<div>LESSEE</div>
</div>

5.That the LESSOR shall have full control over the supervision and management in respect of the said flat and the LESSEE shall not, in any way, interfere with the LESSOR'S right of maintenance nor the LESSOR interfere with the LESSEE'S rights of quite & peaceful undisturbed tenancy & occupation.
6. The LESSEE should keep the demised premises in good and tenantable condition as, may prudent person would do with his/her property.
7. The LESSEE shall not use the demised premises for any purpose other than for which it was let out not shall sub-let or sub-lease the portion let out to him to any third party.
8. The LESSEE shall not commit default on the payment of rents and if the LESSEE fails to pay the monthly rent within the stipulated time for two consecutive months, the lease shall be cancelled, and the LESSEE shall vacant the FLAT forthwith.
9. The LESSEE covenants to keep the demised premises in good and tenantable condition during the stay and not make any permanent additions or alteration to the same.
10. That In case of damage caused by the LESSEE to the SAID PREMISES during the period of use, LESSEE shall be held responsible for compensation and other charges and such charges may be adjusted from the security deposit amount when the same is refunded upon completion of the licensing agreement tenure (vacation of house).
11. The LESSEE shall handle the fittings and fixtures in the Demised premises and maintain the same property.
12. The LESSOR shall not pay all taxes and levies due to Municipal Corporation.
13. That the LESSEE shall not create any untoward disturbance or nuisance and shall not allow any anti-social person in the SAID PREMISES.
14. That the LESSEE shall not keep any illegal inflammable article or explosive that endangers life property.

<div style="display: flex; justify-content: space-between; margin: 20px 0; page-break-after: always;">
<div>LESSOR</div>
<div>LESSEE</div>
</div>

15. Either the LESSOR or the LESSEE may terminate the Lease agreement by giving written notice 2 (Two) months in advance. However, the LESSEE is free to terminate the licensing agreement with a shorter notice period in which case the monthly rental for the premises & fixtures only for the period of two months shall be paid as compensation to the LESSOR.
16. That no interest shall be payable on the deposit amount which would be refunded by the LESSOR after deducting the arrears in rent and damages if any, at the time of LESSEE vacating and handling over the vacant and peaceful possession of the demise premises to LESSOR.
17. That the Said lease shall stand automatically terminated in case of LESSEE fails to comply with any of the stipulated terms and conditions of this agreement.
SCHEDULE
ALL THAT PIECE AND PARCEL OF FLAT NO.<Lessee Unit Address> situated in Thiruneermalai Village, Alandur Taluk, Kancheepuram District, within the Registration District of Chennai south and sub-Registration District of Pammal
IN WITNESS WHEREOF this agreement upon above mentioned terms and conditions both the LESSOR and LESSSEE are subscribing their respective hands and seals to the day, month and year first above written. SIGNED SEALED AND DELIVERED IN PRESENCE OF WITNESSSES: -

1. ____________________                                    2. ____________________
   SIGNATURE OF THE LESSOR                                       SIGNATURE OF THE LESSEE

   Date: ______________                                          Date: ______________
   Place: _____________                                          Place: _____________`,
      createdDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Simple Monthly Agreement",
      type: "monthly",
      content: `MONTHLY RENTAL AGREEMENT

Date: <Date of agreement signing in this format 26th day of Sep 2024>

LESSOR: <Lessor Name>
Address: <Lessor Address>

LESSEE: <Lessee Name>
Address: <Lessee Permanent Address>

PROPERTY: <Rental Unit address>
MONTHLY RENT: Rs.<Rent in this format- 13,000>/-
SECURITY DEPOSIT: Rs.<Rent in this format-40,000>/-

This agreement is renewable monthly with mutual consent.

SIGNATURES:
LESSOR: ________________    LESSEE: ________________`,
      createdDate: "2024-01-01",
    },
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    content: "",
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

  const viewAgreement = (agreement: any) => {
    setSelectedAgreement(agreement);
    setIsViewAgreementOpen(true);
  };

  const editAgreement = (agreement: any) => {
    setEditingAgreement(agreement);
    setAgreementFormData({
      tenant: agreement.tenant.name,
      unit: agreement.unit,
      startDate: agreement.startDate,
      endDate: agreement.endDate,
      monthlyRent: agreement.monthlyRent.toString(),
      deposit: agreement.deposit.toString(),
      agreementType: agreement.agreementType,
      specialTerms: "",
    });
    setIsEditAgreementOpen(true);
  };

  // Helper function to convert numbers to words
  const numberToWords = (num: number): string => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Lakh", "Crore"];

    if (num === 0) return "Zero";

    const convertBelow100 = (n: number): string => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    };

    const convertBelow1000 = (n: number): string => {
      let result = "";
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + " Hundred";
        n %= 100;
        if (n > 0) result += " ";
      }
      if (n > 0) result += convertBelow100(n);
      return result;
    };

    let result = "";
    let place = 0;

    while (num > 0) {
      let chunk = 0;
      if (place === 0) chunk = num % 1000;
      else if (place === 1) chunk = num % 100;
      else chunk = num % 100;

      if (chunk > 0) {
        let chunkText = "";
        if (place === 0) chunkText = convertBelow1000(chunk);
        else chunkText = convertBelow100(chunk);

        result =
          chunkText +
          (thousands[place] ? " " + thousands[place] : "") +
          (result ? " " + result : "");
      }

      if (place === 0) num = Math.floor(num / 1000);
      else num = Math.floor(num / 100);
      place++;
    }

    return result + " only";
  };

  // Helper function to format date in different formats
  const formatDateForAgreement = (
    dateString: string,
    format: string,
  ): string => {
    const date = new Date(dateString);

    if (format.includes("26th day of Sep 2024")) {
      const day = date.getDate();
      const suffix =
        day % 10 === 1 && day !== 11
          ? "st"
          : day % 10 === 2 && day !== 12
            ? "nd"
            : day % 10 === 3 && day !== 13
              ? "rd"
              : "th";
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${day}${suffix} day of ${months[date.getMonth()]} ${date.getFullYear()}`;
    } else if (format.includes("26.09.2024")) {
      return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
    }

    return formatDate(dateString);
  };

  // Mock data for lessor and lessee profiles
  const getLessorProfile = () => ({
    name: "PropertyHub Management Pvt Ltd",
    relation: "S/O",
    relativeName: "Raman Kumar",
    address: "No. 45, Anna Salai, Teynampet, Chennai - 600018, Tamil Nadu",
    age: 54,
  });

  const getLesseeProfile = (tenantName: string) => ({
    name: tenantName,
    fatherName: "Rajesh Kumar",
    permanentAddress:
      "No. 12, Gandhi Street, Adyar, Chennai - 600020, Tamil Nadu",
    relation: "D/O", // or S/O
  });

  const getUnitProfile = (unit: string) => ({
    address: `Flat No. ${unit}, Building A, Sunrise Apartments, No. 123, OMR Main Road, Thiruneermalai Village, Alandur Taluk, Kancheepuram District - 600047`,
    registrationDistrict: "Chennai South",
    subRegistrationDistrict: "Pammal",
  });

  const downloadAgreement = (agreement: any, format: "pdf" | "docx") => {
    // Generate agreement content from template
    const template = agreementTemplates.find(
      (t) => t.type === agreement.agreementType,
    );
    if (!template) return;

    const lessorProfile = getLessorProfile();
    const lesseeProfile = getLesseeProfile(agreement.tenant.name);
    const unitProfile = getUnitProfile(agreement.unit);

    let content = template.content
      // Date fields
      .replace(
        /<Date of agreement signing in this format 26th day of Sep 2024>/g,
        formatDateForAgreement(agreement.createdDate, "26th day of Sep 2024"),
      )
      .replace(
        /<Agreement signing date in this format - 26\.09\.2024>/g,
        formatDateForAgreement(agreement.startDate, "26.09.2024"),
      )

      // Lessor fields
      .replace(/<Lessor Name>/g, lessorProfile.name)
      .replace(/<relation>/g, lessorProfile.relation)
      .replace(/<relative name>/g, lessorProfile.relativeName)
      .replace(/<Lessor Address>/g, lessorProfile.address)

      // Lessee fields
      .replace(/<Lessee Name>/g, lesseeProfile.name)
      .replace(/<Father Name>/g, lesseeProfile.fatherName)
      .replace(/<Lessee Permanent Address>/g, lesseeProfile.permanentAddress)

      // Unit fields
      .replace(/<Rental Unit address>/g, unitProfile.address)
      .replace(/<Lessee Unit Address>/g, unitProfile.address)

      // Financial fields
      .replace(
        /<Rent in this format- 13,000>/g,
        agreement.monthlyRent.toLocaleString(),
      )
      .replace(
        /<Rent in this format-40,000>/g,
        agreement.deposit.toLocaleString(),
      )
      .replace(
        /<Amount in this format Thirteen Thousand Five Hundred only>/g,
        numberToWords(agreement.monthlyRent),
      )
      .replace(
        /<Amount in this format Forty Thousand only>/g,
        numberToWords(agreement.deposit),
      );

    if (format === "pdf") {
      // In a real application, you'd use a PDF library like jsPDF
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${agreement.agreementNumber}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      alert(
        "Agreement downloaded as text file (PDF generation requires additional library)",
      );
    } else {
      // In a real application, you'd use a DOCX library like docx
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${agreement.agreementNumber}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      alert(
        "Agreement downloaded as text file (DOCX generation requires additional library)",
      );
    }
  };

  const handleUpdateAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgreement) return;

    setAgreements((prev) =>
      prev.map((agreement) =>
        agreement.id === editingAgreement.id
          ? {
              ...agreement,
              startDate: agreementFormData.startDate,
              endDate: agreementFormData.endDate,
              monthlyRent: parseInt(agreementFormData.monthlyRent),
              deposit: parseInt(agreementFormData.deposit),
              agreementType: agreementFormData.agreementType,
            }
          : agreement,
      ),
    );

    setIsEditAgreementOpen(false);
    setEditingAgreement(null);
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

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();

    const template = {
      id: agreementTemplates.length + 1,
      name: newTemplate.name,
      type: newTemplate.type,
      content: newTemplate.content,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setAgreementTemplates((prev) => [...prev, template]);
    setNewTemplate({ name: "", type: "", content: "" });
    setIsTemplateModalOpen(false);
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
                open={isTemplateModalOpen}
                onOpenChange={setIsTemplateModalOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Templates
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Agreement Templates</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="templates" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                      <TabsTrigger value="create">Create New</TabsTrigger>
                    </TabsList>

                    <TabsContent value="templates" className="space-y-4">
                      {agreementTemplates.map((template) => (
                        <Card key={template.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {template.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                Type: {template.type}
                              </p>
                              <p className="text-sm text-gray-600">
                                Created: {formatDate(template.createdDate)}
                              </p>
                              <div className="bg-gray-50 p-3 rounded text-sm max-h-32 overflow-y-auto">
                                {template.content.substring(0, 200)}...
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="create" className="space-y-4">
                      <form
                        onSubmit={handleCreateTemplate}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="templateName">Template Name</Label>
                          <Input
                            id="templateName"
                            placeholder="Enter template name"
                            value={newTemplate.name}
                            onChange={(e) =>
                              setNewTemplate((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="templateType">Template Type</Label>
                          <Select
                            value={newTemplate.type}
                            onValueChange={(value) =>
                              setNewTemplate((prev) => ({
                                ...prev,
                                type: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
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
                          <Label htmlFor="templateContent">
                            Template Content
                          </Label>
                          <Textarea
                            id="templateContent"
                            placeholder="Enter template content. Use merge fields like <Lessee Name>, <Rent in this format- 13,000>, etc."
                            rows={10}
                            value={newTemplate.content}
                            onChange={(e) =>
                              setNewTemplate((prev) => ({
                                ...prev,
                                content: e.target.value,
                              }))
                            }
                            required
                          />
                          <p className="text-xs text-gray-500">
                            Available merge fields: &lt;Lessor Name&gt;,
                            &lt;Lessee Name&gt;, &lt;Father Name&gt;, &lt;Rental
                            Unit address&gt;, &lt;Rent in this format-
                            13,000&gt;, &lt;Amount in this format Thirteen
                            Thousand only&gt;, &lt;Date of agreement signing in
                            this format 26th day of Sep 2024&gt;, &lt;Agreement
                            signing date in this format - 26.09.2024&gt;
                          </p>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          Create Template
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>

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

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewAgreement(agreement)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadAgreement(agreement, "pdf")}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadAgreement(agreement, "docx")}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        DOCX
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editAgreement(agreement)}
                      >
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

          {/* View Agreement Modal */}
          <Dialog
            open={isViewAgreementOpen}
            onOpenChange={setIsViewAgreementOpen}
          >
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  View Agreement - {selectedAgreement?.agreementNumber}
                </DialogTitle>
              </DialogHeader>
              {selectedAgreement && (
                <div className="space-y-6">
                  <div className="bg-white p-6 border rounded-lg">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-primary">
                        RENTAL AGREEMENT
                      </h2>
                      <p className="text-gray-600">
                        Agreement Number: {selectedAgreement.agreementNumber}
                      </p>
                    </div>

                    <div className="space-y-4 text-sm whitespace-pre-wrap">
                      {(() => {
                        const template = agreementTemplates.find(
                          (t) => t.type === selectedAgreement.agreementType,
                        );
                        if (!template) return <p>Template not found</p>;

                        const lessorProfile = getLessorProfile();
                        const lesseeProfile = getLesseeProfile(
                          selectedAgreement.tenant.name,
                        );
                        const unitProfile = getUnitProfile(
                          selectedAgreement.unit,
                        );

                        const processedContent = template.content
                          .replace(
                            /<Date of agreement signing in this format 26th day of Sep 2024>/g,
                            formatDateForAgreement(
                              selectedAgreement.createdDate,
                              "26th day of Sep 2024",
                            ),
                          )
                          .replace(
                            /<Agreement signing date in this format - 26\.09\.2024>/g,
                            formatDateForAgreement(
                              selectedAgreement.startDate,
                              "26.09.2024",
                            ),
                          )
                          .replace(/<Lessor Name>/g, lessorProfile.name)
                          .replace(/<relation>/g, lessorProfile.relation)
                          .replace(
                            /<relative name>/g,
                            lessorProfile.relativeName,
                          )
                          .replace(/<Lessor Address>/g, lessorProfile.address)
                          .replace(/<Lessee Name>/g, lesseeProfile.name)
                          .replace(/<Father Name>/g, lesseeProfile.fatherName)
                          .replace(
                            /<Lessee Permanent Address>/g,
                            lesseeProfile.permanentAddress,
                          )
                          .replace(
                            /<Rental Unit address>/g,
                            unitProfile.address,
                          )
                          .replace(
                            /<Lessee Unit Address>/g,
                            unitProfile.address,
                          )
                          .replace(
                            /<Rent in this format- 13,000>/g,
                            selectedAgreement.monthlyRent.toLocaleString(),
                          )
                          .replace(
                            /<Rent in this format-40,000>/g,
                            selectedAgreement.deposit.toLocaleString(),
                          )
                          .replace(
                            /<Amount in this format Thirteen Thousand Five Hundred only>/g,
                            numberToWords(selectedAgreement.monthlyRent),
                          )
                          .replace(
                            /<Amount in this format Forty Thousand only>/g,
                            numberToWords(selectedAgreement.deposit),
                          );

                        return (
                          <div className="font-mono text-sm">
                            {processedContent}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsViewAgreementOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() =>
                        downloadAgreement(selectedAgreement, "pdf")
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Agreement Modal */}
          <Dialog
            open={isEditAgreementOpen}
            onOpenChange={setIsEditAgreementOpen}
          >
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Edit Agreement - {editingAgreement?.agreementNumber}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateAgreement} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editStartDate">Start Date</Label>
                    <Input
                      id="editStartDate"
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
                    <Label htmlFor="editEndDate">End Date</Label>
                    <Input
                      id="editEndDate"
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
                    <Label htmlFor="editMonthlyRent">Monthly Rent (₹)</Label>
                    <Input
                      id="editMonthlyRent"
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
                    <Label htmlFor="editDeposit">Security Deposit (₹)</Label>
                    <Input
                      id="editDeposit"
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
                  <Label htmlFor="editAgreementType">Agreement Type</Label>
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
                      <SelectItem value="yearly">Yearly Agreement</SelectItem>
                      <SelectItem value="monthly">Monthly Agreement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditAgreementOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Update Agreement
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default RentAgreements;
