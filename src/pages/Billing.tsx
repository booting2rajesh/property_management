import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Bill
              </Button>
            </div>
          }
        />

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Bills
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Paid Bills
                    </p>
                    <p className="text-3xl font-bold text-green-700 mt-2">1</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Bills
                    </p>
                    <p className="text-3xl font-bold text-yellow-700 mt-2">1</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Overdue Bills
                    </p>
                    <p className="text-3xl font-bold text-red-700 mt-2">1</p>
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
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              RK
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              Raj Kumar
                            </p>
                            <p className="text-sm text-gray-500">
                              raj.kumar@email.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            Unit A-101
                          </p>
                          <p className="text-sm text-gray-500">
                            Sunrise Apartments
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">January 2024</p>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">₹25,500</p>
                          <p className="text-sm text-gray-500">
                            Rent: ₹25,000 | Electricity: ₹2,500
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          ✓ Paid
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">Jan 05, 2024</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              RK
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              Raj Kumar
                            </p>
                            <p className="text-sm text-gray-500">
                              raj.kumar@email.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            Unit A-101
                          </p>
                          <p className="text-sm text-gray-500">
                            Sunrise Apartments
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">February 2024</p>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">₹25,000</p>
                          <p className="text-sm text-gray-500">
                            Rent: ₹25,000 | Electricity: ₹2,500
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          ⏳ Pending
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">Feb 05, 2024</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              PS
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              Priya Sharma
                            </p>
                            <p className="text-sm text-gray-500">
                              priya.sharma@email.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            Unit B-201
                          </p>
                          <p className="text-sm text-gray-500">
                            Green Valley Residency
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">February 2024</p>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">₹25,200</p>
                          <p className="text-sm text-gray-500">
                            Rent: ₹22,000 | Electricity: ₹1,800
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                          ⚠ Overdue
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">Feb 05, 2024</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
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
