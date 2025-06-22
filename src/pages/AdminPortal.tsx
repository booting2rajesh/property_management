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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Settings,
  Phone,
} from "lucide-react";

interface Permission {
  name: string;
  granted: boolean;
}

interface EditablePermissionCardProps {
  role: string;
  color: string;
  permissions: Permission[];
}

const EditablePermissionCard = ({
  role,
  color,
  permissions: initialPermissions,
}: EditablePermissionCardProps) => {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [isEditing, setIsEditing] = useState(false);

  const colorClasses = {
    purple: "text-purple-600",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  const togglePermission = (index: number) => {
    setPermissions((prev) =>
      prev.map((perm, i) =>
        i === index ? { ...perm, granted: !perm.granted } : perm,
      ),
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log(`Updated ${role} permissions:`, permissions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield
            className={`w-5 h-5 ${colorClasses[color as keyof typeof colorClasses]}`}
          />
          {role} Permissions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm space-y-2">
          {permissions.map((permission, index) => (
            <div key={index} className="flex items-center gap-2">
              {isEditing ? (
                <Checkbox
                  checked={permission.granted}
                  onCheckedChange={() => togglePermission(index)}
                />
              ) : (
                <div
                  className={`w-2 h-2 rounded-full ${
                    permission.granted ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              )}
              <span
                className={
                  permission.granted ? "" : "line-through text-gray-500"
                }
              >
                {permission.name}
              </span>
            </div>
          ))}
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setIsEditing(true)}
          >
            Edit Permissions
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const AdminPortal = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("user-management");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    permissions: {
      manageProperties: false,
      manageTenants: false,
      manageCommunications: false,
      manageUnits: false,
      manageBilling: false,
      viewReports: false,
      manageUsers: false,
    },
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Owner",
      email: "john@example.com",
      phone: "+91 9876543210",
      role: "Owner",
      status: "active",
      created: "1/1/2023",
      avatar: "",
    },
    {
      id: 2,
      name: "Admin User",
      email: "admin@example.com",
      phone: "+91 9876543211",
      role: "Admin",
      status: "active",
      created: "2/1/2023",
      avatar: "",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new user object
    const newUser = {
      id: users.length + 1,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: "active",
      created: new Date().toLocaleDateString(),
      avatar: "",
    };

    // Add new user to the users list
    setUsers((prevUsers) => [...prevUsers, newUser]);

    // Close modal and reset form
    setIsAddModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      permissions: {
        manageProperties: false,
        manageTenants: false,
        manageCommunications: false,
        manageUnits: false,
        manageBilling: false,
        viewReports: false,
        manageUsers: false,
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/admin" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Admin Portal"
          subtitle="Manage users and system permissions"
          actions={
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
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
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, role: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Permissions</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="manageProperties"
                            checked={formData.permissions.manageProperties}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "manageProperties",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="manageProperties">
                            Manage Properties
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="manageTenants"
                            checked={formData.permissions.manageTenants}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "manageTenants",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="manageTenants">Manage Tenants</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="manageCommunications"
                            checked={formData.permissions.manageCommunications}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "manageCommunications",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="manageCommunications">
                            Manage Communications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="manageUsers"
                            checked={formData.permissions.manageUsers}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "manageUsers",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="manageUsers">Manage Users</Label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="manageUnits"
                            checked={formData.permissions.manageUnits}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "manageUnits",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="manageUnits">Manage Units</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="manageBilling"
                            checked={formData.permissions.manageBilling}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "manageBilling",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="manageBilling">Manage Billing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="viewReports"
                            checked={formData.permissions.viewReports}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                "viewReports",
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor="viewReports">View Reports</Label>
                        </div>
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
                      Add User
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                value="user-management"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                User Management
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Permissions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user-management" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users by name, email, or role..."
                          className="pl-10 w-80"
                        />
                      </div>
                      <Select defaultValue="all-roles">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-roles">All Roles</SelectItem>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                            USER
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                            ROLE
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                            STATUS
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                            CREATED
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-100"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="bg-primary text-white">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {user.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {user.email}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Phone className="w-3 h-3" />
                                    {user.phone}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                className={
                                  user.role === "Owner"
                                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                }
                              >
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                active
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-gray-900">{user.created}</p>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="w-4 h-4" />
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
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EditablePermissionCard
                  role="Owner"
                  color="purple"
                  permissions={[
                    { name: "Full System Access", granted: true },
                    { name: "Manage All Properties", granted: true },
                    { name: "Manage All Users", granted: true },
                    { name: "Financial Reports", granted: true },
                    { name: "Admin Portal Access", granted: true },
                  ]}
                />

                <EditablePermissionCard
                  role="Admin"
                  color="blue"
                  permissions={[
                    { name: "Manage Properties", granted: true },
                    { name: "Manage Tenants", granted: true },
                    { name: "Billing System", granted: true },
                    { name: "Limited User Access", granted: false },
                    { name: "Communications", granted: true },
                  ]}
                />

                <EditablePermissionCard
                  role="Manager"
                  color="green"
                  permissions={[
                    { name: "View Properties", granted: true },
                    { name: "Manage Tenants", granted: true },
                    { name: "Basic Billing", granted: false },
                    { name: "No User Management", granted: false },
                    { name: "View Reports", granted: true },
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
