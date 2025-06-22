import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Mail, Lock, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [userType, setUserType] = useState<"owner" | "tenant">("owner");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just redirect to dashboard
    window.location.href = "/dashboard";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to PropertyHub
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in to manage your properties
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Login as
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={userType === "owner" ? "default" : "outline"}
                className={cn(
                  "h-12 flex items-center gap-2",
                  userType === "owner"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
                )}
                onClick={() => setUserType("owner")}
              >
                <Building className="w-4 h-4" />
                Owner
              </Button>
              <Button
                type="button"
                variant={userType === "tenant" ? "default" : "outline"}
                className={cn(
                  "h-12 flex items-center gap-2",
                  userType === "tenant"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
                )}
                onClick={() => setUserType("tenant")}
              >
                <User className="w-4 h-4" />
                Tenant
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-base"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Demo credentials: Use any email/password combination
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
