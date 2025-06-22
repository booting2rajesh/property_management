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
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    subject: "",
    content: "",
  });

  const [drafts, setDrafts] = useState([]);

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

  const handleSaveAsDraft = () => {
    if (!formData.subject && !formData.message) {
      alert("Please add some content to save as draft");
      return;
    }

    const draft = {
      id: Date.now(),
      sendTo: formData.sendTo,
      selectedProperty: formData.selectedProperty,
      selectedUnit: formData.selectedUnit,
      subject: formData.subject,
      message: formData.message,
      savedAt: new Date().toISOString(),
    };

    setDrafts((prev) => [...prev, draft]);
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/communications" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Communication Center"
          subtitle="Send notifications and manage communication templates"
          actions={
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsCreateTemplateOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          }
        />

        <main className="p-6">
          <Tabs defaultValue="send-message" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="send-message"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Send Message
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Templates
              </TabsTrigger>
              <TabsTrigger
                value="drafts"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Drafts ({drafts.length})
              </TabsTrigger>
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
                      <Card
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-2 ${
                          formData.sendTo === "all-tenants"
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleSendToChange("all-tenants")}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              formData.sendTo === "all-tenants"
                                ? "bg-primary"
                                : "bg-gray-100"
                            }`}
                          >
                            <Users
                              className={`w-6 h-6 ${
                                formData.sendTo === "all-tenants"
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <span
                            className={`font-medium ${
                              formData.sendTo === "all-tenants"
                                ? "text-primary"
                                : "text-gray-700"
                            }`}
                          >
                            All Tenants
                          </span>
                        </div>
                      </Card>
                      <Card
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-2 ${
                          formData.sendTo === "property-wise"
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleSendToChange("property-wise")}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              formData.sendTo === "property-wise"
                                ? "bg-primary"
                                : "bg-gray-100"
                            }`}
                          >
                            <Building
                              className={`w-6 h-6 ${
                                formData.sendTo === "property-wise"
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <span
                            className={`font-medium ${
                              formData.sendTo === "property-wise"
                                ? "text-primary"
                                : "text-gray-700"
                            }`}
                          >
                            Property Wise
                          </span>
                        </div>
                      </Card>
                      <Card
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-2 ${
                          formData.sendTo === "unit-wise"
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleSendToChange("unit-wise")}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              formData.sendTo === "unit-wise"
                                ? "bg-primary"
                                : "bg-gray-100"
                            }`}
                          >
                            <Home
                              className={`w-6 h-6 ${
                                formData.sendTo === "unit-wise"
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <span
                            className={`font-medium ${
                              formData.sendTo === "unit-wise"
                                ? "text-primary"
                                : "text-gray-700"
                            }`}
                          >
                            Unit Wise
                          </span>
                        </div>
                      </Card>
                    </div>

                    {/* Property Selection */}
                    {formData.sendTo === "property-wise" && (
                      <div className="space-y-2">
                        <Label htmlFor="property">Select Property</Label>
                        <Select
                          value={formData.selectedProperty}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              selectedProperty: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose property" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties.map((property) => (
                              <SelectItem
                                key={property.id}
                                value={property.name}
                              >
                                {property.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Unit Selection */}
                    {formData.sendTo === "unit-wise" && (
                      <div className="space-y-2">
                        <Label htmlFor="unit">Select Unit</Label>
                        <Select
                          value={formData.selectedUnit}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              selectedUnit: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties.flatMap((property) =>
                              property.units.map((unit) => (
                                <SelectItem
                                  key={`${property.name}-${unit}`}
                                  value={unit}
                                >
                                  {unit} - {property.name}
                                </SelectItem>
                              )),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Template */}
                  <div className="space-y-2">
                    <Label htmlFor="template">Use Template (Optional)</Label>
                    <Select
                      value={formData.template}
                      onValueChange={handleTemplateSelect}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.type}>
                            {template.name}
                          </SelectItem>
                        ))}
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

                  {/* Success Message */}
                  {isSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Message sent successfully to all recipients!
                      </span>
                    </div>
                  )}

                  {/* Draft Success Message */}
                  {isDraftSaved && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        Message saved as draft successfully!
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleSaveAsDraft}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={handleSendMessage}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        {template.content.substring(0, 100)}...
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleTemplateSelect(template.type)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Dialog
                  open={isCreateTemplateOpen}
                  onOpenChange={setIsCreateTemplateOpen}
                >
                  <DialogTrigger asChild>
                    <Card className="border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400">
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
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingTemplate
                          ? "Edit Template"
                          : "Create New Template"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="templateType">Template Type</Label>
                        <Select
                          value={newTemplate.type}
                          onValueChange={(value) =>
                            setNewTemplate((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
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
                            <SelectItem value="welcome">
                              Welcome Message
                            </SelectItem>
                            <SelectItem value="payment-confirmation">
                              Payment Confirmation
                            </SelectItem>
                            <SelectItem value="general">
                              General Notice
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="templateSubject">Subject</Label>
                        <Input
                          id="templateSubject"
                          placeholder="Enter subject"
                          value={newTemplate.subject}
                          onChange={(e) =>
                            setNewTemplate((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="templateContent">Content</Label>
                        <Textarea
                          id="templateContent"
                          placeholder="Enter template content. Use {tenant_name}, {property_name}, {amount}, etc. for dynamic values"
                          rows={6}
                          value={newTemplate.content}
                          onChange={(e) =>
                            setNewTemplate((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setIsCreateTemplateOpen(false);
                            setEditingTemplate(null);
                            setNewTemplate({
                              name: "",
                              type: "",
                              subject: "",
                              content: "",
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={
                            editingTemplate
                              ? handleUpdateTemplate
                              : handleCreateTemplate
                          }
                        >
                          {editingTemplate
                            ? "Update Template"
                            : "Create Template"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.map((draft) => (
                  <Card key={draft.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {draft.subject || "Untitled Draft"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Send To</p>
                          <p className="font-medium capitalize">
                            {draft.sendTo.replace("-", " ")}
                          </p>
                          {draft.selectedProperty && (
                            <p className="text-sm text-gray-600">
                              {draft.selectedProperty}
                            </p>
                          )}
                          {draft.selectedUnit && (
                            <p className="text-sm text-gray-600">
                              {draft.selectedUnit}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Message Preview
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {draft.message.substring(0, 100)}...
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Saved</p>
                          <p className="text-sm font-medium">
                            {new Date(draft.savedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              // Load draft into form
                              setFormData((prev) => ({
                                ...prev,
                                sendTo: draft.sendTo,
                                selectedProperty: draft.selectedProperty,
                                selectedUnit: draft.selectedUnit,
                                subject: draft.subject,
                                message: draft.message,
                              }));
                              // Remove from drafts
                              setDrafts((prev) =>
                                prev.filter((d) => d.id !== draft.id),
                              );
                            }}
                          >
                            Continue Editing
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setDrafts((prev) =>
                                prev.filter((d) => d.id !== draft.id),
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {drafts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No drafts saved yet.</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Save messages as drafts to continue working on them later.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Communications;
