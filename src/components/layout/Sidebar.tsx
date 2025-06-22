import { useState } from "react";
import {
  Building,
  LayoutDashboard,
  Home,
  Users,
  CreditCard,
  MessageCircle,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  currentPath: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Home, label: "Properties", path: "/properties" },
  { icon: Users, label: "Tenants", path: "/tenants" },
  { icon: CreditCard, label: "Billing", path: "/billing" },
  { icon: MessageCircle, label: "Communications", path: "/communications" },
  { icon: Settings, label: "Admin Portal", path: "/admin" },
];

const Sidebar = ({ currentPath }: SidebarProps) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New tenant application",
      message: "Raj Kumar applied for Unit A-103",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Rent payment received",
      message: "₹25,000 received from Priya Sharma",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Maintenance request",
      message: "Unit B-201 reported water leakage",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      title: "Lease renewal due",
      message: "3 leases expiring next month",
      time: "2 days ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    // Redirect to login
    window.location.href = "/";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">PropertyHub</h1>
            <p className="text-xs text-gray-500">Owner Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" alt="John Owner" />
            <AvatarFallback className="bg-primary text-white">
              JO
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Owner
            </p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog
            open={isNotificationsOpen}
            onOpenChange={setIsNotificationsOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 justify-start gap-2 text-gray-600 hover:text-gray-900 relative"
              >
                <Bell className="w-4 h-4" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-auto bg-red-500 text-white text-xs min-w-[18px] h-[18px] rounded-full p-0 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.unread
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-2">
          <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to logout? You will need to sign in
                  again to access PropertyHub.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsLogoutOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
