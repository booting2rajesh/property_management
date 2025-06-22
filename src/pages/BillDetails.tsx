import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ArrowLeft, Download, Mail, Edit, Trash2 } from "lucide-react";

const BillDetails = () => {
  // This would typically come from route params or props
  const billData = {
    id: 1,
    billNumber: "BILL-2024-001",
    tenant: {
      name: "Raj Kumar",
      email: "raj.kumar@email.com",
      phone: "+91 9876543210",
    },
    unit: {
      name: "Unit A-101",
      property: "Sunrise Apartments",
      address: "123 Main Street, Koramangala, Bangalore",
    },
    period: "January 2024",
    generatedDate: "Jan 01, 2024",
    dueDate: "Jan 05, 2024",
    status: "paid",
    charges: {
      rent: 25000,
      electricity: 2500,
      maintenance: 500,
      miscellaneous: 0,
    },
    total: 28000,
    paidDate: "Jan 03, 2024",
    paymentMethod: "Bank Transfer",
  };

  const getTotalAmount = () => {
    return Object.values(billData.charges).reduce(
      (sum, charge) => sum + charge,
      0,
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/billing" />

      <div className="flex-1 overflow-auto">
        <Header
          title={`Bill #${billData.billNumber}`}
          subtitle={`${billData.period} - ${billData.tenant.name}`}
          actions={
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/billing")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Billing
              </Button>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Reminder
              </Button>
            </div>
          }
        />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Bill Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Bill Details</CardTitle>
                    <p className="text-gray-600 mt-1">
                      Generated on {billData.generatedDate}
                    </p>
                  </div>
                  <Badge
                    className={`text-lg px-4 py-2 ${
                      billData.status === "paid"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : billData.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {billData.status === "paid"
                      ? "✓ Paid"
                      : billData.status === "pending"
                        ? "⏳ Pending"
                        : "⚠ Overdue"}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Tenant Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{billData.tenant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{billData.tenant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{billData.tenant.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Property Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Unit</p>
                    <p className="font-medium">{billData.unit.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property</p>
                    <p className="font-medium">{billData.unit.property}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{billData.unit.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bill Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Bill Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Billing Period</span>
                    <span className="font-medium">{billData.period}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-medium">{billData.dueDate}</span>
                  </div>
                  {billData.status === "paid" && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Paid Date</span>
                        <span className="font-medium text-green-600">
                          {billData.paidDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium">
                          {billData.paymentMethod}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Charges Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Charges Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span>Monthly Rent</span>
                    <span className="font-medium">
                      ₹{billData.charges.rent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span>Electricity Charges</span>
                    <span className="font-medium">
                      ₹{billData.charges.electricity.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span>Maintenance Charges</span>
                    <span className="font-medium">
                      ₹{billData.charges.maintenance.toLocaleString()}
                    </span>
                  </div>
                  {billData.charges.miscellaneous > 0 && (
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Miscellaneous Charges</span>
                      <span className="font-medium">
                        ₹{billData.charges.miscellaneous.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-4 border-t-2 border-gray-200 text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{billData.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BillDetails;
