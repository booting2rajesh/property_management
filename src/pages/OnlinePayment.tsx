import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  QrCode,
  CreditCard,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  Smartphone,
  Building,
  ArrowLeft,
} from "lucide-react";

const OnlinePayment = () => {
  const [activeTab, setActiveTab] = useState("qr-payments");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Mock payment data
  const qrPayments = [
    {
      id: 1,
      tenant: "Raj Kumar",
      unit: "A-101",
      amount: 25000,
      billId: "BILL-2024-001",
      qrCode:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IndoaXRlIi8+IDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4Ij5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==",
      paymentUrl:
        "upi://pay?pa=property@paytm&pn=PropertyHub&am=25000&tn=Rent-A101-Jan2024",
      expiresAt: "2024-01-31T23:59:59Z",
      status: "active",
    },
    {
      id: 2,
      tenant: "Priya Sharma",
      unit: "A-102",
      amount: 28000,
      billId: "BILL-2024-002",
      qrCode:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IndoaXRlIi8+IDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4Ij5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==",
      paymentUrl:
        "upi://pay?pa=property@paytm&pn=PropertyHub&am=28000&tn=Rent-A102-Jan2024",
      expiresAt: "2024-01-31T23:59:59Z",
      status: "active",
    },
  ];

  const transactions = [
    {
      id: 1,
      transactionId: "TXN123456789",
      tenant: "Raj Kumar",
      unit: "A-101",
      amount: 25000,
      billId: "BILL-2024-001",
      paymentMethod: "UPI",
      status: "success",
      paidAt: "2024-01-15T10:30:00Z",
      receiptGenerated: true,
    },
    {
      id: 2,
      transactionId: "TXN123456790",
      tenant: "Amit Patel",
      unit: "B-201",
      amount: 24000,
      billId: "BILL-2024-003",
      paymentMethod: "Credit Card",
      status: "success",
      paidAt: "2024-01-14T15:45:00Z",
      receiptGenerated: true,
    },
    {
      id: 3,
      transactionId: "TXN123456791",
      tenant: "Priya Sharma",
      unit: "A-102",
      amount: 28000,
      billId: "BILL-2024-002",
      paymentMethod: "Net Banking",
      status: "failed",
      paidAt: "2024-01-13T09:20:00Z",
      receiptGenerated: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "active":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4" />;
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "active":
        return <QrCode className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateReceipt = (transaction: any) => {
    setSelectedReceipt(transaction);
    setIsReceiptModalOpen(true);
  };

  const downloadQR = (qrCode: string, tenant: string, unit: string) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `QR-${tenant}-${unit}.png`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/billing" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Online Payments"
          subtitle="Manage QR codes, payment links, and transaction receipts"
          actions={
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/billing")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Billing
            </Button>
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
                value="qr-payments"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                QR Payments
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qr-payments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qrPayments.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {payment.tenant}
                        </CardTitle>
                        <Badge className={getStatusColor(payment.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(payment.status)}
                            {payment.status.toUpperCase()}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <img
                          src={payment.qrCode}
                          alt="QR Code"
                          className="w-40 h-40 mx-auto border rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Unit:</span>
                          <span className="font-medium">{payment.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Amount:</span>
                          <span className="font-bold text-lg">
                            ₹{payment.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Bill ID:
                          </span>
                          <span className="font-medium">{payment.billId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Expires:
                          </span>
                          <span className="font-medium">
                            {formatDate(payment.expiresAt)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() =>
                            window.open(payment.paymentUrl, "_blank")
                          }
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          Pay with UPI
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              downloadQR(
                                payment.qrCode,
                                payment.tenant,
                                payment.unit,
                              )
                            }
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download QR
                          </Button>
                          <Button variant="outline" size="sm">
                            <QrCode className="w-4 h-4 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary text-white">
                              {transaction.tenant
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {transaction.tenant}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {transaction.unit} • {transaction.transactionId}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              ₹{transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {transaction.paymentMethod}
                            </p>
                          </div>
                          <Badge className={getStatusColor(transaction.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              {transaction.status.toUpperCase()}
                            </div>
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-gray-500">Bill ID</p>
                          <p className="font-medium">{transaction.billId}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Payment Date</p>
                          <p className="font-medium">
                            {formatDate(transaction.paidAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Transaction ID</p>
                          <p className="font-medium">
                            {transaction.transactionId}
                          </p>
                        </div>
                        <div className="text-right">
                          {transaction.receiptGenerated && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generateReceipt(transaction)}
                            >
                              <Receipt className="w-4 h-4 mr-1" />
                              View Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Receipt Modal */}
          <Dialog
            open={isReceiptModalOpen}
            onOpenChange={setIsReceiptModalOpen}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Payment Receipt</DialogTitle>
              </DialogHeader>
              {selectedReceipt && (
                <div className="space-y-6 p-6 bg-white">
                  <div className="text-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-primary">
                      PropertyHub
                    </h2>
                    <p className="text-gray-600">Payment Receipt</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Receipt #</p>
                        <p className="font-medium">
                          {selectedReceipt.transactionId}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {formatDate(selectedReceipt.paidAt)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Tenant</p>
                        <p className="font-medium">{selectedReceipt.tenant}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Unit</p>
                        <p className="font-medium">{selectedReceipt.unit}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Bill ID</p>
                        <p className="font-medium">{selectedReceipt.billId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">
                          {selectedReceipt.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount Paid:</span>
                        <span>₹{selectedReceipt.amount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500 border-t pt-4">
                      <p>Thank you for your payment!</p>
                      <p>For any queries, contact: support@propertyhub.com</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsReceiptModalOpen(false)}
                    >
                      Close
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default OnlinePayment;
