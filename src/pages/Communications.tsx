import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import emailjs from "@emailjs/browser";
import {
  Plus,
  Users,
  Building,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Send,
  Edit,
  CheckCircle,
} from "lucide-react";

const Communications = () => {
  const [formData, setFormData] = useState({
    sendTo: "all-tenants",
    selectedProperty: "",
    selectedUnit: "",
    template: "",
    subject: "",
    message: "",
    sendVia: {
      email: true,
      sms: false,
      whatsapp: false,
    },
    scheduleForLater: false,
    scheduleDate: "",
  });

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Rent Reminder",
      type: "rent-reminder",
      subject: "Monthly Rent Payment Reminder",
      content:
        "Dear {tenant_name}, your rent of {amount} is due on {due_date}. Please pay at your earliest convenience.",
    },
    {
      id: 2,
      name: "Maintenance Notice",
      type: "maintenance",
      subject: "Scheduled Maintenance Notice",
      content:
        "Dear {tenant_name}, maintenance work is scheduled for {property_name} on {date}. Please plan accordingly.",
    },
    {
      id: 3,
      name: "Lease Renewal",
      type: "lease-renewal",
      subject: "Lease Renewal Notice",
      content:
        "Dear {tenant_name}, your lease for {unit} expires on {date}. Please contact us for renewal.",
    },
    {
      id: 4,
      name: "Welcome Message",
      type: "welcome",
      subject: "Welcome to {property_name}",
      content:
        "Welcome {tenant_name}! We're excited to have you at {property_name}. Please find attached important information.",
    },
  ]);

  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    subject: "",
    content: "",
  });

  const properties = [
    { id: 1, name: "Sunrise Apartments", units: ["A-101", "A-102", "A-103"] },
    {
      id: 2,
      name: "Green Valley Residency",
      units: ["B-201", "B-202", "B-203"],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.startsWith("sendVia.")) {
      const viaField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        sendVia: {
          ...prev.sendVia,
          [viaField]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: checked,
      }));
    }
  };

  const handleSendToChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      sendTo: value,
      selectedProperty: "",
      selectedUnit: "",
    }));
  };

  const handleTemplateSelect = (templateType: string) => {
    const template = templates.find((t) => t.type === templateType);
    if (template) {
      setFormData((prev) => ({
        ...prev,
        template: templateType,
        subject: template.subject,
        message: template.content,
      }));
    }
  };

  const sendEmail = async (emailData: any) => {
    try {
      // Initialize EmailJS (you'll need to replace with your keys)
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        emailData,
        "YOUR_PUBLIC_KEY",
      );
      return true;
    } catch (error) {
      console.log("Email failed:", error);
      return false;
    }
  };

  const sendSMS = async (phoneNumber: string, message: string) => {
    try {
      // Replace with your SMS API
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, message }),
      });
      return response.ok;
    } catch (error) {
      console.log("SMS failed:", error);
      return false;
    }
  };

  const sendWhatsApp = async (phoneNumber: string, message: string) => {
    try {
      // Replace with your WhatsApp API
      const response = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, message }),
      });
      return response.ok;
    } catch (error) {
      console.log("WhatsApp failed:", error);
      return false;
    }
  };

  const handleSendMessage = async () => {
    if (!formData.subject || !formData.message) {
      alert("Please fill in subject and message");
      return;
    }

    const recipients = getRecipients();
    const promises = [];

    for (const recipient of recipients) {
      if (formData.sendVia.email) {
        promises.push(
          sendEmail({
            to_email: recipient.email,
            to_name: recipient.name,
            subject: formData.subject,
            message: formData.message,
          }),
        );
      }

      if (formData.sendVia.sms) {
        promises.push(sendSMS(recipient.phone, formData.message));
      }

      if (formData.sendVia.whatsapp) {
        promises.push(sendWhatsApp(recipient.phone, formData.message));
      }
    }

    try {
      await Promise.all(promises);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);

      // Reset form
      setFormData({
        sendTo: "all-tenants",
        selectedProperty: "",
        selectedUnit: "",
        template: "",
        subject: "",
        message: "",
        sendVia: { email: true, sms: false, whatsapp: false },
        scheduleForLater: false,
        scheduleDate: "",
      });
    } catch (error) {
      alert("Failed to send some messages");
    }
  };

  const getRecipients = () => {
    // Mock recipient data - replace with actual data
    const allTenants = [
      { name: "Raj Kumar", email: "raj@example.com", phone: "+919876543210" },
      {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+919876543211",
      },
    ];

    if (formData.sendTo === "all-tenants") {
      return allTenants;
    } else if (
      formData.sendTo === "property-wise" &&
      formData.selectedProperty
    ) {
      return allTenants.filter((tenant) => {
        // Filter by property logic here
        return true;
      });
    } else if (formData.sendTo === "unit-wise" && formData.selectedUnit) {
      return allTenants.filter((tenant) => {
        // Filter by unit logic here
        return true;
      });
    }

    return [];
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.content) {
      alert("Please fill all template fields");
      return;
    }

    const template = {
      id: templates.length + 1,
      name: newTemplate.name,
      type:
        newTemplate.type || newTemplate.name.toLowerCase().replace(/\s+/g, "-"),
      subject: newTemplate.subject,
      content: newTemplate.content,
    };

    setTemplates((prev) => [...prev, template]);
    setNewTemplate({ name: "", type: "", subject: "", content: "" });
    setIsCreateTemplateOpen(false);
  };

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      type: template.type,
      subject: template.subject,
      content: template.content,
    });
    setIsCreateTemplateOpen(true);
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    setTemplates((prev) =>
      prev.map((t) =>
        t.id === editingTemplate.id
          ? {
              ...t,
              name: newTemplate.name,
              subject: newTemplate.subject,
              content: newTemplate.content,
            }
          : t,
      ),
    );

    setEditingTemplate(null);
    setNewTemplate({ name: "", type: "", subject: "", content: "" });
    setIsCreateTemplateOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/communications" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Communication Center"
          subtitle="Send notifications and manage communication templates"
          actions={
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          }
        />

        <main className="p-6">
          <Tabs defaultValue="send-message" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="send-message">Send Message</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="send-message" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send New Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Send To */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Send To</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="p-4 cursor-pointer hover:bg-gray-50 border-2 border-primary">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-medium text-primary">
                            All Tenants
                          </span>
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:bg-gray-50 border-2 border-gray-200">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Building className="w-6 h-6 text-gray-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            Property Wise
                          </span>
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:bg-gray-50 border-2 border-gray-200">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Home className="w-6 h-6 text-gray-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            Unit Wise
                          </span>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Template */}
                  <div className="space-y-2">
                    <Label htmlFor="template">Use Template (Optional)</Label>
                    <Select
                      value={formData.template}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, template: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent-reminder">
                          Rent Reminder
                        </SelectItem>
                        <SelectItem value="maintenance">
                          Maintenance Notice
                        </SelectItem>
                        <SelectItem value="lease-renewal">
                          Lease Renewal
                        </SelectItem>
                        <SelectItem value="welcome">Welcome Message</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Enter message subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message here..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Send Via */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Send Via</Label>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="email"
                          checked={formData.sendVia.email}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "sendVia.email",
                              checked as boolean,
                            )
                          }
                        />
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sms"
                          checked={formData.sendVia.sms}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "sendVia.sms",
                              checked as boolean,
                            )
                          }
                        />
                        <Label
                          htmlFor="sms"
                          className="flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          SMS
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="whatsapp"
                          checked={formData.sendVia.whatsapp}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "sendVia.whatsapp",
                              checked as boolean,
                            )
                          }
                        />
                        <Label
                          htmlFor="whatsapp"
                          className="flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          WhatsApp
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="schedule"
                        checked={formData.scheduleForLater}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "scheduleForLater",
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor="schedule"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Schedule for later
                      </Label>
                    </div>
                    {formData.scheduleForLater && (
                      <Input
                        type="datetime-local"
                        name="scheduleDate"
                        value={formData.scheduleDate}
                        onChange={handleInputChange}
                        className="max-w-xs"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Rent Reminder</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Standard template for monthly rent reminders with due date
                      and amount details.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Maintenance Notice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Template for notifying tenants about scheduled maintenance
                      work and timing.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lease Renewal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Template for lease renewal notifications with terms and
                      conditions updates.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Welcome Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Welcome template for new tenants with property guidelines
                      and contact information.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Payment Confirmation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Template for confirming rent payments and providing
                      receipt details.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-3">
                      Create New Template
                    </p>
                    <Button size="sm" variant="outline">
                      Add Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Communications;
