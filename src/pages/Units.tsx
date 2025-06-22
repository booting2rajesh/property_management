import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  ArrowLeft,
  Plus,
  User,
  Phone,
  Shield,
  Navigation,
  Home as HomeIcon,
  List,
} from "lucide-react";

const Units = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    unitNumber: "",
    type: "",
    floor: "",
    size: "",
    rent: "",
    advance: "",
  });

  const stats = {
    totalUnits: 20,
    occupiedUnits: 17,
    vacantUnits: 3,
    occupancyRate: 85,
  };

  const units = [
    {
      id: 1,
      unitNumber: "A-101",
      type: "2BHK",
      size: "1200 sq ft",
      floor: 1,
      rent: "₹25,000",
      status: "occupied",
      tenant: {
        name: "Raj Kumar",
        phone: "+91 9876543210",
      },
      amenities: ["Balcony", "Modular Kitchen", "Wardrobe"],
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      unitNumber: "A-102",
      type: "3BHK",
      size: "1500 sq ft",
      floor: 1,
      rent: "₹28,000",
      status: "vacant",
      amenities: ["Balcony", "Modular Kitchen", "Master Bedroom"],
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Add unit:", formData);
    setIsAddModalOpen(false);
    setFormData({
      unitNumber: "",
      type: "",
      floor: "",
      size: "",
      rent: "",
      advance: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/properties" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Sunrise Apartments - Units"
          subtitle="123 Main Street, Koramangala, Bangalore"
          actions={
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/properties")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Unit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unitNumber">Unit Number</Label>
                        <Input
                          id="unitNumber"
                          name="unitNumber"
                          placeholder="e.g., A-103"
                          value={formData.unitNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1BHK">1BHK</SelectItem>
                            <SelectItem value="2BHK">2BHK</SelectItem>
                            <SelectItem value="3BHK">3BHK</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="floor">Floor</Label>
                        <Input
                          id="floor"
                          name="floor"
                          type="number"
                          placeholder="1"
                          value={formData.floor}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Size (sq ft)</Label>
                        <Input
                          id="size"
                          name="size"
                          placeholder="1200"
                          value={formData.size}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rent">Rent (₹)</Label>
                        <Input
                          id="rent"
                          name="rent"
                          placeholder="25000"
                          value={formData.rent}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="advance">Advance (₹)</Label>
                        <Input
                          id="advance"
                          name="advance"
                          placeholder="50000"
                          value={formData.advance}
                          onChange={handleInputChange}
                          required
                        />
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
                        Add Unit
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          {/* Stats Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-blue-100 text-sm">Total Units</p>
                <p className="text-3xl font-bold">{stats.totalUnits}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Occupied</p>
                <p className="text-3xl font-bold">{stats.occupiedUnits}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Vacant</p>
                <p className="text-3xl font-bold">{stats.vacantUnits}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Occupancy Rate</p>
                <p className="text-3xl font-bold">{stats.occupancyRate}%</p>
              </div>
            </div>
          </div>

          {/* Units Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {units.map((unit) => (
              <Card key={unit.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={unit.image}
                    alt={unit.unitNumber}
                    className="w-full h-40 object-cover"
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${
                      unit.status === "occupied"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {unit.status === "occupied" ? "Occupied" : "Vacant"}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Unit {unit.unitNumber}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{unit.type}</span>
                        <span>{unit.size}</span>
                        <span>Floor {unit.floor}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {unit.rent}
                      </p>
                      <p className="text-sm text-gray-600">Rent</p>
                    </div>
                  </div>

                  {unit.tenant && (
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-green-900">
                            Current Tenant
                          </p>
                          <p className="text-green-800">{unit.tenant.name}</p>
                          <div className="flex items-center gap-1 text-sm text-green-700 mt-1">
                            <Phone className="w-3 h-3" />
                            {unit.tenant.phone}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          ✓ Agreement
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Unit Amenities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {unit.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {amenity === "Balcony" && (
                            <HomeIcon className="w-3 h-3" />
                          )}
                          {amenity === "Modular Kitchen" && (
                            <HomeIcon className="w-3 h-3" />
                          )}
                          {amenity === "Wardrobe" && (
                            <HomeIcon className="w-3 h-3" />
                          )}
                          {amenity === "Master Bedroom" && (
                            <HomeIcon className="w-3 h-3" />
                          )}
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <List className="w-4 h-4 mr-2" />
                      List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Units;
