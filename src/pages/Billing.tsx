import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Filter,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  Mail,
  MoreHorizontal,
} from "lucide-react";

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [isCreateBillOpen, setIsCreateBillOpen] = useState(false);
  const [billFormData, setBillFormData] = useState({
    tenant: "",
    month: "",
    year: "",
    rent: "",
    electricity: "",
    maintenance: "",
    miscellaneous: "",
    dueDate: "",
    sendVia: {
      email: false,
      sms: false,
      whatsapp: false,
    },
  });

  const [bills, setBills] = useState([
    {
      id: 1,
      tenant: { name: "Raj Kumar", email: "raj.kumar@email.com", avatar: "" },
      unit: { name: "Unit A-101", property: "Sunrise Apartments" },
      period: "January 2024",
      amount: 25500,
      rent: 25000,
      electricity: 2500,
      status: "paid",
      dueDate: "Jan 05, 2024",
    },
    {
      id: 2,
      tenant: { name: "Raj Kumar", email: "raj.kumar@email.com", avatar: "" },
      unit: { name: "Unit A-101", property: "Sunrise Apartments" },
      period: "February 2024",
      amount: 25000,
      rent: 25000,
      electricity: 2500,
      status: "pending",
      dueDate: "Feb 05, 2024",
    },
    {
      id: 3,
      tenant: {
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        avatar: "",
      },
      unit: { name: "Unit B-201", property: "Green Valley Residency" },
      period: "February 2024",
      amount: 25200,
      rent: 22000,
      electricity: 1800,
      status: "overdue",
      dueDate: "Feb 05, 2024",
    },
  ]);

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.unit.property.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || bill.status === statusFilter;
    const matchesMonth =
      monthFilter === "all" || bill.period.includes(monthFilter);

    return matchesSearch && matchesStatus && matchesMonth;
  });

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();

    const newBill = {
      id: bills.length + 1,
      tenant: {
        name: billFormData.tenant,
        email: "tenant@email.com",
        avatar: "",
      },
      unit: { name: "Unit A-103", property: "Sunrise Apartments" },
      period: `${billFormData.month} ${billFormData.year}`,
      amount:
        parseInt(billFormData.rent) +
        parseInt(billFormData.electricity || "0") +
        parseInt(billFormData.maintenance || "0") +
        parseInt(billFormData.miscellaneous || "0"),
      rent: parseInt(billFormData.rent),
      electricity: parseInt(billFormData.electricity || "0"),
      status: "pending",
      dueDate: new Date(billFormData.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setBills((prev) => [...prev, newBill]);
    setIsCreateBillOpen(false);
    setBillFormData({
      tenant: "",
      month: "",
      year: "",
      rent: "",
      electricity: "",
      maintenance: "",
      miscellaneous: "",
      dueDate: "",
      sendVia: { email: false, sms: false, whatsapp: false },
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/billing" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Billing System"
          subtitle="Generate and manage monthly bills"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by tenant name or unit..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                </SelectContent>
              </Select>
              <Dialog
                open={isCreateBillOpen}
                onOpenChange={setIsCreateBillOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Bill
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Bill</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateBill} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tenant">Tenant</Label>
                        <Select
                          value={billFormData.tenant}
                          onValueChange={(value) =>
                            setBillFormData((prev) => ({
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
                        <Label htmlFor="month">Month</Label>
                        <Select
                          value={billFormData.month}
                          onValueChange={(value) =>
                            setBillFormData((prev) => ({
                              ...prev,
                              month: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="January">January</SelectItem>
                            <SelectItem value="February">February</SelectItem>
                            <SelectItem value="March">March</SelectItem>
                            <SelectItem value="April">April</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select
                          value={billFormData.year}
                          onValueChange={(value) =>
                            setBillFormData((prev) => ({
                              ...prev,
                              year: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rent">Rent (₹)</Label>
                        <Input
                          id="rent"
                          placeholder="Enter rent amount"
                          value={billFormData.rent}
                          onChange={(e) =>
                            setBillFormData((prev) => ({
                              ...prev,
                              rent: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="electricity">Electricity (₹)</Label>
                        <Input
                          id="electricity"
                          placeholder="Enter electricity charges"
                          value={billFormData.electricity}
                          onChange={(e) =>
                            setBillFormData((prev) => ({
                              ...prev,
                              electricity: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maintenance">Maintenance (₹)</Label>
                        <Input
                          id="maintenance"
                          placeholder="Enter maintenance charges"
                          value={billFormData.maintenance}
                          onChange={(e) =>
                            setBillFormData((prev) => ({
                              ...prev,
                              maintenance: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="miscellaneous">Miscellaneous (₹)</Label>
                        <Input
                          id="miscellaneous"
                          placeholder="Enter other charges"
                          value={billFormData.miscellaneous}
                          onChange={(e) =>
                            setBillFormData((prev) => ({
                              ...prev,
                              miscellaneous: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={billFormData.dueDate}
                        onChange={(e) =>
                          setBillFormData((prev) => ({
                            ...prev,
                            dueDate: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Send Bill Via</Label>
                      <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="email"
                            checked={billFormData.sendVia.email}
                            onCheckedChange={(checked) =>
                              setBillFormData((prev) => ({
                                ...prev,
                                sendVia: {
                                  ...prev.sendVia,
                                  email: checked as boolean,
                                },
                              }))
                            }
                          />
                          <Label htmlFor="email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sms"
                            checked={billFormData.sendVia.sms}
                            onCheckedChange={(checked) =>
                              setBillFormData((prev) => ({
                                ...prev,
                                sendVia: {
                                  ...prev.sendVia,
                                  sms: checked as boolean,
                                },
                              }))
                            }
                          />
                          <Label htmlFor="sms">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="whatsapp"
                            checked={billFormData.sendVia.whatsapp}
                            onCheckedChange={(checked) =>
                              setBillFormData((prev) => ({
                                ...prev,
                                sendVia: {
                                  ...prev.sendVia,
                                  whatsapp: checked as boolean,
                                },
                              }))
                            }
                          />
                          <Label htmlFor="whatsapp">WhatsApp</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsCreateBillOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Create & Send Bill
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setStatusFilter("all")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Bills
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {bills.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setStatusFilter("paid")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Paid Bills
                    </p>
                    <p className="text-3xl font-bold text-green-700 mt-2">
                      {bills.filter((b) => b.status === "paid").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setStatusFilter("pending")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Bills
                    </p>
                    <p className="text-3xl font-bold text-yellow-700 mt-2">
                      {bills.filter((b) => b.status === "pending").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setStatusFilter("overdue")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Overdue Bills
                    </p>
                    <p className="text-3xl font-bold text-red-700 mt-2">
                      {bills.filter((b) => b.status === "overdue").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bills Table */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        TENANT
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        UNIT
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        PERIOD
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        AMOUNT
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        STATUS
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        DUE DATE
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.map((bill) => (
                      <tr key={bill.id} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {bill.tenant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">
                                {bill.tenant.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {bill.tenant.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {bill.unit.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {bill.unit.property}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-900">{bill.period}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              ₹{bill.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Rent: ₹{bill.rent.toLocaleString()} | Electricity:
                              ₹{bill.electricity.toLocaleString()}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`${
                              bill.status === "paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : bill.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                            }`}
                          >
                            {bill.status === "paid"
                              ? "✓ Paid"
                              : bill.status === "pending"
                                ? "⏳ Pending"
                                : "⚠ Overdue"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-900">{bill.dueDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" title="View Bill">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Download PDF"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Send Reminder"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="More Options"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Billing;
